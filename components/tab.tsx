import {WebView} from "react-native-webview"
import { View, StyleSheet, BackHandler, Keyboard, Animated, Text } from "react-native"
import { useEffect, useState, useRef } from "react"

import { Search } from "./input"
import {Link2} from "lucide-react-native"


interface Props{
  url: string,
  onUrlChange?: (url: string) => void,
}

const useSearchAnimation = (isSearching: boolean) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    const showAnimation = Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: isSearching ? 1 : 0,
        useNativeDriver: true,
        damping: 20,
        mass: 0.8,
        stiffness: 100,
      }),
      Animated.spring(slideAnim, {
        toValue: isSearching ? 0 : 50,
        useNativeDriver: true,
        damping: 20,
        mass: 0.8,
        stiffness: 100,
      }),
      Animated.spring(scaleAnim, {
        toValue: isSearching ? 1 : 0.95,
        useNativeDriver: true,
        damping: 20,
        mass: 0.8,
        stiffness: 100,
      }),
    ])

    showAnimation.start()

    return () => {
      showAnimation.stop()
    }
  }, [isSearching, fadeAnim, slideAnim, scaleAnim])

  return { fadeAnim, slideAnim, scaleAnim }
}

export function Tab({url, onUrlChange}: Props){
  const [text, setText] = useState(url)
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSuggestionsShown, setIsSearchSuggestionsShown] = useState(false);
  const webview = useRef<WebView | null>(null)
  const { fadeAnim, slideAnim, scaleAnim } = useSearchAnimation(isSearching)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if(webview.current){
        webview.current.goBack();
      }
      return true;
    })

    return () => backHandler.remove();
  })

  useEffect(() => {
    const keyboardShowHandler = Keyboard.addListener("keyboardDidShow", () => {
      setIsSearching(true);
    })

    const keyboardHideHandler = Keyboard.addListener("keyboardDidHide", () => {
      setIsSearching(false);
    })

    return () => {
      keyboardShowHandler.remove();
      keyboardHideHandler.remove();
    }
  })

  useEffect(() => {
    setIsSearchSuggestionsShown(true);
  }, [isSearching]);

  return (
    <View style={styles.root}>
      <View style={styles.webviewSection}>
        <WebView source={{
            uri: text
          }}
          onLoadStart={(event) => {
            setText(event.nativeEvent.url)
          }}
          ref={webview}
        />
        {isSearching && (
          <Animated.View 
            style={[
              styles.search, 
              { 
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            <Animated.View 
              style={[
                styles.searchContent,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, 20]
                    })}
                  ]
                }
              ]}
            >
              <Text style={styles.searchText}>Search suggestions here</Text>
            </Animated.View>
          </Animated.View>
        )}
      </View>
      <View style={styles.panel}>
        <View style={{flexDirection: "row", gap: 10, flex: 1, alignItems: "center"}}>
          <Search 
            text={text} 
            onTextChange={setText}
          />
          <Link2 color="#ffffff"/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  panel: {
    backgroundColor: "#141414",
    padding: 10,
    minHeight: 70
  },
  webviewSection: {
    flex: 1,
    position: "relative"
  },
  search: {
    flex: 1,
    backgroundColor: "#141414",
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 20,
    backfaceVisibility: 'hidden',
  },
  searchContent: {
    flex: 1,
  },
  searchText: {
    color: '#ffffff',
    fontSize: 16,
  }
})