import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types
export interface Balance {
  currency: string;
  amount: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: "sent" | "received" | "pending";
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

export interface TransactionFilters {
  type?: "sent" | "received" | "pending";
  currency?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  cursor?: string;
}

// Mock API functions (replace with actual API calls)
const fetchBalance = async (currency: string): Promise<Balance> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    currency,
    amount: Math.random() * 10000,
    lastUpdated: new Date().toISOString(),
  };
};

const fetchTransactions = async (
  filters: TransactionFilters = {}
): Promise<{
  transactions: Transaction[];
  nextCursor?: string;
}> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockTransactions: Transaction[] = Array.from(
    { length: 20 },
    (_, i) => ({
      id: `tx-${i}`,
      type: ["sent", "received", "pending"][
        Math.floor(Math.random() * 3)
      ] as Transaction["type"],
      amount: Math.random() * 1000,
      currency: "USD",
      description: `Transaction ${i + 1}`,
      timestamp: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: ["completed", "pending", "failed"][
        Math.floor(Math.random() * 3)
      ] as Transaction["status"],
    })
  );

  return {
    transactions: mockTransactions,
    nextCursor:
      mockTransactions.length === 20 ? `cursor-${Date.now()}` : undefined,
  };
};

// React Query hooks
export const useBalance = (currency: string) => {
  return useQuery({
    queryKey: ["balance", currency],
    queryFn: () => fetchBalance(currency),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTransactions = (filters: TransactionFilters = {}) => {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTransaction = (transactionId: string) => {
  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      // Simulate fetching individual transaction
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id: transactionId,
        type: "sent" as const,
        amount: 100,
        currency: "USD",
        description: "Transaction details",
        timestamp: new Date().toISOString(),
        status: "completed" as const,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Mutation hooks
export const useSendTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      amount: number;
      currency: string;
      recipient: string;
    }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { success: true, transactionId: `tx-${Date.now()}` };
    },
    onSuccess: () => {
      // Invalidate and refetch balance and transactions
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useRefreshBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (currency: string) => {
      return fetchBalance(currency);
    },
    onSuccess: (data, currency) => {
      // Update the balance cache directly
      queryClient.setQueryData(["balance", currency], data);
    },
  });
};
