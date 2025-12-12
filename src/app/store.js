// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";

// Slices
import authReducer from "../features/auth/authSlice";
import referralsReducer from "../features/referrals/referralsSlice";
import verifiedReducer from "../features/verifiedusers/verifiedUsersSlice";
import productsReducer from "../features/products/productsSlice";

// ---------------------------
// Load state From LocalStorage
// ---------------------------
const loadState = () => {
  try {
    const saved = localStorage.getItem("markwave-state");
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.warn("Failed to load local data:", err);
  }
  return undefined;
};

// ---------------------------
// Save Only Required Slices (omit products)
// ---------------------------
const saveState = (state) => {
  try {
    const persisted = {
      referrals: state.referrals,
      verifiedUsers: state.verifiedUsers,
      // intentionally not persisting products to let server be source-of-truth
    };

    localStorage.setItem("markwave-state", JSON.stringify(persisted));
  } catch (err) {
    console.warn("Failed to save local data:", err);
  }
};

// ---------------------------
// Configure Store
// ---------------------------
export const store = configureStore({
  reducer: {
    auth: authReducer,
    referrals: referralsReducer,
    verifiedUsers: verifiedReducer,
    products: productsReducer,
  },
  preloadedState: loadState(),
});

// Save after every state change
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
