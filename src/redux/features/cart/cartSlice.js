import { createSlice } from "@reduxjs/toolkit/react";

import { initialCartState as initialState } from "../../initialState";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      const cart = action.payload.cart;
      let updateCartQuantity = 0;
      if (Object.keys(cart).length > 0) {
        updateCartQuantity = cart?.products.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
      }
      state.cart = { ...cart, totalQuantity: updateCartQuantity };
    },
  },
});

export const { getCart } = cartSlice.actions;

export default cartSlice.reducer;
