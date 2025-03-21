import { View, StatusBar } from "react-native";
import { Tab } from "@/components/tab";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./context/ThemeContext";

import { useState } from "react";

export default function Index() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentUrl, setCurrentUrl] = useState("https://google.com");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#141414" : "#FFFFFF"
      }}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#141414" : "#FFFFFF"}/>
      
      <Tab url={currentUrl}/>
    </SafeAreaView>
  );
}
