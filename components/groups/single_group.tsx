import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleGroupComponent = ({ nameOfGroup }: { nameOfGroup: string }) => {
  return (
    <View className="bg-app_secondary rounded-lg p-5">
      <Text className="text-white">{nameOfGroup}</Text>
    </View>
  );
};

export default SingleGroupComponent;
