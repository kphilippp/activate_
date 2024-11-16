import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { View, ImageSourcePropType, Image, ScrollView } from "react-native";

const TabBarIcon = ({
  focused,
  iconSrc,
}: {
  focused: boolean;
  iconSrc: ImageSourcePropType;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full 
    }`}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${
        focused ? "bg-input_background" : ""
      }`}
    >
      <Image
        source={iconSrc}
        tintColor="#FFF"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="tracker"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          borderTopWidth: 0,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon iconSrc={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: "Tracker",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon iconSrc={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon iconSrc={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
