import { useBalance, useTransactions } from "@/hooks/useWalletQueries";
import { useWalletStore } from "@/store/wallet";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const router = useRouter();
  const { selectedCurrency } = useWalletStore();
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Fetch data with React Query
  const { data: balance, isLoading: balanceLoading } =
    useBalance(selectedCurrency);
  const { data: transactionsData, isLoading: transactionsLoading } =
    useTransactions({
      limit: 5,
    });

  const transactions = transactionsData?.transactions || [];

  // Bank details (replace with actual data)
  const bankDetails = {
    accountName: "Native Teams Limited",
    swift: "SCBLDEFX",
    accountNumber: "1234512345",
  };

  const handleCopyToClipboard = async (text: string, field: string) => {
    try {
      await Clipboard.setStringAsync(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 3000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy to clipboard");
    }
  };

  const handleShare = async () => {
    try {
      const shareContent = `Bank Details:
Account Name: ${bankDetails.accountName}
Account Number: ${bankDetails.accountNumber}
SWIFT: ${bankDetails.swift}`;

      await Share.share({
        message: shareContent,
        title: "Bank Details",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share bank details");
    }
  };

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(2)} ${selectedCurrency}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sent":
        return "arrow-up";
      case "received":
        return "arrow-down";
      case "pending":
        return "time";
      default:
        return "card";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sent":
        return "text-red-500";
      case "received":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#222222]">
      <View className="h-12" />

      <View className="px-6 pt-4 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Image
            source={require("@/assets/images/Logo.png")}
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>

        <View className="flex-col items-center justify-between gap-4">
          <View className="flex-row items-center">
            <Text className="text-white text-lg mr-2">
              {selectedCurrency} balance
            </Text>
            <Icon name="information-circle-outline" size={20} color="#ffffff" />
          </View>
          <Text className="text-white text-4xl font-bold mb-6">
            {balanceLoading ? "..." : formatAmount(balance?.amount || 0)}
          </Text>
        </View>

        <View className="flex-row justify-around">
          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/add-funds")}
          >
            <View className="size-12 bg-[#FF2C55] rounded-lg items-center justify-center mb-2">
              <Icon name="add" size={24} color="#ffffff" />
            </View>
            <Text className="text-white text-sm">Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/send-payout")}
          >
            <View className="size-12 bg-[#FF2C55] rounded-lg items-center justify-center mb-2">
              <Icon name="paper-plane" size={24} color="#ffffff" />
            </View>
            <Text className="text-white text-sm">Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => setShowBankDetails(true)}
          >
            <View className="size-12 bg-[#FF2C55] rounded-lg items-center justify-center mb-2">
              <Icon name="business" size={24} color="#ffffff" />
            </View>
            <Text className="text-white text-sm">Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mx-6 mb-6 p-4 bg-gray-800 rounded-lg">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-lg mb-2">
              Get your card and use it anywhere
            </Text>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-lg self-start">
              <Text className="text-gray-900 font-semibold">Order card</Text>
            </TouchableOpacity>
          </View>
          <View className="relative">
            <View className="w-16 h-10 bg-white rounded-lg rotate-12 mr-2">
              <View className="w-3 h-3 bg-red-500 rounded-full absolute top-2 left-2" />
              <View className="w-6 h-4 bg-gray-300 rounded absolute bottom-2 left-2" />
            </View>
            <View className="w-16 h-10 bg-white rounded-lg -rotate-6 absolute top-1 right-0">
              <View className="w-3 h-3 bg-red-500 rounded-full absolute top-2 left-2" />
              <View className="w-6 h-4 bg-gray-300 rounded absolute bottom-2 left-2" />
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">
          Recent Transactions
        </Text>

        {transactionsLoading ? (
          <View className="items-center py-8">
            <Text className="text-gray-400">Loading transactions...</Text>
          </View>
        ) : transactions.length === 0 ? (
          <View className="items-center py-8">
            <Icon name="receipt-outline" size={48} color="#6b7280" />
            <Text className="text-gray-400 text-lg mt-2">
              No transactions yet
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Your transaction history will appear here
            </Text>
          </View>
        ) : (
          <>
            {transactions.slice(0, 5).map((transaction) => (
              <View
                key={transaction.id}
                className="flex-row items-center py-3 border-b border-gray-800"
              >
                <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center mr-3">
                  <Icon
                    name={getTransactionIcon(transaction.type)}
                    size={20}
                    color="#ffffff"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base">
                    Transaction {transaction.id.slice(-2)}...
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {formatDate(transaction.timestamp)}
                  </Text>
                </View>
                <Text
                  className={`text-lg font-bold ${getTransactionColor(
                    transaction.type
                  )}`}
                >
                  {transaction.type === "sent" ? "-" : "+"}
                  {formatAmount(transaction.amount)}
                </Text>
              </View>
            ))}

            <TouchableOpacity
              className="items-center py-4"
              onPress={() => router.push("/transactions")}
            >
              <Text className="text-red-500 text-lg font-semibold">
                See all
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        visible={showBankDetails}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBankDetails(false)}
      >
        <View className="flex-1 bg-opacity-10 justify-end">
          <View className="bg-[#2E2E31] rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">Bank details</Text>
              <TouchableOpacity onPress={() => setShowBankDetails(false)}>
                <Icon name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View className="h-px bg-gray-700 mb-6" />

            <View className="space-y-4 mb-6">
              {Object.entries(bankDetails).map(([key, value]) => (
                <View
                  key={key}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex flex-col gap-4">
                    <Text className="text-gray-400 text-base capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Text>
                    <Text className="text-white text-base mr-3">{value}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => handleCopyToClipboard(value, key)}
                      className="w-8 h-8 items-center justify-center"
                    >
                      {copiedField === key ? (
                        <Icon name="checkmark" size={20} color="#10b981" />
                      ) : (
                        <Icon name="copy-outline" size={20} color="#6b7280" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity
              className="bg-red-500 py-4 rounded-lg items-center"
              onPress={handleShare}
            >
              <Text className="text-white text-lg font-semibold">Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
