import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import FoodItemComponent from "@/components/add_food/food_component";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import FoodScreenButton from "@/components/add_food/food_screen_button";

const AddFoodScreen = () => {
  const [activePage, setActivePage] = useState("recents");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearches, setLoadingSearches] = useState(false);

  // This switches what data is actually being shows
  const onPressPageButton = (title: string) => {
    setActivePage(title);
  };

  // This handles the search results
  const handleSearch = async () => {
    // Takes out whitespace from searches
    if (!searchQuery.trim()) return;

    // Set Loading Status to True
    setLoadingSearches(true);

    // Try getting foods depending on search, then
    // put response in searchResults
    try {
      const apiKey = process.env.EXPO_PUBLIC_USDA_API_KEY;
      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
        searchQuery
      )}&api_key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      setSearchResults(data.foods || []); // Update results
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingSearches(false);
    }
  };

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
        <Text className="text-white text-subheading font-bold">
          Recently Eaten Foods
        </Text>
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
      <ScrollView className="bg-app_main flex-1">
        {/* Pages */}
        {activePage === "recents" && <View className="gap-3"></View>}
        {activePage === "search" && (
          <View className="gap-3">
            {loadingSearches && <Text className="text-white">Loading...</Text>}
            {!loadingSearches && searchResults.length === 0 && (
              <Text className="text-white">No Results Found</Text>
            )}
            {!loadingSearches &&
              searchResults.length !== 0 &&
              searchResults.map((foodItem) => (
                <FoodItemComponent
                  key={foodItem.fdcId}
                  foodName={foodItem.description}
                  foodBrand={foodItem.brandOwner}
                />
              ))}
          </View>
        )}
      </ScrollView>

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
          onSubmitEditing={handleSearch}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFoodScreen;
