import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const CalendarWidget = () => {
  const dates = [
    { dayname: "Sun", date: new Date() },
    { dayname: "Sun", date: new Date() },
    { dayname: "Sun", date: new Date() },
    { dayname: "Sun", date: new Date() },
    { dayname: "Sun", date: new Date() },
    { dayname: "Sun", date: new Date() },
  ];

  return (
    <View className="bg-green-200 py-6 ">
      <View className="w-screen flex-row items-start justify-between -mx-4">
        {dates.map((dateItem, dateIndex) => {
          return (
            <View className="flex-1 h-9 items-center flex-col">
              <Text>{dateItem.dayname}</Text>
              <Text>{dateItem.date.getDate()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarWidget;
