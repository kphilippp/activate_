import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AddFoodScreen = () => {
  return (
    <SafeAreaView>
      <Button title="Back" onPress={() => router.back()} />
      <Text>AddFoodScreen</Text>
    </SafeAreaView>
  );
};

export default AddFoodScreen;
