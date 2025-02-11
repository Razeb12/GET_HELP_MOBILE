import Input from "@/components/Input";
import LoadingOverlay from "@/components/LoadingOverlay";
import { supabase } from "@/lib/supabase";
import { LoginFormData, loginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else router.replace("/(tabs)");
    setLoading(false);
  }

  const onSubmit = (data: LoginFormData) => {
    signInWithEmail(data.email, data.password);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6 pt-10">
      <View className="items-center mb-8">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-24 h-24 mb-10"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-purple-900 mb-2">
          Welcome Back!
        </Text>
        <Text className="text-gray-500 text-lg">Sign in to continue</Text>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email Address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter your email"
            error={errors.email?.message}
            type="text"
            keyboardType="email-address"
            autoCapitalize="none"
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
            placeholder="Enter your password"
            error={errors.password?.message}
            type="password"
            sensitive={true}
          />
        )}
      />

      <TouchableOpacity className="self-end mb-6">
        <Text className="text-purple-600 text-base">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`bg-purple-900 rounded-full py-4 mb-6 ${
          loading ? "opacity-50" : ""
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {loading ? "Please wait..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      {loading && <LoadingOverlay message="Logging In" />}
      {/* <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-4 text-gray-500">or continue with</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <View className="flex-row justify-between mb-6">
        <TouchableOpacity className="flex-1 mr-2 flex-row items-center justify-center border border-gray-300 rounded-full py-3">
          <Image
            source={{ uri: "https://www.google.com/favicon.ico" }}
            className="w-5 h-5 mr-2"
          />
          <Text className="text-gray-700">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 ml-2 flex-row items-center justify-center border border-gray-300 rounded-full py-3">
          <Image
            source={{ uri: "https://www.facebook.com/favicon.ico" }}
            className="w-5 h-5 mr-2"
          />
          <Text className="text-gray-700">Facebook</Text>
        </TouchableOpacity>
      </View> */}

      <View className="flex-row justify-center">
        <Text className="text-gray-600 mr-1">Don't have an account?</Text>
        <Link href="/register">
          <Text className="text-purple-600">Register</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
