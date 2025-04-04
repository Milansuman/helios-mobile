import {WebView} from "react-native-webview"
import { View, StyleSheet, BackHandler, Keyboard, Animated, Text } from "react-native"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "@/app/context/ThemeContext"
import { Search } from "./input"
import {Link2} from "lucide-react-native"
import { GradientLoader } from './GradientLoader';
import { Modal, Pressable } from "react-native";
import { useSearchEngine } from "@/app/context/SearchEngineContext";
import { SearchEngineModal } from './SearchEngineModal';


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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [text, setText] = useState(url)
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSuggestionsShown, setIsSearchSuggestionsShown] = useState(false);
  const webview = useRef<WebView | null>(null)
  const { fadeAnim, slideAnim, scaleAnim } = useSearchAnimation(isSearching)
  const [isLoading, setIsLoading] = useState(false);
  const { searchEngine, setSearchEngine } = useSearchEngine();
  const [showEngineSelect, setShowEngineSelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    if (isValidUrl(query)) {
      setText(query.startsWith('http') ? query : `https://${query}`);
      return;
    }

    setSearchQuery(query);
    if (!searchEngine) {
      setShowEngineSelect(true);
    } else {
      const searchUrls = {
        google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
        perplexity: `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`
      };
      setText(searchUrls[searchEngine]);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return /^[\w-]+\.\w{2,}(\.\w{2,})?$/.test(string);
    }
  };

  return (
    <View style={styles.root}>
      <View style={[
        styles.panel,
        { backgroundColor: isDark ? '#141414' : '#FFFFFF' }
      ]}>
        <View style={{flexDirection: "row", gap: 10, flex: 1, alignItems: "center"}}>
          <Search 
            text={text} 
            onTextChange={(newText) => {
              handleSearch(newText);
            }}
            onFocusChanged={setIsSearching}
          />
          <Link2 color={isDark ? '#FFFFFF' : '#000000'}/>
        </View>
      </View>
      
      {isLoading && <GradientLoader />}
      
      <View style={styles.webviewSection}>
        <WebView 
          source={{ uri: text }}
          onLoadStart={(event) => {
            setText(event.nativeEvent.url);
            setIsLoading(true);
          }}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
          ref={webview}
          style={styles.webview}
        />
        {isSearching && (
          <Animated.View 
            style={[
              styles.search, 
              { 
                opacity: fadeAnim,
                backgroundColor: isDark ? '#141414' : '#FFFFFF',
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
              <Text style={[
                styles.searchText,
                { color: isDark ? '#FFFFFF' : '#000000' }
              ]}>
                Search suggestions here
              </Text>
            </Animated.View>
          </Animated.View>
        )}
      </View>
      <SearchEngineModal
        visible={showEngineSelect}
        onClose={() => setShowEngineSelect(false)}
        onSelect={(engine) => {
          setSearchEngine(engine);
          handleSearch(searchQuery);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column'
  },
  panel: {
    padding: 10,
    minHeight: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10
  },
  webviewSection: {
    flex: 1,
    position: "relative"
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  search: {
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
    fontSize: 16,
  }
})