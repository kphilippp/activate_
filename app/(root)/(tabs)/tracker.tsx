import CalendarWidget from "@/components/tracker/calendar";
import DailyStatsComponent from "@/components/tracker/dailyStats";
import MealTimesComponent from "@/components/tracker/mealTimes";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackerScreen() {
  const { user } = useUser();
  return (
    <SafeAreaView className="flex-1 items-center px-7 pt-6 bg-app_main">
      <ScrollView>
        <SignedIn>
          <CalendarWidget />
          <DailyStatsComponent />
          <MealTimesComponent mealTime="Breakfast" />
          <MealTimesComponent mealTime="Lunch" />
          <MealTimesComponent mealTime="Dinner" />
          <MealTimesComponent mealTime="Snacks" />
          <MealTimesComponent mealTime="Water" />
        </SignedIn>

        <SignedOut>
          <Text>Not Signed In</Text>
        </SignedOut>
      </ScrollView>
    </SafeAreaView>
  );
}
