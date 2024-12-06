import { createSlice } from "@reduxjs/toolkit/react";

import { initialAuthState as initialState } from "../../initialState";

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.removeItem("auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
