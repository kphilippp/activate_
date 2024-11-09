import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  const { user } = useUser();
  return (
    <View className="flex-1 justify-center align-middle">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Text>Not Signed In</Text>
      </SignedOut>
    </View>
  );
}
