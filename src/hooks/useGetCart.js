import { useGetCartQuery } from "../redux/features/cart/cartApi";

import { useSelector } from "react-redux";

const useGetCart = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: cart,
    isLoading,
    isError,
    isSuccess,
  } = useGetCartQuery(undefined, {
    skip: user?.role !== "user",
  });

  let updatedCartQty = 0;
  if (!isLoading || !isError) {
    if (cart?.data?.products?.length > 0) {
      updatedCartQty = cart.data.products.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    }
  }

  const updateCart = { ...(cart?.data || {}), totalQuantity: updatedCartQty };
  return { cart: updateCart, isLoading, isError, isSuccess };
};
export default useGetCart;
