import { Text, TouchableOpacity } from "react-native";
import React from "react";

const FoodScreenButton = ({
  title,
  onPress,
  isActive,
}: {
  title: string;
  onPress: () => void;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      className={`${
        isActive ? "bg-app_ternary" : "bg-app_secondary"
      } rounded-lg p-3`}
      onPress={onPress}
    >
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default FoodScreenButton;
