import { Text, View } from "react-native";
import React from "react";

const MealTimesComponent = ({ mealTime }: { mealTime: string }) => {
  return (
    <View className="w-full mt-4 p-7 bg-app_secondary">
      <Text className="text-white font-bold text-lg">{mealTime}</Text>
    </View>
  );
};

export default MealTimesComponent;
