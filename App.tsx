import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import "./global.css";

// Create a persister for AsyncStorage
const persister = createSyncStoragePersister({
  storage: {
    getItem: async (key: string) => {
      try {
        return await AsyncStorage.getItem(key);
      } catch (error) {
        console.error("Error getting item from AsyncStorage:", error);
        return null;
      }
    },
    setItem: async (key: string, value: string) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error("Error setting item in AsyncStorage:", error);
      }
    },
    removeItem: async (key: string) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing item from AsyncStorage:", error);
      }
    },
  },
});

// Create QueryClient with persistence configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache balances and transactions for 5 minutes
      gcTime: 5 * 60 * 1000,
      // Refetch on window focus
      refetchOnWindowFocus: true,
      // Retry failed requests
      retry: 2,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
});

// Configure persistence
const persistOptions = {
  persister,
  // Only persist specific queries (balances and transactions)
  queryClient,
  // Persist for 24 hours
  maxAge: 24 * 60 * 60 * 1000,
  // Only persist queries that match these patterns
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      const queryKey = query.queryKey;
      // Persist balance queries
      if (Array.isArray(queryKey) && queryKey[0] === "balance") {
        return true;
      }
      // Persist transaction queries (limit to 50)
      if (Array.isArray(queryKey) && queryKey[0] === "transactions") {
        // Only persist if it's a list query (not individual transaction details)
        if (
          queryKey.length === 1 ||
          (queryKey.length === 2 && typeof queryKey[1] === "object")
        ) {
          return true;
        }
      }
      return false;
    },
  },
};

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      <ExpoRoot context={require.context("./app")} />
    </PersistQueryClientProvider>
  );
}

// Register the app component
registerRootComponent(App);

export default App;
