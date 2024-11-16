import {
  Dimensions,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import React, { useMemo, useRef, useState } from "react";
import Swiper from "react-native-swiper";

const screenWidth = Dimensions.get("window").width;

// Todays date
const todaysDate = new Date();

const CalendarWidget = () => {
  const [activeDate, setActiveDate] = useState(todaysDate);
  const scrollViewRef = useRef<ScrollView>(null);

  // All dates from start to end in a specified interval
  const dates = useMemo(
    () =>
      eachWeekOfInterval(
        // two obj: the interval, which week it starts on
        {
          start: subDays(todaysDate, 7),
          end: addDays(todaysDate, 7),
        },
        { weekStartsOn: 1 }

        // your first have an array of each week of an interval
        // you are reduceing it to get the dates of each day as well
        // takes to args: callback func & initial value
        //    - accumulator - 2D array of all weeks,
        //    - current - cur is just the current date of each week
      ).reduce((accumulatedDates: Date[][], cur) => {
        const allDays = eachDayOfInterval({
          start: cur,
          end: addDays(cur, 6),
        });

        accumulatedDates.push(allDays);

        return accumulatedDates;
      }, []),
    [todaysDate]
  );

  const handleDateSelected = (
    day: Date,
    dayIndex: number,
    weekIndex: number
  ) => {
    setActiveDate(day);

    if (scrollViewRef.current) {
      const offset =
        weekIndex * screenWidth + (dayIndex - 1) * (screenWidth / 7);
      scrollViewRef.current.scrollTo({
        x: offset > 0 ? offset : 0,
        animated: true,
      });
    }
  };

  return (
    <View className="h-32 absolute w-full  bottom-[120px] rounded-xl">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false} // Allow smooth scrolling instead of snapping
        className="rounded-xl"
      >
        {dates.map((week, weekIndex) => {
          return (
            <View key={weekIndex} className="bg-app_secondary py-6 flex-row">
              {week.map((day, dayIndex) => {
                const dayLetter = format(day, "EEEEE");

                return (
                  <TouchableWithoutFeedback
                    key={dayIndex}
                    onPress={() => handleDateSelected(day, dayIndex, weekIndex)}
                  >
                    <View
                      className={`${
                        activeDate === day ? "bg-nav_active" : "bg-nav_inactive"
                      } flex-col justify-center items-center rounded-lg mx-1 px-6`}
                    >
                      <Text className="text-white text-sm w-fit">
                        {dayLetter}
                      </Text>
                      <Text className="text-white text-2xl font-extrabold w-fit">
                        {day.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CalendarWidget;
