import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { router } from "expo-router";
import OAuth from "@/components/auth/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { icons, images } from "@/constants";

import { ReactNativeModal } from "react-native-modal";
import CustomInput from "@/components/CustomInput";
import { fetchAPI } from "@/lib/fetch";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = () => {
  // this is our form data object stores all info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // these are just variables provided by Clerk, see documentation
  const { isLoaded, signUp, setActive } = useSignUp();

  // veritication is used for on press sign up
  // when waiting for verification code, we set state to pending
  // this conditionallity renders the verification modal later
  // we can also store the verification code inside this object
  // we can also store any error associated with verification here
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // This is used to show to success Modal following
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // This is what happens when press Sign Up
  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // This is what happens when press Verify, this step happens after handle SignUp
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //TODO: Create User in PostgreSQL database if Clerk User Created
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            clerkID: completeSignUp.createdUserId,
          }),
        });

        console.log("back in signup\n");

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-login_main justify-between px-16 py-20">
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
          <View className="mb-16">
            <Text className="font-bold text-heading leading-[3.7rem] text-text_primary">
              Welcome Back
            </Text>
            <Text className="text-subheading ml-1 text-text_primary">
              Achieve your fitness alongside your friends
            </Text>
          </View>

          <View className="flex-grow">
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View className="gap-3">
                <View className="flex-row gap-3">
                  <TextInput
                    className="bg-input_background placeholder:text-input_placeholder text-text_primary rounded-lg p-5  flex-1"
                    placeholder="FirstName"
                    onChangeText={(changed) =>
                      setFormData({ ...formData, firstName: changed })
                    }
                    value={formData.firstName}
                  ></TextInput>
                  <TextInput
                    className="bg-input_background placeholder:text-input_placeholder text-text_primary rounded-lg p-5  flex-1"
                    placeholder="LastName"
                    onChangeText={(changed) =>
                      setFormData({ ...formData, lastName: changed })
                    }
                    value={formData.lastName}
                  ></TextInput>
                </View>

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
                  placeholder="Passwords"
                  onChangeText={(changed) =>
                    setFormData({ ...formData, password: changed })
                  }
                  secureTextEntry={true}
                  value={formData.password}
                ></TextInput>
              </View>
            </KeyboardAvoidingView>
            <View className="gap-3">
              <CustomButton
                title="Sign Up"
                className="bg-button_primary rounded-xl py-4 shadow-none"
                onPress={handleSignUp}
              />
              {/* OAuth Button */}
              <OAuth />
              <TouchableWithoutFeedback
                onPress={() => {
                  router.replace("/(auth)/sign_in");
                }}
              >
                <View className="flex-row justify-center">
                  <Text className="text-center text-text_primary mr-3">
                    Already have an Account?
                  </Text>
                  <Text className="text-center text-button_primary">
                    Login In
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            {/* Verification Modal */}
            <ReactNativeModal
              isVisible={verification.state === "pending"}
              onModalHide={() => {
                if (verification.state === "success") setShowSuccessModal(true);
              }}
            >
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl text-center">Verification</Text>
                <Text className="text-base text-gray-400 text-center">
                  We've sent a verification code to your email!{formData.email}
                </Text>
                <CustomInput
                  label="Code"
                  icon={icons.lock}
                  placeholder="Enter code here"
                  labelStyle="mt-6"
                  value={verification.code}
                  keyboardType="numeric"
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />
                {verification.error && (
                  <Text className="text-red-500 text-sm mt-1">
                    Invalid Verification Code
                  </Text>
                )}
                <CustomButton
                  title="Verify Email"
                  className="mt-5 bg-green-600 rounded-2xl "
                  onPress={onPressVerify}
                />
              </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={showSuccessModal}>
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Image
                  source={images.check}
                  className="w-[110px] h-[110px] mx-auto my-5"
                />
                <Text className="text-2xl text-center">Verified</Text>
                <Text className="text-base text-gray-400 text-center">
                  You have successfully verified your account
                </Text>
                <CustomButton
                  title="Go Home"
                  className="mt-5 bg-button_primary rounded-2xl "
                  onPress={() => {
                    setShowSuccessModal(false);
                    router.push("/(root)/(tabs)/tracker");
                  }}
                />
              </View>
            </ReactNativeModal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
