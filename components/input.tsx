import {View, TextInput, StyleSheet} from "react-native"
import { Search as SearchIcon } from "lucide-react-native"

interface SearchProps {
  text: string,
  onTextChange?: (text: string) => void
  onFocusChanged?: (focused: boolean) => void
}

export function Search({text, onTextChange, onFocusChanged}: SearchProps){
  return (
    <View style={searchStyles.root}>
      <SearchIcon color="#8a8a8d" size={20}/>
      <TextInput 
        placeholder="Search or enter website" 
        placeholderTextColor="#8a8a8d"
        style={{
          color: "#ffffff",
          flex: 1
        }}
        defaultValue={text}
        onEndEditing={(e) => onTextChange?.(e.nativeEvent.text)}
        onFocus={() => onFocusChanged?.(true)}
        onBlur={() => onFocusChanged?.(false)}
        keyboardType="url"
        selectTextOnFocus
      />
    </View>
  )
}

const searchStyles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 10,
    boxShadow: "0px 0px 10px #ffffff23",
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    minHeight: 45,
    overflow: "scroll"
  }
})