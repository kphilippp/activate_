import CalendarWidget from "@/components/tracker/calendar";
import DailyStatsComponent from "@/components/tracker/dailyStats";
import MealTimesComponent from "@/components/tracker/mealTimes";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackerScreen() {
  return (
    <SafeAreaView className="relative h-screen items-center px-7 pt-6 bg-app_main">
      <ScrollView className="relative h-full w-full ">
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
      <CalendarWidget />
    </SafeAreaView>
  );
}
