import { useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Modal,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: "expense" | "income";
  status: "Completed" | "Declined" | "Pending";
}

interface SectionData {
  title: string;
  data: Transaction[];
}

export default function TransactionsScreen() {
  const router = useRouter();

  const PAGE_SIZE = 20;
  const MAX_ITEMS = 200;

  const merchants = useMemo(
    () => [
      { title: "Coffee Shop", type: "expense" as const },
      { title: "Grocery Store", type: "expense" as const },
      { title: "Gas Station", type: "expense" as const },
      { title: "Ride Service", type: "expense" as const },
      { title: "Restaurant", type: "expense" as const },
      { title: "Online Store", type: "expense" as const },
      { title: "Streaming Service", type: "expense" as const },
      { title: "Gym Membership", type: "expense" as const },
      { title: "Utilities", type: "expense" as const },
      { title: "Pharmacy", type: "expense" as const },
      { title: "Book Store", type: "expense" as const },
      { title: "Pet Store", type: "expense" as const },
      { title: "Taxi", type: "expense" as const },
      { title: "Parking", type: "expense" as const },
      { title: "Hardware Store", type: "expense" as const },
      { title: "Travel", type: "expense" as const },
      { title: "Hotel", type: "expense" as const },
      { title: "Cafe", type: "expense" as const },
      { title: "Bakery", type: "expense" as const },
      { title: "Electronics", type: "expense" as const },
      { title: "Salary Deposit", type: "income" as const },
      { title: "Freelance Payment", type: "income" as const },
      { title: "Refund", type: "income" as const },
      { title: "Cashback", type: "income" as const },
    ],
    []
  );

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const nextIdRef = useRef<number>(1);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const formatAmountEUR = (value: number, type: "expense" | "income") => {
    const prefix = type === "income" ? "+" : "-";
    return `${prefix}${value.toFixed(2)} EUR`;
  };

  const formatDateDMY = (date: Date) => {
    const dd = `${date.getDate()}`.padStart(2, "0");
    const mm = `${date.getMonth() + 1}`.padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const monthLabel = (date: Date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const randomStatus = (): Transaction["status"] => {
    const r = Math.random();
    if (r < 0.7) return "Completed";
    if (r < 0.85) return "Pending";
    return "Declined";
  };

  const generateMockBatch = useCallback(
    (count: number): Transaction[] => {
      const items: Transaction[] = [];
      for (let i = 0; i < count; i++) {
        const merchant =
          merchants[Math.floor(Math.random() * merchants.length)];
        const amountBase =
          merchant.type === "income"
            ? 50 + Math.random() * 3000
            : 1 + Math.random() * 300;
        const daysBack = Math.floor(Math.random() * 365);
        const date = new Date();
        date.setDate(date.getDate() - daysBack);
        const id = (nextIdRef.current++).toString();
        items.push({
          id,
          title: merchant.title,
          amount: amountBase,
          date,
          type: merchant.type,
          status: randomStatus(),
        });
      }
      return items;
    },
    [merchants]
  );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setTransactions((prev) => {
      const remaining = Math.max(0, MAX_ITEMS - prev.length);
      const take = Math.min(PAGE_SIZE, remaining);
      const batch = generateMockBatch(take);
      const next = prev.concat(batch);
      return next;
    });
    setIsLoading(false);
    setHasMore(() => true);
  }, [generateMockBatch, hasMore, isLoading]);

  useEffect(() => {
    if (transactions.length === 0) {
      loadMore();
    }
  }, []);

  useEffect(() => {
    if (transactions.length >= MAX_ITEMS) {
      setHasMore(false);
    }
  }, [transactions.length]);

  const sections: SectionData[] = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    for (const t of transactions) {
      const key = monthLabel(t.date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    }
    const entries = Object.entries(groups)
      .map(([title, data]) => ({
        title,
        data: data.sort((a, b) => b.date.getTime() - a.date.getTime()),
      }))
      .sort((a, b) => {
        const ay = parseInt(a.title.split(" ")[1], 10);
        const by = parseInt(b.title.split(" ")[1], 10);
        const am = a.title.split(" ")[0];
        const bm = b.title.split(" ")[0];
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return by - ay || months.indexOf(bm) - months.indexOf(am);
      });
    return entries;
  }, [transactions]);

  const StatusPill = ({ status }: { status: Transaction["status"] }) => {
    const color =
      status === "Completed"
        ? "#34C759"
        : status === "Declined"
        ? "#FF3B30"
        : "#AAAAAA";
    return (
      <Text className="mt-1.5 text-xs font-semibold" style={{ color }}>
        {status}
      </Text>
    );
  };

  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: Transaction;
    index: number;
    section: SectionData;
  }) => {
    const isLast = index === section.data.length - 1;
    const rounded = `${isLast ? " rounded-b-2xl mb-3 border-b-0" : ""}`;
    return (
      <TouchableOpacity
        onPress={() =>
          router.push(`/transaction-details?transactionId=${item.id}`)
        }
        activeOpacity={0.7}
        className={`flex-row items-center justify-between px-4 py-3 bg-[#2A2A2E] border-b border-[#3A3A3C]${rounded}`}
      >
        <View className="flex-1 pr-3">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-[#EDEDED] text-base font-semibold"
          >
            {item.title}
          </Text>
          <Text className="text-[#9A9A9E] text-xs mt-1.5">
            {formatDateDMY(item.date)}
          </Text>
        </View>
        <View className="w-[140px] items-end">
          <Text
            className={`text-base font-extrabold ${
              item.type === "income" ? "text-[#34C759]" : "text-[#FF3B30]"
            } ${item.status === "Declined" ? "line-through" : ""}`}
          >
            {formatAmountEUR(item.amount, item.type)}
          </Text>
          <StatusPill status={item.status} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View className="px-4 py-3 mt-3 bg-[#2A2A2E] rounded-t-2xl">
      <Text className="text-[#D0D0D0] font-semibold">{section.title}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return <View className="h-4" />;
    return (
      <View className="flex-row items-center justify-center py-4">
        <ActivityIndicator size="small" color="#B3B3B3" />
        <Text className="ml-2 text-[#B3B3B3]">Loading more...</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#1F1F22]">
      <View className="h-10 bg-[#1F1F22]" />
      <View className="pt-4 px-5 pb-4 bg-[#1F1F22] flex-row items-center justify-between">
        <TouchableOpacity
          className="w-9 h-9 rounded-full items-center justify-center bg-[#2A2A2E]"
          onPress={() => router.back()}
        >
          <Icon name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Transactions</Text>
        <TouchableOpacity
          className="w-9 h-9 rounded-full items-center justify-center bg-[#2A2A2E]"
          onPress={() => setFilterOpen(true)}
        >
          <Icon name="funnel" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        onEndReachedThreshold={0.4}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
        className="px-5 pb-5"
      />

      <Modal
        visible={filterOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setFilterOpen(false)}
      >
        <View className="flex-1 bg-[#1F1F22]">
          <View className="h-10 bg-[#1F1F22]" />
          <View className="pt-4 px-5 pb-4 bg-[#1F1F22] flex-row items-center justify-between">
            <TouchableOpacity
              className="w-9 h-9 rounded-full items-center justify-center bg-[#2A2A2E]"
              onPress={() => setFilterOpen(false)}
            >
              <Icon name="close" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Filters</Text>
            <View className="w-9 h-9" />
          </View>
          <View className="px-5 pt-3">
            <Text className="text-[#D0D0D0] font-bold mb-2">Status</Text>
            <View className="flex-row flex-wrap gap-2">
              <View className="bg-[#2A2A2E] py-2 px-3 rounded-xl">
                <Text className="text-[#EDEDED] font-semibold">Completed</Text>
              </View>
              <View className="bg-[#2A2A2E] py-2 px-3 rounded-xl">
                <Text className="text-[#EDEDED] font-semibold">Pending</Text>
              </View>
              <View className="bg-[#2A2A2E] py-2 px-3 rounded-xl">
                <Text className="text-[#EDEDED] font-semibold">Declined</Text>
              </View>
            </View>

            <Text className="text-[#D0D0D0] font-bold mt-6 mb-2">Type</Text>
            <View className="flex-row flex-wrap gap-2">
              <View className="bg-[#2A2A2E] py-2 px-3 rounded-xl">
                <Text className="text-[#EDEDED] font-semibold">Income</Text>
              </View>
              <View className="bg-[#2A2A2E] py-2 px-3 rounded-xl">
                <Text className="text-[#EDEDED] font-semibold">Expense</Text>
              </View>
            </View>

            <View className="h-6" />
            <TouchableOpacity
              className="bg-[#0A84FF] py-3.5 rounded-xl items-center"
              onPress={() => setFilterOpen(false)}
            >
              <Text className="text-white font-bold">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
