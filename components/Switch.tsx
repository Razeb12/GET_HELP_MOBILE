import type React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, label }) => {
  const offset = useSharedValue(value ? 22 : 0);

  const toggleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const onToggle = () => {
    offset.value = withSpring(value ? 0 : 22);
    onValueChange(!value);
  };

  return (
    <View className="flex-row items-center justify-between">
      {label && (
        <Text
          className="text-gray-800 text-base"
          style={{ fontFamily: "noto-sans-medium" }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        className={`w-12 h-6 rounded-full ${
          value ? "bg-purple-600" : "bg-gray-300"
        }`}
      >
        <Animated.View
          className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
          style={toggleStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Switch;
