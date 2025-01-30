import type React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileSectionProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onPress?: () => void;
  editable?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  icon,
  label,
  value,
  onPress,
  editable = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center py-4 border-b border-gray-200"
    >
      <View className="w-8 items-center">{icon}</View>
      <View className="flex-1 ml-3">
        <Text
          className="text-gray-500 text-sm"
          style={{ fontFamily: "noto-sans" }}
        >
          {label}
        </Text>
        <Text
          className="text-gray-900 text-base"
          style={{ fontFamily: "noto-sans-medium" }}
        >
          {value}
        </Text>
      </View>
      {editable && (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      )}
    </TouchableOpacity>
  );
};

export default ProfileSection;
