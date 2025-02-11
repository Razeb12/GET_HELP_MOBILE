import { View, Text, Image, Alert } from "react-native";
import { Bell } from "lucide-react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileHeader() {
  const [notifications] = useState(3);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  async function getProfile() {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No user on the session!");

      // console.log(session?.user.id)
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`fullname, jobcategory, profileimg`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.fullname);
        setWebsite(data.jobcategory);
        setAvatarUrl(data.profileimg);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl, loading]);

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

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    // getProfile();

    const subscribeToProfileUpdates = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const subscription = supabase
        .channel("public:profiles")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${session.user.id}`,
          },
          (payload) => {
            setUsername(payload.new.fullname);
            setWebsite(payload.new.jobcategory);
            setAvatarUrl(payload.new.profileimg);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    };

    subscribeToProfileUpdates();
  }, []);

  return (
    <View className="flex-row justify-between items-center p-4">
      <View className="flex-row items-center gap-3">
        {avatarUrl ? (
          <Image
            source={{
              uri: avatarUrl,
            }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center">
            <Text className="text-xl font-semibold text-white">
              {username
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
        )}
        <View>
            <Text className="text-xl font-semibold">Welcome, {username.split(" ")[0]}!</Text>
          <Text className="text-gray-900">{website}</Text>
        </View>
      </View>
      <View className="relative">
        <Bell size={24} color="#374151" />
        {notifications > 0 && (
          <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-white text-xs">{notifications}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
