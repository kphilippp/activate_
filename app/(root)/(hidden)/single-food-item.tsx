import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { router, useLocalSearchParams } from "expo-router";
import ServingCalcComponenet from "@/components/add_food/serving_calc";
import CustomButton from "@/components/CustomButton";
import { icons, NUTRITIONIX_CONFIG } from "@/constants";
import { NutritionData } from "@/types/type";

const SingleFoodItemPage = () => {
  // Extract search params
  const {
    nixItemID,
    foodName,
    photoURL,
  }: {
    nixItemID: string;
    foodName: string;
    photoURL: string;
  } = useLocalSearchParams();

  const [nutrition, setNutrition] = useState<NutritionData>();
  const [loadingNutrition, setLoadingNutrition] = useState(false);

  // Get nutrition values
  const getNutritionValues = async () => {
    const { appID, appKey } = NUTRITIONIX_CONFIG;

    // you need to decide if they are branded or common foods and handle case accordingly
    if (nixItemID === "null") {
      console.log("CommonFoodNutriLookupInvoked\n\n");
      // common foods:
      // take food name and pass it in /natural/nutrients
      const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";

      setLoadingNutrition(true);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": appID,
            "x-app-key": appKey,
          },
          body: JSON.stringify({
            query: foodName,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNutrition(data);
        setLoadingNutrition(false);
      } catch (error) {
        console.log("Error getting Common Nutrition:", error);
      }
    } else {
      // branded foods:
      // take nix_item_id and pass it in /search/item
      const url = `https://trackapi.nutritionix.com/v2/search/item/?nix_item_id=${nixItemID}`;

      setLoadingNutrition(true);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-app-id": appID,
            "x-app-key": appKey,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.foods && data.foods.length > 0) {
          const {
            food_name,
            brand_name,
            serving_qty,
            serving_unit,
            serving_weight_grams,
            nf_calories,
            nf_total_fat,
            nf_saturated_fat,
            nf_total_carbohydrate,
            nf_sugars,
            nf_protein,
            nf_sodium,
            nf_dietary_fiber,
            nf_cholesterol,
            nf_ingredient_statement,
            photo,
          } = data.foods[0];

          setNutrition({
            food_name,
            brand_name,
            serving_qty,
            serving_unit,
            serving_weight_grams,
            nf_calories,
            nf_total_fat,
            nf_saturated_fat,
            nf_total_carbohydrate,
            nf_sugars,
            nf_protein,
            nf_sodium,
            nf_dietary_fiber,
            nf_cholesterol,
            nf_ingredient_statement,
            photo,
          });
        } else {
          console.error("No nutrition data available.");
        }
        setLoadingNutrition(false);
      } catch (error) {
        console.log("Error getting Branded Nutrition: \n", error);
      }
    }
  };

  // Invoke getNutritionValues
  useEffect(() => {
    getNutritionValues();
  }, []);

  return (
    <View className="px-9 pt-28 bg-app_main">
      {/* Header */}
      <View className="flex-row items-center mb-5">
        <CustomButton
          title=""
          IconLeft={() => (
            <Image className="aspect-square w-10" source={icons.backArrow} />
          )}
          onPress={() => router.back()}
          bgVariant="backButton"
        />
        <Text className="text-white text-subheading font-bold">
          Recently Eaten Foods
        </Text>
      </View>
      <ScrollView>
        <View className="h-screen p-11 bg-app_secondary rounded-[2rem]">
          <View className="flex-row gap-5">
            {/* Display Food Image */}
            {photoURL ? (
              <Image
                source={{ uri: photoURL }}
                className="w-20 h-20 rounded-xl mb-5"
                resizeMode="cover"
              />
            ) : (
              <View className="w-32 h-32 bg-gray-400 rounded-full mb-5 justify-center items-center">
                <Text className="text-gray-600">No Image</Text>
              </View>
            )}
            <View>
              <Text className="text-white font-bold text-2xl">
                {nutrition?.food_name}
              </Text>
              <Text className="text-white text-lh">
                {nutrition?.brand_name}
              </Text>
            </View>
          </View>
          ;
          {nutrition ? (
            <View className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <Text className="text-gray-300 text-xl font-bold mb-4">
                Nutrition Facts
              </Text>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Serving</Text>
                <Text className="text-gray-300">
                  {nutrition.serving_qty} {nutrition.serving_unit} (
                  {nutrition.serving_weight_grams} g)
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Calories</Text>
                <Text className="text-gray-300">
                  {nutrition.nf_calories || "N/A"} kcal
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Total Fat</Text>
                <Text className="text-gray-300">
                  {nutrition.nf_total_fat || "N/A"} g
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">
                  Saturated Fat
                </Text>
                <Text className="text-gray-300">
                  {nutrition.nf_saturated_fat || "N/A"} g
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">
                  Carbohydrates
                </Text>
                <Text className="text-gray-300">
                  {nutrition.nf_total_carbohydrate || "N/A"} g
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Sugars</Text>
                <Text className="text-gray-300">
                  {nutrition.nf_sugars || "N/A"} g
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Protein</Text>
                <Text className="text-gray-300">
                  {nutrition.nf_protein || "N/A"} g
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Sodium</Text>
                <Text className="text-gray-300">
                  {nutrition.nf_sodium || "N/A"} mg
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">Cholesterol</Text>
                <Text className="text-gray-300">
                  {nutrition.nf_cholesterol || "N/A"} mg
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-300 font-semibold">
                  Dietary Fiber
                </Text>
                <Text className="text-gray-300">
                  {nutrition.nf_dietary_fiber || "N/A"} g
                </Text>
              </View>
              {nutrition.nf_ingredient_statement && (
                <Text className="text-gray-400 text-sm italic mt-4">
                  Ingredients: {nutrition.nf_ingredient_statement}
                </Text>
              )}
            </View>
          ) : (
            <Text className="text-white text-center mt-6">
              No Nutrition Data Available
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleFoodItemPage;
