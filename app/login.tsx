import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store/auth";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { setToken } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }
    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 700));
      await setToken("demo-token");
    } catch (e) {
      Alert.alert("Sign-in failed", "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView className="flex-1 items-center justify-center p-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="w-full max-w-[420px]"
      >
        <ThemedText type="title" className="text-center mb-6">
          Welcome back
        </ThemedText>
        <View className="gap-3">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#9E9FA6"
            className="bg-[#2A2B2F] text-[#EDE0D4] px-4 py-3 rounded-xl border border-[#3A3B3F]"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#9E9FA6"
            className="bg-[#2A2B2F] text-[#EDE0D4] px-4 py-3 rounded-xl border border-[#3A3B3F]"
          />
          <TouchableOpacity
            onPress={onSubmit}
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-500" : "bg-indigo-600"
            } py-3 rounded-xl items-center mt-2`}
          >
            <ThemedText className="text-white font-semibold">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
