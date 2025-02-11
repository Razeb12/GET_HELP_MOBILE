import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import LoadingOverlay from "@/components/LoadingOverlay";
import Select from "@/components/Select";
import { supabase } from "@/lib/supabase";
import { jobCategories, RegisterFormData, registerSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  async function signUpWithEmail(
    email: string,
    password: string,
    fullName: string,
    jobCategory: string,
    phoneNumber: string
  ) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          fullName: fullName,
          jobCategory: jobCategory,
          phoneNumber: phoneNumber,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      setLoading(false);
      // Alert.alert("Please check your inbox for email verification!");
      router.replace("/(tabs)");
    }
  }

  const onSubmit = (data: RegisterFormData) => {
    signUpWithEmail(
      data.email,
      data.password,
      data.fullName,
      data.category,
      data.phoneNumber
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="">
        <View className="px-6">
          <View className="items-center mb-8">
            <View className="w-[90%] max-h-[90px] mx-auto items-center mb-10">
              <Image
                source={require("../../assets/images/logo.png")}
                className="w-24 h-24 mt-6"
                resizeMode="contain"
              />
            </View>
            <Text className="text-3xl font-bold text-purple-900 mb-2 mt-2">
              Create Account
            </Text>
            <Text className="text-gray-500 text-lg text-center">
              Join our community of service providers
            </Text>
          </View>

          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your full name"
                error={errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="your@email.com"
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone Number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="+1 (123) 456-7890"
                error={errors.phoneNumber?.message}
                keyboardType="phone-pad"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Create password"
                error={errors.password?.message}
                type="password"
                sensitive={true}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Confirm password"
                error={errors.confirmPassword?.message}
                type="password"
                sensitive={true}
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Job Category"
                value={value}
                onValueChange={onChange}
                options={jobCategories}
                error={errors.category?.message}
                placeholder="Select your category"
              />
            )}
          />

          <Controller
            control={control}
            name="termsAccepted"
            render={({ field: { onChange, value } }) => (
              <View className="flex-row items-start mb-6">
                <Checkbox
                  checked={value}
                  onCheckedChange={onChange}
                  error={errors.termsAccepted?.message}
                />
                <View className="flex-1 ml-3">
                  <Text className="text-gray-600">
                    I agree to the{" "}
                    <Text className="text-purple-600">
                      Terms and Conditions
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          />

          <TouchableOpacity
            className="bg-purple-900 rounded-lg py-4 mb-6"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Create Account
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-600 mr-1">Already have an account?</Text>
            <Link href="/(auth)/login">
              <Text className="text-purple-600">Login</Text>
            </Link>
          </View>
        </View>
        {loading && <LoadingOverlay message="Please wait..." />}
      </ScrollView>
    </SafeAreaView>
  );
}
