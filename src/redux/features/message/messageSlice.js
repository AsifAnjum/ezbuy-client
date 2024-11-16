import { createSlice } from "@reduxjs/toolkit/react";

import { initialMessageState as initialState } from "../../initialState";

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    pendingSupport: (state, action) => {
      state.pending = action.payload;
    },
  },
});

export const { pendingSupport } = messageSlice.actions;

export default messageSlice.reducer;
