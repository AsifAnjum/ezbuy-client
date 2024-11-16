import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice.js";
import authReducer from "../features/auth/authSlice.js";
import productReducer from "../features/product/productSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import messageReducer from "../features/message/messageSlice.js";
import wishlistReducer from "../features/wishlist/wishlist.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    message: messageReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
  devTools: import.meta.env.PROD ? false : true,
});
