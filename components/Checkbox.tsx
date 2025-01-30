import type React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  error,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onCheckedChange(!checked)}
        className={`w-6 h-6 rounded border items-center justify-center ${
          checked ? "bg-purple-600 border-purple-600" : "border-gray-400"
        }`}
      >
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </TouchableOpacity>
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

export default Checkbox;
