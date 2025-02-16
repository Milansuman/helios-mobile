import {WebView} from "react-native-webview"
import { View, StyleSheet, BackHandler, Keyboard, Animated, Text } from "react-native"
import { useEffect, useState, useRef } from "react"

import { Search } from "./input"
import {Link2} from "lucide-react-native"


interface Props{
  url: string,
  onUrlChange?: (url: string) => void,
}

export function Tab({url, onUrlChange}: Props){
  const [text, setText] = useState(url)
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSuggestionsShown, setIsSearchSuggestionsShown] = useState(false);
  const webview = useRef<WebView | null>(null)
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    Animated.timing(fadeAnim, {
      toValue: isSearching ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsSearchSuggestionsShown(isSearching);
    });
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
        {isSearchSuggestionsShown && (
          <Animated.View style={[styles.search, { opacity: fadeAnim }]}>
            <Text style={{color: "white"}}>This is where the search suggestions will be :)</Text>
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
    padding: 20
  }
})