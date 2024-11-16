import { Text, View } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import { router } from "expo-router";

const MealTimesComponent = ({ mealTime }: { mealTime: string }) => {
  return (
    <View className="w-full p-7 bg-app_secondary rounded-xl">
      <Text className="text-white font-bold text-lg">{mealTime}</Text>
      <View className="w-full flex-row-reverse">
        <CustomButton
          title="Add Food"
          bgVariant="dark"
          textVariant="white"
          className="shadow-none rounded-lg w-40"
          onPress={() => {
            router.push("/(root)/(hidden)/add-food");
          }}
        />
      </View>
    </View>
  );
};

export default MealTimesComponent;
