import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const stats = [
  { number: "24", label: "Total Jobs" },
  { number: "18", label: "Accepted" },
  { number: "15", label: "Completed" },
];

export default function StatsSection() {
  return (
    <View className="flex-row justify-between px-4 py-6">
      {stats.map((stat, index) => (
        <Animated.View
          key={stat.label}
          entering={FadeInUp.delay(index * 100)}
          className="bg-white p-4 rounded-lg shadow-sm flex-1 mx-1 items-center"
        >
          <Text className="text-2xl font-bold text-purple-600">
            {stat.number}
          </Text>
          <Text className="text-gray-600 text-sm">{stat.label}</Text>
        </Animated.View>
      ))}
    </View>
  );
}
