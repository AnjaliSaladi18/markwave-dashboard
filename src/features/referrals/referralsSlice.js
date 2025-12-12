import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  nextId: 1,
};

const referralsSlice = createSlice({
  name: "referrals",
  initialState,
  reducers: {
    addReferral(state, action) {
      state.items.push({ id: state.nextId++, ...action.payload });
    },
    updateReferral(state, action) {
      const { id, changes } = action.payload;
      state.items = state.items.map((r) =>
        r.id === id ? { ...r, ...changes } : r
      );
    },
    removeReferral(state, action) {
      state.items = state.items.filter((r) => r.id !== action.payload);
    }
  },
});

export const { addReferral, updateReferral, removeReferral } =
  referralsSlice.actions;

export default referralsSlice.reducer;
