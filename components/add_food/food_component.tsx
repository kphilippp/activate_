import { View, Text, Image } from "react-native";
import { icons } from "@/constants";

import React from "react";

const FoodItemComponent = ({
  foodName,
  foodBrand,
}: {
  foodName: string;
  foodBrand: string;
}) => {
  return (
    <View className="w-full bg-app_secondary p-5 pl-7 flex-row rounded-xl gap-6 items-center">
      <Image source={icons.google} className="aspect-square w-6" />
      <View>
        <Text className="text-white">{foodName}</Text>
        <Text className="text-white text-sm">{foodBrand}</Text>
      </View>
    </View>
  );
};

export default FoodItemComponent;
