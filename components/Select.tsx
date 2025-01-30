import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  error?: string;
  placeholder?: string;
}

const Select = ({
  label,
  value,
  onValueChange,
  options,
  error,
  placeholder = "Select an option",
}: SelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-2">
      <View className="py-1 bg-white">
        <Text
          style={{ fontFamily: "noto-sans-medium" }}
          className="text-[#000000] text-[14px]"
        >
          {label}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={`h-[52px] border rounded-lg px-3 w-full flex-row items-center justify-between ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-blue-500"
            : "border-gray-400"
        }`}
      >
        <Text className={value ? "text-black" : "text-gray-400"}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-xl">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-lg font-medium">Select {label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`p-4 border-b border-gray-100 ${
                    item === value ? "bg-purple-50" : ""
                  }`}
                  onPress={() => {
                    onValueChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    className={`${
                      item === value ? "text-purple-600" : "text-black"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              className="max-h-96"
            />
          </View>
        </View>
      </Modal>

      {error && (
        <Text
          style={{ fontFamily: "noto-sans" }}
          className="text-red-500 text-xs mt-1"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Select;
