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

const AddFoodScreen = () => {
  const [activePage, setActivePage] = useState("recents");

  const onPressPageButton = (title: string) => {
    setActivePage(title);
  };

  return (
    <SafeAreaView className="relative h-screen bg-app_main px-9">
      <ScrollView className="bg-app_main flex-1">
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
        <View className="flex-row w-full">
          <Button
            title="Recents"
            color="#fff"
            onPress={() => onPressPageButton("recents")}
          />
        </View>

        {/* Pages */}
        {activePage === "recents" && (
          <View className="gap-3">
            <FoodItemComponent />
            <FoodItemComponent />
            <FoodItemComponent />
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
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddFoodScreen;
