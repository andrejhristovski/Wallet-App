import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function TransactionDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const transactionId = (params.transactionId as string) || "1";

  const details = useMemo(() => {
    const isIncome = Number(transactionId) % 2 === 0;
    const amount = isIncome ? 80 : 42.5;
    return {
      id: transactionId,
      type: isIncome ? "Income" : "Expense",
      amount,
      currency: "EUR",
      status: "Completed" as const,
      wallet: "EUR",
      payerName: isIncome ? "Admin" : "You",
      transactionNumber: "#" + (23000000 + Number(transactionId)).toString(),
      paymentDate: "03/12/2023 16:32 PM",
      currentBalance: 24.0,
      details: "Expense request",
    };
  }, [transactionId]);

  return (
    <View className="flex-1 bg-[#1F1F22]">
      <View className="h-10 bg-[#1F1F22]" />
      <View className="px-5 pb-4 pt-4 flex-row items-center justify-between">
        <TouchableOpacity
          className="w-9 h-9 rounded-full items-center justify-center bg-[#2A2A2E]"
          onPress={() => router.back()}
        >
          <Icon name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">
          Transaction details
        </Text>
        <View className="w-9 h-9" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5">
          <View className="bg-[#2A2A2E] rounded-2xl px-4 py-5 mb-4">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-white font-semibold">{details.type}</Text>
              <TouchableOpacity className="w-8 h-8 items-center justify-center">
                <Icon name="copy" size={18} color="#BDBDBF" />
              </TouchableOpacity>
            </View>
            <Text
              className={`text-2xl font-extrabold ${
                details.type === "Income" ? "text-[#34C759]" : "text-[#FF3B30]"
              }`}
            >
              {(details.type === "Income" ? "+" : "-") +
                details.amount.toFixed(2)}{" "}
              {details.currency}
            </Text>
          </View>

          <View className="bg-[#2A2A2E] rounded-2xl px-4 py-4">
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Wallet</Text>
              <View className="flex-row items-center">
                <Icon name="globe-outline" size={16} color="#3B82F6" />
                <Text className="text-white font-semibold ml-2">
                  {details.wallet}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Transaction type</Text>
              <Text className="text-white font-semibold">{details.type}</Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Payer name</Text>
              <Text className="text-white font-semibold">
                {details.payerName}
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Status</Text>
              <Text
                className="font-semibold"
                style={{
                  color:
                    details.status === "Completed"
                      ? "#34C759"
                      : details.status === "Declined"
                      ? "#FF3B30"
                      : "#AAAAAA",
                }}
              >
                {details.status}
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Transaction number</Text>
              <Text className="text-white font-semibold">
                {details.transactionNumber}
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Payment date</Text>
              <Text className="text-white font-semibold">
                {details.paymentDate}
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-[#3A3A3C]">
              <Text className="text-[#C9C9CC]">Current balance</Text>
              <Text className="text-white font-semibold">
                {details.currentBalance.toFixed(2)} {details.currency}
              </Text>
            </View>
            <View className="pt-3">
              <Text className="text-[#C9C9CC] mb-2">Details</Text>
              <Text className="text-white font-semibold">
                {details.details}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-5 mt-5">
          <View className="bg-[#2A2A2E] rounded-t-3xl px-5 pt-5 pb-6">
            <TouchableOpacity className="h-12 rounded-2xl items-center justify-center border border-[#BDBDBF]">
              <Text className="text-white font-semibold">Download receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
