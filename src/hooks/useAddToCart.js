import { useEffect } from "react";
import { useAddCartMutation } from "../redux/features/cart/cartApi";
import { toast } from "react-toastify";
import useGetCart from "./useGetCart";

const useAddToCart = () => {
  const [
    addCart,
    { isLoading: cartLoading, error: cartError, isSuccess: cartSuccess, reset },
  ] = useAddCartMutation();

  const { cart } = useGetCart();

  const cartProducts = cart.products || [];

  const handleAddToCart = (productId) => {
    const isExist = cartProducts.find((item) => item.productId === productId);
    if (isExist) {
      toast.error("Product already in cart");
      return;
    }
    addCart({ productId });
  };

  useEffect(() => {
    if (cartSuccess) {
      toast.success("Product added to cart");
    }

    if (cartError) {
      if (cartError.status === 401) {
        toast.error("Please login to add to cart");
      } else if (cartError.status === 403) {
        toast.error("You are not authorized to add to cart");
      } else {
        toast.error(cartError.data.message);
      }
    }

    return () => {
      reset();
    };
  }, [cartSuccess, cartError, reset]);

  return { handleAddToCart, cartLoading };
};
export default useAddToCart;
