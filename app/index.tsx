
import { selectSessionExpiration, selectSessionToken, store$ } from "@/store/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const Page = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const session = selectSessionToken();
      const expiration = selectSessionExpiration();
      const currentTime = new Date().getTime();
      if (
        session &&
        session !== "" &&
        expiration > 0 &&
        currentTime < expiration
      ) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        store$.setSessionToken("");
        store$.setSessionExpiration(0);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isSignedIn === true) {
      router.replace("/(tabs)");
    } else if (isSignedIn === false) {
      router.replace("/(auth)/login");
    }
  }, [isSignedIn, router]);

  return null; // No page content since redirection happens
};

export default Page;
