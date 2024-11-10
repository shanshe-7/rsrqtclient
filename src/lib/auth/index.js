// src/lib/auth.js
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { writable, get } from "svelte/store";

// Create the stores with initial values
const createAuthStore = () => {
  const { subscribe, set, update } = writable({
    user: null,
    isAuthenticated: false,
  });

  if (browser) {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      set({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
      });
    }
  }

  return {
    subscribe,
    login: (data) => {
      const { token, user } = data || {};

      set({
        user,
        isAuthenticated: true,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      goto("/");
    },
  };
};

export const authStore = createAuthStore();

// Helper function to get current auth state
export const getAuthState = () => get(authStore);
