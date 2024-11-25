import CustomButton from "@/components/CustomButton";
import { View, Text, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="bg-app_main flex-1 justify-start align-middle p-7 w-full">
      <View className="gap-5">
        <View className="bg-app_secondary rounded-xl p-9 flex-row">
          <View className="bg-white rounded-full aspect-square h-28 flex-[0.4]"></View>
          <View className="flex-[0.6] pl-9 justify-between">
            <View className="">
              <Text className="text-white text-xl">Kevin Philip</Text>
              <Text className="text-white text-lg">Novice</Text>
              <Text className="text-white">23000 XP</Text>
            </View>
            <CustomButton
              title="Edit Profile"
              className="shadow-none bg-app_main rounded-lg self-end"
              textVariant="editprofile"
            />
          </View>
        </View>
        <View className="bg-app_secondary rounded-xl p-9 flex-row"></View>
      </View>
    </SafeAreaView>
  );
}
