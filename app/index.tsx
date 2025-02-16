import { Text, View, StatusBar } from "react-native";
import { Tab } from "@/components/tab";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "141414"
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#141414"/>
      <Tab url="https://asthra.sjcetpalai.ac.in"/>
    </SafeAreaView>
  );
}
