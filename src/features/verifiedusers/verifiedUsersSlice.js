import { createSlice } from "@reduxjs/toolkit";

const verifiedSlice = createSlice({
  name: "verifiedUsers",
  initialState: {
    users: [],
  },
  reducers: {
    addVerifiedUser(state, action) {
      state.users.push(action.payload);
    },
  },
});

export const { addVerifiedUser } = verifiedSlice.actions;
export default verifiedSlice.reducer;
