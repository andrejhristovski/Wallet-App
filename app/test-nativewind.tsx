import React from "react";
import { Text, View } from "react-native";

export default function TestNativeWind() {
  return (
    <View className="flex-1 bg-red-500 items-center justify-center">
      <Text className="text-white text-2xl font-bold">NativeWind Test</Text>
      <Text className="text-white text-lg mt-4">
        If you see this with red background, NativeWind is working!
      </Text>
    </View>
  );
}
