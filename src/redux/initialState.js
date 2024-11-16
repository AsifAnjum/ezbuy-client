export const initialAuthState = {
  accessToken: undefined,
  user: undefined,
  error: undefined,
};

export const initialProductState = {
  deleteProduct: false,
};

export const initialCartState = {
  cart: {},
  cartQtyCount: 0,
};

export const initialMessageState = {
  pending: 0,
};

const loadWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

export const initialWishlistState = {
  wishlist: loadWishlist(),
};
