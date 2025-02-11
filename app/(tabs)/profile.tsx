import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Camera, FileText, Check, Pencil } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as ImagePicker from "expo-image-picker";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    location: "",
    bio: "",
    certifications: [],
    profileimg: null,
    available: false,
  });
  const [isAvailable, setIsAvailable] = useState(profile.available || false);
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (profile.profileimg) downloadImage(profile.profileimg);
  }, [profile.profileimg, loading]); // Removed unnecessary dependency: session

  const fetchSession = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  interface Profile {
    fullname: string;
    email: string;
    phone_number: string;
    location: string;
    bio: string;
    certifications: string[];
    experience?: string;
    phonenumber?: string;
    profileimg?: string;
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", session.user.id);

    if (error) {
      Alert.alert("Error", "Failed to update profile");
    } else {
      fetchSession(); // Refresh profile data
    }
  };

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error("No image uri!");
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `profileImg/${session?.user.id}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.log(uploadError);
        throw uploadError;
      }

      await updateProfile({ profileimg: data.path });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  const EditableField = ({
    label,
    value,
    field,
  }: {
    label: string;
    value: string;
    field: string;
  }) => {
    const inputRef = React.useRef<TextInput>(null);
    const [localValue, setLocalValue] = useState(value);

    const handleEdit = () => {
      setIsEditing(field);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSave = () => {
      updateProfile({ [field]: localValue });
      setIsEditing("");
    };

    const isEditable = field !== "email";

    return (
      <View className="flex-row items-center py-4 border-b border-gray-100">
        <View className="w-8">
          <FileText size={24} color="#666" />
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-gray-600 text-sm">{label}</Text>
          <View className="flex-row items-center justify-between">
            {isEditing === field && isEditable ? (
              <TextInput
                ref={inputRef}
                value={localValue}
                onChangeText={setLocalValue}
                className="flex-1 text-gray-900 text-lg"
                onBlur={handleSave}
              />
            ) : (
              <Text className="flex-1 text-gray-900 text-lg">{value}</Text>
            )}
            {isEditable && (
              <TouchableOpacity
                onPress={isEditing === field ? handleSave : handleEdit}
                className="p-2"
              >
                {isEditing === field ? (
                  <Check size={20} color="#581c87" />
                ) : (
                  <Pencil size={20} color="#581c87" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const EditableExperience = () => {
    const inputRef = React.useRef<TextInput>(null);
    const [localValue, setLocalValue] = useState(profile.bio);

    const handleEdit = () => {
      setIsEditing("bio");
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSave = () => {
      updateProfile({ bio: localValue });
      setIsEditing("");
    };

    return (
      <View className="bg-gray-50 p-4 rounded-lg">
        <View className="flex-row justify-between items-start">
          {isEditing === "bio" ? (
            <TextInput
              ref={inputRef}
              value={localValue}
              onChangeText={setLocalValue}
              multiline
              className="flex-1 text-gray-900 mr-4"
              onBlur={handleSave}
            />
          ) : (
            <Text className="flex-1 text-gray-900 mr-4">{profile.bio}</Text>
          )}
          <TouchableOpacity
            onPress={isEditing === "bio" ? handleSave : handleEdit}
            className="p-2"
          >
            {isEditing === "bio" ? (
              <Check size={20} color="#581c87" />
            ) : (
              <Pencil size={20} color="#581c87" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="items-center pt-6 pb-4">
          <TouchableOpacity onPress={uploadAvatar} className="relative">
            {avatarUrl ? (
              <Image
                source={{
                  uri: avatarUrl as string,
                }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center">
                <Text className="text-xl font-semibold text-white">
                  {profile?.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </Text>
              </View>
            )}
            <View className="absolute right-0 bottom-0 bg-purple-800 p-2 rounded-full">
              <Camera size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-2xl font-semibold mt-4">
            {profile?.fullname}
          </Text>
          <Text className="text-gray-600 text-lg">Professional Nanny</Text>
        </View>

        <View className="flex-row justify-between items-center px-4 py-4 bg-gray-50 mb-4">
          <Text className="text-lg">Currently Available</Text>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: "#e5e7eb", true: "#581c87" }}
          />
        </View>

        <View className="px-4">
          <EditableField
            label="Full Name"
            value={profile?.fullname}
            field="fullname"
          />
          <EditableField
            label="Email Address"
            value={profile.email}
            field="email"
          />
          <EditableField
            label="Phone Number"
            value={profile.phonenumber}
            field="phonenumber"
          />
          <EditableField
            label="Work Regions"
            value={profile.location}
            field="location"
          />
        </View>

        <View className="px-4 mt-6">
          <Text className="text-xl font-semibold mb-4">Certifications</Text>
          {profile?.certifications?.map((cert, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center py-3 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <FileText size={24} color="#666" />
                <Text className="ml-2 text-lg">{cert}</Text>
              </View>
              <Pencil size={20} color="#581c87" />
            </View>
          ))}
          <TouchableOpacity className="mt-4">
            <Text className="text-purple-600 text-lg text-center">
              Add New Certificate
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-6">
          <Text className="text-xl font-semibold mb-4">Work Experience</Text>
          <EditableExperience />
        </View>

        <View className="px-4 mt-8">
          <TouchableOpacity
            className="mt-4 py-4 rounded-lg border border-gray-200"
            onPress={async () => {
              await supabase.auth.signOut();
              router.replace("/(auth)/login");
            }}
          >
            <Text className="text-purple-600 text-center text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {(uploading || loading) && (
        <LoadingOverlay message={loading ? "Loading" : "Uploading"} />
      )}
    </SafeAreaView>
  );
}
