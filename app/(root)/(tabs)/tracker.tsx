import CalendarWidget from "@/components/tracker/calendar";
import DailyStatsComponent from "@/components/tracker/dailyStats";
import MealTimesComponent from "@/components/tracker/mealTimes";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackerScreen() {
  return (
    <View className="relative h-screen w-full items-center px-7 pt-20 bg-app_main">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative h-full w-full "
      >
        <SignedIn>
          <View className="gap-4 h-screen">
            <DailyStatsComponent />
            <MealTimesComponent mealTime="Breakfast" />
            <MealTimesComponent mealTime="Lunch" />
            <MealTimesComponent mealTime="Dinner" />
            <MealTimesComponent mealTime="Snacks" />
            <MealTimesComponent mealTime="Water" />
          </View>
        </SignedIn>
        <SignedOut>
          <Text>Not Signed In</Text>
        </SignedOut>
      </ScrollView>
    </View>
  );
}
