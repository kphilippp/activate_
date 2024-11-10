import CustomButton from "../../components/CustomButton";
import { useCallback, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";

import { useRouter } from "expo-router";
import OAuth from "@/components/auth/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignInScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/tracker");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Incorrect Login Credentials");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Sign In Error", err.error[0].longMessage);
    }
  }, [isLoaded, formData.email, formData.password]);

  return (
    <SafeAreaView className="flex-1 bg-login_main ">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-between px-16 py-20">
            <View className="mb-32">
              <Text className="font-bold text-heading leading-[3.7rem] text-text_primary">
                Welcome Back
              </Text>
              <Text className="text-subheading ml-1 text-text_primary">
                Achieve your fitness alongside your friends
              </Text>
            </View>
            <View className="flex-1">
              <View className="gap-3 mb-12">
                <TextInput
                  className="bg-input_background placeholder:text-input_placeholder text-text_primary rounded-lg p-5 "
                  placeholder="Email"
                  onChangeText={(changed) =>
                    setFormData({ ...formData, email: changed })
                  }
                  value={formData.email}
                ></TextInput>
                <TextInput
                  className="bg-input_background placeholder:text-input_placeholder text-text_primary rounded-lg p-5 "
                  placeholder="Password"
                  onChangeText={(changed) =>
                    setFormData({ ...formData, password: changed })
                  }
                  value={formData.password}
                ></TextInput>
              </View>
              <View className="gap-3">
                <CustomButton
                  title="Log In"
                  className="bg-button_primary rounded-xl py-4 shadow-none"
                  onPress={handleLogin}
                />
                <OAuth />
                <TouchableWithoutFeedback
                  onPress={() => {
                    router.replace("/(auth)/sign_up");
                  }}
                >
                  <View className="flex-row justify-center">
                    <Text className="text-center text-text_primary mr-3">
                      Don't have an Account?
                    </Text>
                    <Text className="text-center text-button_primary">
                      Sign Up
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
