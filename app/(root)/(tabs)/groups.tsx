import SingleGroupComponent from "@/components/groups/single_group";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalorieCirclesScreen() {
  return (
    <SafeAreaView
      className="bg-app_main flex-1 px-10 pt-6
  "
    >
      <Text className="text-white text-heading font-bold text-left">
        Hey Kevin
      </Text>
      <Text className="text-white text-caption2 font-bold text-left mt-4">
        Your Circles
      </Text>
      <ScrollView className="mt-4 flex-col">
        <SingleGroupComponent nameOfGroup="Kevin's Friends" />
      </ScrollView>
    </SafeAreaView>
  );
}
