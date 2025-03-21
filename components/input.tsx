import { View, TextInput, StyleSheet, Pressable } from "react-native"
import { Search as SearchIcon, Moon, Sun } from "lucide-react-native"
import { useTheme } from "@/app/context/ThemeContext"

interface SearchProps {
  text: string,
  onTextChange?: (text: string) => void
  onFocusChanged?: (focused: boolean) => void
}

export function Search({text, onTextChange, onFocusChanged}: SearchProps){
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      borderRadius: 12,
      backgroundColor: isDark ? '#2A2A2A' : '#F0F0F0',
      paddingHorizontal: 12,
      paddingVertical: 4,
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      minHeight: 48,
      overflow: "hidden"
    },
    input: {
      flex: 1,
      color: isDark ? '#FFFFFF' : '#000000',
      fontSize: 16,
    },
    themeButton: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: isDark ? '#3A3A3A' : '#E0E0E0',
    }
  });

  return (
    <View style={styles.root}>
      <SearchIcon 
        color={isDark ? '#8a8a8d' : '#666666'} 
        size={20}
      />
      <TextInput 
        placeholder="Search or enter website" 
        placeholderTextColor={isDark ? '#8a8a8d' : '#666666'}
        style={styles.input}
        defaultValue={text}
        onEndEditing={(e) => onTextChange?.(e.nativeEvent.text)}
        onFocus={() => onFocusChanged?.(true)}
        onBlur={() => onFocusChanged?.(false)}
        keyboardType="url"
        selectTextOnFocus
        autoCapitalize="none"
      />
      <Pressable 
        style={styles.themeButton} 
        onPress={toggleTheme}
      >
        {isDark ? (
          <Sun size={20} color="#8a8a8d" />
        ) : (
          <Moon size={20} color="#666666" />
        )}
      </Pressable>
    </View>
  )
}