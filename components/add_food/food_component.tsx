import { FoodItem } from "@/types/type";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const FoodItemComponent = ({
  foodName,
  brandName,
  calories,
  servingQty,
  servingUnit,
  photoUrl,
  nixItemID,
}: FoodItem) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/(root)/(hidden)/single-food-item",
          params: {
            nixItemID: nixItemID,
            foodName: foodName,
            photoURL: photoUrl,
          },
        });
      }}
    >
      <View className="w-full bg-app_secondary p-3 pl-4 flex-row rounded-xl gap-4 items-center mb-1">
        {/* Render the image if available */}
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            className="aspect-square w-10 h-10 rounded-full"
          />
        ) : (
          <View className="aspect-square w-12 h-12 bg-gray-300 rounded-full justify-center items-center">
            <Text className="text-gray-500">N/A</Text>
          </View>
        )}

        <View>
          <Text className="text-white text-sm  font-bold">{foodName}</Text>

          <View className="flex-row">
            {/* Brand Name */}
            <Text className="text-gray-300 text-sm italic">{brandName}, </Text>

            {/* Calories and Serving Info */}
            <Text className="text-gray-300 text-sm">
              {calories} kcal - {servingQty} {servingUnit}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemComponent;
