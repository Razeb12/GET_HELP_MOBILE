import { View, Text, Pressable } from "react-native";
import { Calendar, Star } from "lucide-react-native";

export default function ActionCards() {
  return (
    <View className="flex-row px-4 gap-4">
      <Pressable className="flex-1 bg-white p-4 rounded-lg shadow-sm">
        <Calendar size={24} color="#9333EA" />
        <Text className="text-lg font-semibold mt-2">Availability</Text>
        <Text className="text-gray-600">Update schedule</Text>
      </Pressable>

      <Pressable className="flex-1 bg-white p-4 rounded-lg shadow-sm">
        <Star size={24} color="#9333EA" />
        <Text className="text-lg font-semibold mt-2">Reviews</Text>
        <Text className="text-gray-600">View feedback</Text>
      </Pressable>
    </View>
  );
}
