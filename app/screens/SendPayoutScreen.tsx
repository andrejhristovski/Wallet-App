import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SendPayoutScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");

  const handleSendMoney = () => {
    if (!amount || !recipient) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert("Confirm Payment", `Send $${amount} to ${recipient}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Send",
        onPress: () => {
          Alert.alert("Success", "Payment sent successfully!");
          router.back();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-[#1F1F22]">
      <View className="h-10 bg-[#1F1F22]" />
      <View className="pt-4 px-5 pb-4 flex-row items-center justify-between">
        <TouchableOpacity
          className="w-9 h-9 rounded-full items-center justify-center bg-[#2A2A2E]"
          onPress={() => router.back()}
        >
          <Icon name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Send money</Text>
        <View className="w-9 h-9" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5">
          {/* Amount Card */}
          <View className="bg-[#2A2A2E] rounded-2xl px-4 py-4 mb-4">
            <Text className="text-[#C9C9CC] mb-2">Amount</Text>
            <View className="flex-row items-center">
              <Text className="text-3xl font-extrabold text-white mr-2">$</Text>
              <TextInput
                className="flex-1 text-3xl font-extrabold text-white"
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#8e8e93"
                keyboardType="numeric"
                autoFocus
              />
            </View>
          </View>

          {/* Recipient and Note */}
          <View className="mb-4">
            <View className="mb-4">
              <Text className="text-white text-base font-bold mb-2">
                Recipient
              </Text>
              <TextInput
                className="bg-[#2A2A2E] rounded-xl px-4 py-3 text-white"
                value={recipient}
                onChangeText={setRecipient}
                placeholder="Enter email or phone number"
                placeholderTextColor="#8e8e93"
              />
            </View>
            <View>
              <Text className="text-white text-base font-bold mb-2">
                Note (optional)
              </Text>
              <TextInput
                className="bg-[#2A2A2E] rounded-xl px-4 py-3 text-white min-h-[80px]"
                value={note}
                onChangeText={setNote}
                placeholder="Add a note"
                placeholderTextColor="#8e8e93"
                multiline
              />
            </View>
          </View>

          {/* Quick recipients */}
          <View className="mb-4">
            <Text className="text-white text-base font-bold mb-3">
              Quick recipients
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity className="items-center mr-4 px-4 py-3 rounded-xl bg-[#2A2A2E] min-w-[96px]">
                <Icon name="person" size={22} color="#3B82F6" />
                <Text className="text-[#EDEDED] text-xs mt-1">John Doe</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center mr-4 px-4 py-3 rounded-xl bg-[#2A2A2E] min-w-[96px]">
                <Icon name="person" size={22} color="#34C759" />
                <Text className="text-[#EDEDED] text-xs mt-1">Jane Smith</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center mr-4 px-4 py-3 rounded-xl bg-[#2A2A2E] min-w-[96px]">
                <Icon name="person" size={22} color="#FF9F0A" />
                <Text className="text-[#EDEDED] text-xs mt-1">
                  Mike Johnson
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Fees */}
          <View className="bg-[#2A2A2E] rounded-2xl px-4 py-4 mb-4">
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-[#C9C9CC]">Transfer fee</Text>
              <Text className="text-[#C9C9CC]">$0.00</Text>
            </View>
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-[#C9C9CC]">Total</Text>
              <Text className="text-white font-bold">${amount || "0.00"}</Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            className={`flex-row items-center justify-center rounded-xl px-4 py-4 mb-4 ${
              !amount || !recipient ? "bg-[#8e8e93]" : "bg-[#0A84FF]"
            }`}
            onPress={handleSendMoney}
            disabled={!amount || !recipient}
          >
            <Icon name="send" size={20} color="#ffffff" />
            <Text className="text-white text-lg font-bold ml-2">
              Send money
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
