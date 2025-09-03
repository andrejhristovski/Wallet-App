import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function InfoScreen() {
  return (
    <ScrollView className="flex-1 bg-[#f8f9fa]">
      <View className="p-5 pt-16 bg-[#434447]">
        <Text className="text-[28px] font-bold text-white">Info</Text>
        <Text className="text-base text-[#cccccc] mt-1">
          App information & settings
        </Text>
      </View>

      <View className="m-5">
        <Text className="text-lg font-bold text-[#434447] mb-4">
          App Information
        </Text>

        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row items-center py-2 border-b border-[#f0f0f0]">
            <Icon name="phone-portrait" size={20} color="#007AFF" />
            <Text className="flex-1 text-base text-[#434447] ml-4">
              App Version
            </Text>
            <Text className="text-base text-[#666666] font-medium">1.0.0</Text>
          </View>

          <View className="flex-row items-center py-2 border-b border-[#f0f0f0]">
            <Icon name="calendar" size={20} color="#34C759" />
            <Text className="flex-1 text-base text-[#434447] ml-4">
              Build Date
            </Text>
            <Text className="text-base text-[#666666] font-medium">
              Dec 2024
            </Text>
          </View>

          <View className="flex-row items-center py-2">
            <Icon name="code" size={20} color="#FF9500" />
            <Text className="flex-1 text-base text-[#434447] ml-4">
              React Native
            </Text>
            <Text className="text-base text-[#666666] font-medium">0.79.5</Text>
          </View>
        </View>
      </View>

      <View className="m-5">
        <Text className="text-lg font-bold text-[#434447] mb-4">Support</Text>

        <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-xl mb-2 shadow-sm">
          <Icon name="help-circle" size={20} color="#007AFF" />
          <Text className="flex-1 text-base text-[#434447] ml-4">
            Help & FAQ
          </Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-xl mb-2 shadow-sm">
          <Icon name="mail" size={20} color="#34C759" />
          <Text className="flex-1 text-base text-[#434447] ml-4">
            Contact Support
          </Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-xl mb-2 shadow-sm">
          <Icon name="document-text" size={20} color="#FF9500" />
          <Text className="flex-1 text-base text-[#434447] ml-4">
            Terms of Service
          </Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-xl mb-2 shadow-sm">
          <Icon name="shield-checkmark" size={20} color="#5856D6" />
          <Text className="flex-1 text-base text-[#434447] ml-4">
            Privacy Policy
          </Text>
          <Icon name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>
      </View>

      <View className="m-5">
        <Text className="text-lg font-bold text-[#434447] mb-4">About</Text>

        <View className="bg-white rounded-xl p-5 shadow-sm">
          <Text className="text-base text-[#666666] leading-6">
            This is a demo wallet application built with React Native and React
            Navigation. It showcases a modern mobile wallet interface with
            transaction management, fund transfers, and user-friendly
            navigation.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
