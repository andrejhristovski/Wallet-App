import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

// Types
export type TransactionType = "all" | "sent" | "received" | "pending";
export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface WalletFilters {
  type: TransactionType;
  dateRange: DateRange;
  currency: Currency | "all";
}

interface WalletState {
  selectedCurrency: Currency;
  filters: WalletFilters;
  txCursor: string | null;
  isLoading: boolean;
}

interface WalletActions {
  setSelectedCurrency: (currency: Currency) => void;
  setFilters: (filters: Partial<WalletFilters>) => void;
  setTxCursor: (cursor: string | null) => void;
  loadPersistedData: () => Promise<void>;
}

type WalletStore = WalletState & WalletActions;

// Storage keys
const SELECTED_CURRENCY_KEY = "wallet_selected_currency";
const FILTERS_KEY = "wallet_filters";

// Default values
const defaultFilters: WalletFilters = {
  type: "all",
  dateRange: { start: null, end: null },
  currency: "all",
};

export const useWalletStore = create<WalletStore>((set, get) => ({
  // State
  selectedCurrency: "EUR",
  filters: defaultFilters,
  txCursor: null,
  isLoading: false,

  // Actions
  setSelectedCurrency: async (currency: Currency) => {
    try {
      if (AsyncStorage && AsyncStorage.setItem) {
        await AsyncStorage.setItem(SELECTED_CURRENCY_KEY, currency);
      }
      set({ selectedCurrency: currency });
    } catch (error) {
      console.error("Error saving selected currency:", error);
      // Still set the currency in state even if storage fails
      set({ selectedCurrency: currency });
    }
  },

  setFilters: async (newFilters: Partial<WalletFilters>) => {
    try {
      const currentFilters = get().filters;
      const updatedFilters = { ...currentFilters, ...newFilters };

      // Convert dates to ISO strings for storage
      const filtersForStorage = {
        ...updatedFilters,
        dateRange: {
          start: updatedFilters.dateRange.start?.toISOString() || null,
          end: updatedFilters.dateRange.end?.toISOString() || null,
        },
      };

      if (AsyncStorage && AsyncStorage.setItem) {
        await AsyncStorage.setItem(
          FILTERS_KEY,
          JSON.stringify(filtersForStorage)
        );
      }
      set({ filters: updatedFilters });
    } catch (error) {
      console.error("Error saving filters:", error);
      // Still update filters in state even if storage fails
      const currentFilters = get().filters;
      const updatedFilters = { ...currentFilters, ...newFilters };
      set({ filters: updatedFilters });
    }
  },

  setTxCursor: (cursor: string | null) => {
    set({ txCursor: cursor });
  },

  loadPersistedData: async () => {
    set({ isLoading: true });
    try {
      if (AsyncStorage && AsyncStorage.getItem) {
        // Load selected currency
        const savedCurrency = await AsyncStorage.getItem(SELECTED_CURRENCY_KEY);
        if (savedCurrency) {
          set({ selectedCurrency: savedCurrency as Currency });
        }

        // Load filters
        const savedFilters = await AsyncStorage.getItem(FILTERS_KEY);
        if (savedFilters) {
          try {
            const parsedFilters = JSON.parse(savedFilters);
            // Convert ISO strings back to Date objects
            const filtersWithDates = {
              ...parsedFilters,
              dateRange: {
                start: parsedFilters.dateRange.start
                  ? new Date(parsedFilters.dateRange.start)
                  : null,
                end: parsedFilters.dateRange.end
                  ? new Date(parsedFilters.dateRange.end)
                  : null,
              },
            };
            set({ filters: filtersWithDates });
          } catch (parseError) {
            console.error("Error parsing saved filters:", parseError);
          }
        }
      }
      set({ isLoading: false });
    } catch (error) {
      console.error("Error loading persisted wallet data:", error);
      set({ isLoading: false });
    }
  },
}));
