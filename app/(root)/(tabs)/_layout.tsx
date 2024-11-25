import React from "react";
import { Dimensions, View, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CalorieCirclesScreen from "./groups";
import ProfileScreen from "./profile";
import TrackerScreen from "./tracker";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const TabLayout = () => {
  const screens = [
    { key: "groups", component: <CalorieCirclesScreen /> },
    { key: "tracker", component: <TrackerScreen /> },
    { key: "profile", component: <ProfileScreen /> },
  ];

  return (
    <Carousel
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      data={screens}
      loop={false}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
        >
          {item.component}
        </View>
      )}
    />
  );
};

export default TabLayout;
