import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeft,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Camera,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { ProfileData } from "@/types/profile";
import Switch from "@/components/Switch";
import ProfileSection from "@/components/ProfileSection";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Sarah Johnson",
    profession: "Professional Nanny",
    email: "sarah.j@example.com",
    phoneNumber: "+1 234 567 8900",
    workRegions: ["New York City, NY"],
    isAvailable: true,
    certificates: [{ id: "1", name: "First Aid Certificate" }],
    workExperience:
      "5+ years experience in childcare, specialized in newborn care and early childhood development.",
    profileImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-26%20at%2021.36.45-KOwV7rpV7Pm3MvrVZJ0qlp6SQJFQHS.png",
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData((prev) => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const handleSaveChanges = () => {
    // Handle save changes
    console.log("Saving changes:", profileData);
  };

  const handleLogout = () => {
    // Handle logout
    console.log("Logging out");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Profile Image */}
          <View className="items-center mb-6">
            <View className="relative">
              <Image
                source={
                  profileData.profileImage
                    ? { uri: profileData.profileImage }
                    : require("../../assets/images/favicon.png")
                }
                className="w-24 h-24 rounded-full"
              />
              <TouchableOpacity
                onPress={pickImage}
                className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full items-center justify-center"
              >
                <Camera size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-bold mt-4">
              {profileData.fullName}
            </Text>
            <Text className="text-gray-600">{profileData.profession}</Text>
          </View>

          {/* Availability Toggle */}
          <View className="mb-6">
            <Switch
              label="Currently Available"
              value={profileData.isAvailable}
              onValueChange={(value) =>
                setProfileData((prev) => ({ ...prev, isAvailable: value }))
              }
            />
          </View>

          {/* Profile Sections */}
          <View className="mb-6">
            <ProfileSection
              icon={<User size={20} color="#6B7280" />}
              label="Full Name"
              value={profileData.fullName}
              editable
            />
            <ProfileSection
              icon={<Mail size={20} color="#6B7280" />}
              label="Email Address"
              value={profileData.email}
              editable
            />
            <ProfileSection
              icon={<Phone size={20} color="#6B7280" />}
              label="Phone Number"
              value={profileData.phoneNumber}
              editable
            />
            <ProfileSection
              icon={<MapPin size={20} color="#6B7280" />}
              label="Work Regions"
              value={profileData.workRegions[0]}
              editable
            />
          </View>

          {/* Certifications */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">Certifications</Text>
            {profileData.certificates.map((cert) => (
              <View
                key={cert.id}
                className="flex-row items-center justify-between py-2"
              >
                <View className="flex-row items-center">
                  <FileText size={20} color="#6B7280" />
                  <Text className="ml-3">{cert.name}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="pencil" size={20} color="#7C3AED" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity className="mt-4 border border-purple-600 rounded-lg py-3 items-center">
              <Text className="text-purple-600">Add New Certificate</Text>
            </TouchableOpacity>
          </View>

          {/* Work Experience */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">Work Experience</Text>
            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-gray-700">
                {profileData.workExperience}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            <TouchableOpacity
              className="bg-purple-900 rounded-full py-4"
              onPress={handleSaveChanges}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Save Changes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-purple-600 rounded-full py-4"
              onPress={handleLogout}
            >
              <Text className="text-purple-600 text-center text-lg font-semibold">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
