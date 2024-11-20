import React from "react";
import { View, Text, Image } from "react-native";

type FoodItemProps = {
  foodName: string;
  brandName: string;
  calories: string | number;
  servingQty: string | number;
  servingUnit: string;
  foodCategory?: string; // Optional prop
  photoUrl?: string; // URL of the food image
};

const FoodItemComponent = ({
  foodName,
  brandName,
  calories,
  servingQty,
  servingUnit,
  foodCategory,
  photoUrl,
}: FoodItemProps) => {
  return (
    <View className="w-full bg-app_secondary p-3 pl-4 flex-row rounded-xl gap-6 items-center">
      {/* Render the image if available */}
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          className="aspect-square w-12 h-12 rounded-full"
        />
      ) : (
        <View className="aspect-square w-12 h-12 bg-gray-300 rounded-full justify-center items-center">
          <Text className="text-gray-500">N/A</Text>
        </View>
      )}

      <View>
        <Text className="text-white mb-1 font-bold">{foodName}</Text>

        {/* Brand Name */}
        <Text className="text-gray-300 text-sm">Brand: {brandName}</Text>

        {/* Calories and Serving Info */}
        <Text className="text-gray-300 text-sm">
          {calories} kcal - {servingQty} {servingUnit}
        </Text>

        {/* Food Category if provided */}
        {foodCategory && (
          <Text className="text-gray-300 text-sm">
            Category: {foodCategory}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FoodItemComponent;
