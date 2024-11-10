import CalendarWidget from "@/components/tracker/calendar";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { user } = useUser();
  return (
    <SafeAreaView className="flex-1 items-center px-7 pt-6 bg-app_main">
      <SignedIn>
        <CalendarWidget />
      </SignedIn>

      <SignedOut>
        <Text>Not Signed In</Text>
      </SignedOut>
    </SafeAreaView>
  );
}
