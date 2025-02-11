import { View, Text, Pressable } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

const jobs = [
  { title: "House Cleaning", distance: "2.5 km away", price: "$80" },
  { title: "Office Cleaning", distance: "3.8 km away", price: "$120" },
];

export default function JobOffers() {
  return (
    <View className="p-4">
      <Text className="text-xl font-semibold mb-4">New Job Offers</Text>
      {jobs.map((job, index) => (
        <Animated.View
          key={job.title}
          entering={FadeInRight.delay(index * 200)}
          className="bg-white p-4 rounded-lg shadow-sm mb-3 flex-row justify-between items-center"
        >
          <View>
            <Text className="text-lg font-semibold">{job.title}</Text>
            <Text className="text-gray-600">
              {job.distance} • {job.price}
            </Text>
          </View>
          <Pressable className="bg-purple-600 px-6 py-2 rounded-lg">
            <Text className="text-white font-medium">View</Text>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
}
