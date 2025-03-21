import { Stack } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchEngineProvider } from "./context/SearchEngineContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SearchEngineProvider>
          <Stack screenOptions={{
            headerShown: false
          }}/>
        </SearchEngineProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
