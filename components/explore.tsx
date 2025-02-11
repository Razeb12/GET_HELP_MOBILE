import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Calendar,
  Home,
  Settings,
  TrendingUp,
  Wallet,
  CheckCircle,
  Star,
  Sun,
} from "lucide-react-native";

const App = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header Section */}
        <View className="px-4 rounded-3xl">
          <LinearGradient
            colors={["#7c3aed", "#6d28d9"]}
            style={{ borderRadius: 18 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <View style={{ flex: 1, borderRadius: 9999 }}>
                <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>
                  Good Morning
                </Text>
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Ready for Today?
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(128, 90, 213, 0.3)",
                  padding: 12,
                  borderRadius: 9999,
                }}
              >
                <Sun size={24} color="white" />
              </View>
            </View>

            <View
              style={{
                backgroundColor: "rgba(128, 90, 213, 0.3)",
                marginTop: 24,
                padding: 16,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Calendar size={24} color="white" />
              <Text style={{ color: "white", marginLeft: 12, fontSize: 18 }}>
                You have 3 tasks scheduled for today
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Performance Section */}
        <View className="mt-6 px-4">
          <Text className="text-2xl font-bold mb-4">Your Performance</Text>
          <View className="flex-row justify-between">
            <View className="bg-white p-4 rounded-xl flex-1 mr-2">
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-lg">Tasks Done</Text>
                <CheckCircle size={20} className="ml-2" color="#10b981" />
              </View>
              <Text className="text-3xl font-bold mt-2">32</Text>
              {/* <Text className="text-green-500 mt-1">+8% this week</Text> */}
            </View>
            <View className="bg-white p-4 rounded-xl flex-1 ml-2">
              <View className="flex-row items-center space-x-4">
                <Text className="text-gray-600 text-lg">Rating</Text>
                <Star size={20} className="ml-4" color="#fbbf24" />
              </View>
              <Text className="text-3xl font-bold mt-2">4.9</Text>
              {/* <Text className="text-purple-500 mt-1">Top Rated</Text> */}
            </View>
          </View>
        </View>

        {/* Today's Tasks Section */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Today's Tasks</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-base">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Task Cards */}
          <View className="bg-white p-4 rounded-xl mb-3">
            <View className="flex-row items-center">
              <View className="bg-green-100 p-3 rounded-full">
                <Home size={24} color="#10b981" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-lg font-semibold">Office Cleaning</Text>
                <Text className="text-gray-500">Tech Hub Co.</Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-600">In Progress</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <Text className="text-gray-500">2:00 PM - 5:00 PM</Text>
              <Text className="text-lg font-bold">$120</Text>
            </View>
          </View>

          <View className="bg-white p-4 rounded-xl">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-3 rounded-full">
                <Home size={24} color="#3b82f6" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-lg font-semibold">Home Cleaning</Text>
                <Text className="text-gray-500">Residential</Text>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-600">Upcoming</Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <Text className="text-gray-500">6:00 PM - 8:00 PM</Text>
              <Text className="text-lg font-bold">$80</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View className="mt-6 px-4 mb-6">
          <Text className="text-xl font-bold mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center">
              <View className="bg-purple-100 p-4 rounded-full mb-2">
                <Calendar size={24} color="#7c3aed" />
              </View>
              <Text className="text-gray-600">Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="bg-blue-100 p-4 rounded-full mb-2">
                <Wallet size={24} color="#3b82f6" />
              </View>
              <Text className="text-gray-600">Earnings</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="bg-green-100 p-4 rounded-full mb-2">
                <TrendingUp size={24} color="#10b981" />
              </View>
              <Text className="text-gray-600">Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="bg-orange-100 p-4 rounded-full mb-2">
                <Settings size={24} color="#f97316" />
              </View>
              <Text className="text-gray-600">Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
