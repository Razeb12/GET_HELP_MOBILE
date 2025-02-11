import { View, Text } from "react-native";
import { Star } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function StatusSection() {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withSpring(0.85);
  }, [progressWidth]); // Added progressWidth to dependencies

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-green-700">Active</Text>
        </View>
        <View className="flex-row items-center">
          <Star size={20} color="#FFB800" fill="#FFB800" />
          <Text className="text-lg ml-1">4.8</Text>
        </View>
      </View>

      <View>
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <Animated.View
            className="h-full bg-purple-500 rounded-full"
            style={animatedStyle}
          />
        </View>
        <Text className="text-gray-600 mt-2">Profile completion: 85%</Text>
      </View>
    </View>
  );
}
