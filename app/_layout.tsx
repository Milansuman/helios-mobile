import { Stack } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{
          headerShown: false
        }}/>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
