import { createSlice } from "@reduxjs/toolkit/react";

import { initialProductState as initialState } from "../../initialState";

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      state.deleteProduct = action.payload.deleteProduct;
    },
  },
});

export const { deleteProduct } = productSlice.actions;

export default productSlice.reducer;
