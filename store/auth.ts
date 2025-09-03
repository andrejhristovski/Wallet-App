import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoading: boolean;
}

interface AuthActions {
  setToken: (token: string) => void;
  clearToken: () => void;
  loadToken: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const TOKEN_KEY = "auth_token";

export const useAuthStore = create<AuthStore>((set, get) => ({
  // State
  token: null,
  isLoading: false,

  // Actions
  setToken: async (token: string) => {
    try {
      if (SecureStore && SecureStore.setItemAsync) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
      set({ token });
    } catch (error) {
      console.error("Error saving token to secure store:", error);
      // Still set the token in state even if storage fails
      set({ token });
    }
  },

  clearToken: async () => {
    try {
      if (SecureStore && SecureStore.deleteItemAsync) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
      set({ token: null });
    } catch (error) {
      console.error("Error clearing token from secure store:", error);
      // Still clear the token in state even if storage fails
      set({ token: null });
    }
  },

  loadToken: async () => {
    set({ isLoading: true });
    try {
      if (SecureStore && SecureStore.getItemAsync) {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        set({ token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Error loading token from secure store:", error);
      set({ token: null, isLoading: false });
    }
  },
}));
