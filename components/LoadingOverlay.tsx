import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <View className=" p-6 rounded-xl items-center">
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text className="text-white font-semibold mt-4 text-lg">
          {message}
        </Text>
      </View>
    </View>
  );
};

export default LoadingOverlay;
