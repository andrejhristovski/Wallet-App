import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/auth";
import { useWalletStore } from "@/store/wallet";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loadToken, token, isLoading } = useAuthStore();
  const { loadPersistedData } = useWalletStore();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();
  const segments = useSegments();

  // Load persisted data on app start
  useEffect(() => {
    const initializeStores = async () => {
      try {
        await Promise.all([loadToken(), loadPersistedData()]);
      } catch (error) {
        console.error("Error initializing stores:", error);
        // Continue with app initialization even if stores fail
      }
    };

    if (loaded) {
      initializeStores();
    }
  }, [loaded, loadToken, loadPersistedData]);

  useEffect(() => {
    if (!loaded) return;
    if (isLoading) return;

    const inAuth = segments[0] === "login";

    if (!token && !inAuth) {
      router.replace("/login");
    } else if (token && inAuth) {
      router.replace("/(tabs)");
    }
  }, [loaded, token, isLoading, segments, router]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
