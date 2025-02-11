import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: "Login" }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
          title: "Register",
          // presentation: "modal",
        }}
      />
      {/* <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: false,
          title: "forgot-password",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          presentation: "modal",
          headerTitle: "Recover your account",
          headerBackTitle: "Back",
          headerTintColor: "#000000",
          headerStyle: { backgroundColor: "#ffffff" },
        }}
      />
      <Stack.Screen
        name="validation"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          presentation: "modal",
          headerTitle: "Validation",
          headerBackTitle: "Back",
          headerTintColor: "#000000",
          headerStyle: { backgroundColor: "#ffffff" },
        }}
      /> */}
    </Stack>
  );
}
