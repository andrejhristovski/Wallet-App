import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SettingsScreen() {
  const { clearToken } = useAuthStore();
  const router = useRouter();

  const handleSignOut = () => {
    clearToken();
  };

  return (
    <View className="flex-1 bg-[#1F1F22]">
      {/* Status bar spacing */}
      <View className="h-10 bg-[#1F1F22]" />

      {/* Header */}
      <View className="pt-4 px-5 pb-4 bg-[#1F1F22] flex-row items-center justify-between">
        <TouchableOpacity
          className="w-9 h-9 rounded-full items-center justify-center bg-[#2A2A2E]"
          onPress={() => router.back()}
        >
          <Icon name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Settings</Text>
        <View className="w-9 h-9" />
      </View>

      <ScrollView className="flex-1 px-5">
        {/* Account Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-white mb-4">Account</Text>

          <View className="bg-[#2A2B2F] rounded-xl p-4 mb-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#4F46E5] rounded-full items-center justify-center mr-4">
                <Icon name="person" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base">
                  Demo User
                </Text>
                <Text className="text-white text-sm">demo@example.com</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-white mb-4">Preferences</Text>

          <TouchableOpacity className="flex-row items-center p-4 bg-[#2A2B2F] rounded-xl mb-3">
            <Icon name="moon" size={20} color="#4F46E5" />
            <Text className="flex-1 text-white text-base ml-4">Dark Mode</Text>
            <Icon name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 bg-[#2A2B2F] rounded-xl mb-3">
            <Icon name="notifications" size={20} color="#34C759" />
            <Text className="flex-1 text-white text-base ml-4">
              Notifications
            </Text>
            <Icon name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 bg-[#2A2B2F] rounded-xl mb-3">
            <Icon name="shield-checkmark" size={20} color="#FF9500" />
            <Text className="flex-1 text-white text-base ml-4">Security</Text>
            <Icon name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-white mb-4">Support</Text>

          <TouchableOpacity className="flex-row items-center p-4 bg-[#2A2B2F] rounded-xl mb-3">
            <Icon name="help-circle" size={20} color="#007AFF" />
            <Text className="flex-1 text-white text-base ml-4">Help & FAQ</Text>
            <Icon name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 bg-[#2A2B2F] rounded-xl mb-3">
            <Icon name="mail" size={20} color="#34C759" />
            <Text className="flex-1 text-white text-base ml-4">
              Contact Support
            </Text>
            <Icon name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 bg-[#2A2B2F] rounded-xl mb-3">
            <Icon name="document-text" size={20} color="#FF9500" />
            <Text className="flex-1 text-white text-base ml-4">
              Terms of Service
            </Text>
            <Icon name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Section */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-red-600 py-4 px-6 rounded-xl items-center"
          >
            <View className="flex-row items-center">
              <Icon name="log-out" size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-2">
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
