import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import FoodItemComponent from "@/components/add_food/food_component";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import FoodScreenButton from "@/components/add_food/food_screen_button";
import { FoodItem, ReceivedFoodItem } from "@/types/type";

const AddFoodScreen = () => {
  const [activePage, setActivePage] = useState("recents");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReceivedFoodItem[]>([]);
  const [loadingSearches, setLoadingSearches] = useState(false);

  // This switches what data is actually being shows
  const onPressPageButton = (title: string) => {
    setActivePage(title);
  };

  // This handles the search results USDA API
  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) return;

  //   setLoadingSearches(true);

  //   try {
  //     const apiKey = process.env.EXPO_PUBLIC_USDA_API_KEY;
  //     const queryWords = searchQuery.trim().split(" ");

  //     // Perform a broad search
  //     const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
  //       searchQuery
  //     )}&api_key=${apiKey}`;
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     const allResults = data.foods || [];

  //     // Filter results by food name or brand
  //     const filteredResults = allResults.filter((food) => {
  //       const foodName = food.description?.toLowerCase() || "";
  //       const brandName = food.brandOwner?.toLowerCase() || "";

  //       return queryWords.some(
  //         (word) =>
  //           foodName.includes(word.toLowerCase()) ||
  //           brandName.includes(word.toLowerCase())
  //       );
  //     });

  //     // Sort results by relevance (number of matching words)
  //     const sortedResults = filteredResults.sort((a, b) => {
  //       const aMatchCount = queryWords.filter(
  //         (word) =>
  //           a.description?.toLowerCase().includes(word.toLowerCase()) ||
  //           a.brandOwner?.toLowerCase().includes(word.toLowerCase())
  //       ).length;

  //       const bMatchCount = queryWords.filter(
  //         (word) =>
  //           b.description?.toLowerCase().includes(word.toLowerCase()) ||
  //           b.brandOwner?.toLowerCase().includes(word.toLowerCase())
  //       ).length;

  //       return bMatchCount - aMatchCount; // Higher match count comes first
  //     });

  //     setSearchResults(sortedResults);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoadingSearches(false);
  //   }
  // };

  // This handles the search results NutritionX API
  const handleSearch = async () => {
    const url = `https://trackapi.nutritionix.com/v2/search/instant/?query=${searchQuery}`;
    const appID = process.env.EXPO_PUBLIC_NUTRIX_APP_ID;
    const appKey = process.env.EXPO_PUBLIC_NUTRIX_APP_KEY;

    if (!appID || !appKey) {
      console.error("API credentials are missing");
      return;
    }

    setLoadingSearches(true);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": appID,
          "x-app-key": appKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let results = await response.json();

      //results have common & branded, so combine them
      results = [...(results.branded || []), ...(results.common || [])];

      setSearchResults(results);
      console.log(results);
      setLoadingSearches(false);
    } catch (error) {
      console.log("We caught an error :", error);
    }
  };

  // search DeBouncing
  useEffect(() => {
    const delayFoodFetching = setTimeout(() => {
      if (searchQuery.length > 3) {
        handleSearch();
      }
    }, 1500);

    return () => clearTimeout(delayFoodFetching);
  }, [searchQuery]);

  return (
    <SafeAreaView className="relative h-screen bg-app_main px-9">
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
        <Text className="text-white text-subheading font-bold">Add Foods</Text>
      </View>

      {/* Page Buttons */}
      <View className="flex-row w-full gap-3 mb-4">
        <FoodScreenButton
          title="Recents"
          onPress={() => onPressPageButton("recents")}
          isActive={activePage === "recents"}
        />
        <FoodScreenButton
          title="Search"
          onPress={() => onPressPageButton("search")}
          isActive={activePage === "search"}
        />
        <FoodScreenButton
          title="My Foods"
          onPress={() => onPressPageButton("my_foods")}
          isActive={activePage === "my_foods"}
        />
      </View>

      {/* Pages */}

      {activePage === "recents" && <View className="gap-3"></View>}
      {activePage === "search" && (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => item?.nix_item_id || index.toString()}
          renderItem={({ item }) => (
            <FoodItemComponent
              foodName={item.food_name}
              brandName={item.brand_name || "Common Food"}
              calories={item.nf_calories || "N/A"}
              servingQty={item.serving_qty || 1}
              servingUnit={item.serving_unit || "unit"}
              photoUrl={item.photo?.thumb || null}
              nixItemID={item?.nix_item_id || null}
            />
          )}
          ListEmptyComponent={
            !loadingSearches && (
              <Text className="text-white">No Results Found</Text>
            )
          }
          ListFooterComponent={
            loadingSearches && <Text className="text-white">Loading...</Text>
          }
        />
      )}

      {/* Search Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        className="absolute bottom-20 left-9 w-full flex-1"
      >
        <CustomInput
          placeholder="Search Foods"
          inputStyle="bg-input_background"
          onPress={() => setActivePage("search")}
          onChangeText={setSearchQuery}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFoodScreen;
