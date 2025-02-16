import { Text, View, StatusBar } from "react-native";
import { Tab } from "@/components/tab";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        marginBottom: insets.bottom,
        backgroundColor: "141414"
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#141414"/>
      <Tab url="https://asthra.sjcetpalai.ac.in"/>
    </View>
  );
}
