import { createSlice } from "@reduxjs/toolkit/react";
import { initialWishlistState as initialState } from "../../initialState";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.wishlist.includes(action.payload)) {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((id) => id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
