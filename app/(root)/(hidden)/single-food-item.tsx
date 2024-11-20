import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const SingleFoodItemPage = () => {
  // Extract search params
  const { foodName, brandName, calories, servingQty, servingUnit, photoUrl } =
    useLocalSearchParams();

  // Convert numeric fields to numbers (default to fallback values if undefined)
  const parsedCalories = calories ? parseFloat(calories) : "N/A";
  const parsedServingQty = servingQty ? parseInt(servingQty, 10) : 1;

  return (
    <View className="px-9 pt-28 bg-app_main">
      <ScrollView>
        <View className="h-screen p-11 bg-app_secondary rounded-[2rem]">
          <View className="flex-row gap-5">
            {/* Display Food Image */}
            {photoUrl ? (
              <Image
                source={{ uri: photoUrl }}
                className="w-32 h-32 rounded-3xl mb-5"
                resizeMode="cover"
              />
            ) : (
              <View className="w-24 h-24 bg-gray-400 rounded-full mb-5 justify-center items-center">
                <Text className="text-gray-600">No Image</Text>
              </View>
            )}

            {/* Food Details */}
            <View>
              <Text className="text-white text-3xl font-bold text-wrap">
                {foodName}
              </Text>
              <Text className="text-gray-300 text-lg mb-1">
                {brandName || "Common Food"}
              </Text>
            </View>
          </View>

          <Text className="text-gray-300 text-sm mb-1">
            Calories: {parsedCalories} kcal
          </Text>
          <Text className="text-gray-300 text-sm mb-1">
            Serving: {parsedServingQty} {servingUnit || "unit"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleFoodItemPage;
