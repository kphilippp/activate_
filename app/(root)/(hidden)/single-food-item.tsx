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
  }: {
    nixItemID: string;
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
            {nutrition?.photo ? (
              <Image
                source={{ uri: nutrition?.photo }}
                className="w-32 h-32 rounded-3xl mb-5"
                resizeMode="cover"
              />
            ) : (
              <View className="w-24 h-24 bg-gray-400 rounded-full mb-5 justify-center items-center">
                <Text className="text-gray-600">No Image</Text>
              </View>
            )}
          </View>

          {nutrition ? (
            <View>
              <Text className="text-gray-300 text-sm mb-1">
                Serving: {nutrition.serving_qty} {nutrition.serving_unit} (
                {nutrition.serving_weight_grams} g)
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Calories: {nutrition.nf_calories || "N/A"} kcal
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Total Fat: {nutrition.nf_total_fat || "N/A"} g
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Saturated Fat: {nutrition.nf_saturated_fat || "N/A"} g
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Carbohydrates: {nutrition.nf_total_carbohydrate || "N/A"} g
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Sugars: {nutrition.nf_sugars || "N/A"} g
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Protein: {nutrition.nf_protein || "N/A"} g
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Sodium: {nutrition.nf_sodium || "N/A"} mg
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Cholesterol: {nutrition.nf_cholesterol || "N/A"} mg
              </Text>
              <Text className="text-gray-300 text-sm mb-1">
                Dietary Fiber: {nutrition.nf_dietary_fiber || "N/A"} g
              </Text>
              {nutrition.nf_ingredient_statement && (
                <Text className="text-gray-300 text-sm italic">
                  Ingredients: {nutrition.nf_ingredient_statement}
                </Text>
              )}
            </View>
          ) : (
            <Text className="text-white">No Nutrition Data Available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleFoodItemPage;
