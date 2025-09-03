import React from "react";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1F1F22",
      }}
    >
      <Text style={{ color: "#EDE0D4" }}>Settings</Text>
    </View>
  );
}
