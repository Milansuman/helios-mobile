import {WebView} from "react-native-webview"
import { View, StyleSheet } from "react-native"
import { useState } from "react"

import { Search } from "./input"
import {Link2} from "lucide-react-native"

interface Props{
  url: string,
  onUrlChange?: (url: string) => void,
}

export function Tab({url, onUrlChange}: Props){
  const [text, setText] = useState(url)

  return (
    <View style={styles.root}>
      <WebView source={{
        uri: text
      }}/>
      <View style={styles.panel}>
        <View style={{flexDirection: "row", gap: 10, flex: 1, alignItems: "center"}}>
          <Search text={text} onTextChange={setText}/>
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
  }
})