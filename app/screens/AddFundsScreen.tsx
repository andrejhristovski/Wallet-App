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

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
  last4?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    name: "Credit Card",
    icon: "card",
    color: "#3B82F6",
    last4: "4242",
  },
  {
    id: "2",
    name: "Bank Account",
    icon: "business",
    color: "#34C759",
    last4: "1234",
  },
  { id: "3", name: "PayPal", icon: "logo-paypal", color: "#FF9F0A" },
];

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("1");

  const handleAddFunds = () => {
    if (!amount) {
      Alert.alert("Error", "Please enter an amount");
      return;
    }
    const method = paymentMethods.find((m) => m.id === selectedMethod);
    Alert.alert("Confirm Payment", `Add $${amount} using ${method?.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Add Funds",
        onPress: () => {
          Alert.alert("Success", "Funds added successfully!");
          router.back();
        },
      },
    ]);
  };

  const quickAmounts = ["10", "25", "50", "100", "250", "500"];

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
        <Text className="text-white text-2xl font-bold">Add funds</Text>
        <View className="w-9 h-9" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5">
          {/* Amount Card */}
          <View className="bg-[#2A2A2E] rounded-2xl px-4 py-4 mb-4">
            <Text className="text-[#C9C9CC] mb-2">Amount to add</Text>
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

          {/* Quick amounts */}
          <View className="mb-4">
            <Text className="text-white text-base font-bold mb-3">
              Quick amounts
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {quickAmounts.map((q) => (
                <TouchableOpacity
                  key={q}
                  className="w-[30%] items-center py-3 mb-2 rounded-xl bg-[#2A2A2E]"
                  onPress={() => setAmount(q)}
                >
                  <Text className="text-[#EDEDED] font-semibold">${q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment methods */}
          <View className="mb-4">
            <Text className="text-white text-base font-bold mb-3">
              Payment method
            </Text>
            {paymentMethods.map((m) => {
              const selected = selectedMethod === m.id;
              return (
                <TouchableOpacity
                  key={m.id}
                  className={`flex-row items-center justify-between px-4 py-4 rounded-xl mb-2 bg-[#2A2A2E] ${
                    selected
                      ? "border-2 border-[#3B82F6]"
                      : "border border-transparent"
                  }`}
                  onPress={() => setSelectedMethod(m.id)}
                >
                  <View className="flex-row items-center flex-1">
                    <Icon name={m.icon} size={22} color={m.color} />
                    <View className="ml-3">
                      <Text className="text-[#EDEDED] font-semibold">
                        {m.name}
                      </Text>
                      {!!m.last4 && (
                        <Text className="text-[#9A9A9E] text-xs mt-0.5">
                          •••• {m.last4}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center ${
                      selected ? "bg-[#3B82F6]" : "border-2 border-[#8e8e93]"
                    }`}
                  >
                    {selected && (
                      <Icon name="checkmark" size={14} color="#ffffff" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Fees */}
          <View className="bg-[#2A2A2E] rounded-2xl px-4 py-4 mb-4">
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-[#C9C9CC]">Processing fee</Text>
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
              !amount ? "bg-[#8e8e93]" : "bg-[#34C759]"
            }`}
            onPress={handleAddFunds}
            disabled={!amount}
          >
            <Icon name="add-circle" size={20} color="#ffffff" />
            <Text className="text-white text-lg font-bold ml-2">Add funds</Text>
          </TouchableOpacity>

          {/* Info */}
          <View className="flex-row items-start px-4 py-3 rounded-xl bg-[#2A2A2E]">
            <Icon name="information-circle" size={16} color="#8e8e93" />
            <Text className="flex-1 text-xs text-[#C9C9CC] ml-2 leading-5">
              Funds will be added to your wallet balance immediately after
              successful payment.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
