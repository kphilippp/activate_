import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import onboardingScreens from "../../constants/OnboardingScreenDetails";

const WelcomePage = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-login_main items-center px-16 py-36">
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-8 h-1 flex-1 bg-swiperInactive mx-0.5 " />}
        activeDot={<View className="w-8 h-1 flex-1 bg-swiperActive mx-0.5" />}
        onIndexChanged={(index: number) => setActiveIndex(index)}
      >
        {onboardingScreens.map((screen, index) => (
          <View key={index} className="flex-1  justify-between">
            <View className="gap-2.5">
              <Text className="text-text_primary font-bold text-[60px] leading-[55px]">
                {screen.title}
              </Text>
              <Text className="text-text_primary text-[20px]">
                {screen.caption}
              </Text>
            </View>
            <View className="gap-5">
              <View className="gap-2.5"></View>
            </View>
          </View>
        ))}
      </Swiper>
      {activeIndex === 2 ? (
        <CustomButton
          title="Continue"
          className="bg-button_primary shadow-none self-stretch py-5 rounded-xl"
          onPress={() => {
            router.replace("/(auth)/sign_up");
          }}
        />
      ) : (
        <CustomButton
          title="Skip"
          className="bg-button_primary shadow-none self-stretch py-5 rounded-xl"
          onPress={() => {
            router.replace("/(auth)/sign_up");
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default WelcomePage;
