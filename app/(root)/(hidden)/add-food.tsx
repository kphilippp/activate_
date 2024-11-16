import { View, Text, Button, KeyboardAvoidingView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";

const AddFoodScreen = () => {
  return (
    <SafeAreaView className="relative flex-1 bg-app_main">
      <View className="bg-app_main flex-1">
        <Button title="Back" onPress={() => router.back()} />
        <Text>AddFoodScreen</Text>
      </View>
      <KeyboardAvoidingView className="bottom-40 left-0">
        <CustomInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFoodScreen;
