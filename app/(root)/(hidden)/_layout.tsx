import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="add-food" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
