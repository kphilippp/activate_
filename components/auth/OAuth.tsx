import { View, Text, Image, ImageBase } from "react-native";
import CustomButton from "../CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {};

  return (
    <View className="">
      <View className="flex-row justify-center items-center">
        <View className="flex-1 h-[1px] bg-white"></View>
        <Text className="flex-1 text-text_primary text-center">OR</Text>
        <View className="flex-1 h-[1px] bg-white"></View>
      </View>

      <CustomButton
        title="Sign in With Google"
        className="mt-3 w-full shadow-none rounded-xl"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="white"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
