import { Stack } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchEngineProvider } from "./context/SearchEngineContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TabsProvider } from '@/app/context/TabsContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SearchEngineProvider>
          <TabsProvider>
            <Stack screenOptions={{
              headerShown: false
            }}/>
          </TabsProvider>
        </SearchEngineProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
