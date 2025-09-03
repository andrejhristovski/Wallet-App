import { ThemedText } from "@/components/ThemedText";
import { useAuthStore } from "@/store/auth";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { clearToken } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center bg-[#1F1F22] p-6">
      <ThemedText type="title" className="mb-4">
        Settings
      </ThemedText>

      <TouchableOpacity
        onPress={clearToken}
        className="bg-red-600 py-3 px-4 rounded-xl"
      >
        <ThemedText className="text-white font-semibold">Sign Out</ThemedText>
      </TouchableOpacity>
    </View>
  );
}
