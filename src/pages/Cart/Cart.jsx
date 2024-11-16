import { Link } from "react-router-dom";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import useGetCart from "../../hooks/useGetCart";
import {
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../../redux/features/cart/cartApi";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import PermissionModal from "../../modal/PermissionModal";

import ItemNotFound from "../../component/ui/error/ItemNotFound";
import PageLoader from "../../component/ui/PageLoader";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(false);

  const inputRef = useRef({});

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setOpenModal(true);
  };

  const { cart, isError: cartError, isLoading: cartLoading } = useGetCart();

  const [
    removeFromCart,
    { isLoading, isError, isSuccess, reset: removeCartReset },
  ] = useRemoveFromCartMutation();

  const [
    editCart,
    {
      isLoading: editCartLoading,
      error: editCartError,
      isSuccess: editCartSuccess,
      reset: editCartReset,
    },
  ] = useUpdateCartMutation();

  const cartProducts = cart.products || [];

  const handleRemoveFromCart = (res) => {
    setOpenModal(false);
    if (res) {
      removeFromCart({ productId: deleteProductId });
    }
  };

  const handleUpdateCart = () => {
    const cartItems = inputRef.current;

    const updatedCart = [];

    Object.entries(cartItems)
      .filter(([, value]) => value?.value) // filter out null values. useRef doesn't re render on change so we need to filter out null values
      .forEach(([key, value], i) => {
        if (
          cartProducts[i]?.productId === key &&
          cartProducts[i].quantity !== parseInt(value.value)
        ) {
          updatedCart.push({
            productId: cartProducts[i].productId,
            quantity: parseInt(value.value),
          });
        }
      });

    if (updatedCart.length > 0) {
      editCart(updatedCart);
    } else {
      toast.warn("No changes made to cart");
    }
  };

  const handleNavigateToCheckout = () => {
    const cartProducts = cart.products.map((product) => {
      return {
        productId: product.productId,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
      };
    });

    const orderData = {
      products: cartProducts,
      totalAmount: cart.totalAmount,
    };
    navigate("/checkout", {
      state: { orderData, redirectFrom: "cart" },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      removeCartReset();
      toast.success("Product removed from cart");
    }

    if (isError) {
      removeCartReset();
      toast.error("Failed to remove product from cart");
    }

    if (editCartSuccess) {
      editCartReset();
      toast.success("Cart updated successfully");
    }

    if (editCartError?.data) {
      editCartReset();
      toast.error(editCartError.data.message, {
        autoClose: 4000,
        position: "top-center",
      });
    }
  }, [
    isSuccess,
    isError,
    editCartSuccess,
    editCartError,
    editCartReset,
    removeCartReset,
  ]);

  const cartContent = cartProducts.map((product) => {
    const subTotal = (product.price * product.quantity).toFixed(2);
    return (
      <div
        key={product.productId}
        className="flex items-center justify-between bg-[#f5f5f5] p-5 shadow-lg rounded-lg font-semibold min-w-[600px]"
      >
        <div className="relative flex items-center gap-2 w-72">
          <div className="indicator">
            <span
              aria-disabled={isLoading}
              onClick={() => handleDelete(product.productId)}
              className="text-white cursor-pointer indicator-item indicator-start badge badge-error"
            >
              x
            </span>
            <img
              src={product.img}
              loading="lazy"
              className="w-32 image-bg-remove"
              alt=""
            />
          </div>
          <p>{product.title}</p>
        </div>
        <p>{product.price}</p>

        <div className="flex items-center gap-2 px-2 py-1 border rounded">
          <input
            type="number"
            ref={(ref) => (inputRef.current[product.productId] = ref)}
            className="w-12 text-center bg-transparent border-none outline-none"
            min={1}
            value={product.quantity}
            readOnly
            // Ensures manual input is turned off
          />

          <span className="flex flex-col">
            <RiArrowUpSLine
              onClick={() => inputRef.current[product.productId].stepUp()}
              className="text-lg cursor-pointer"
            />
            <RiArrowDownSLine
              onClick={() => inputRef.current[product.productId].stepDown()}
              className="text-lg cursor-pointer"
            />
          </span>
        </div>

        {/* sub total */}
        <p className="pr-7">{subTotal}</p>
      </div>
    );
  });

  let content;
  if (cartLoading) {
    content = <PageLoader />;
  } else if (cartError) {
    content = <ItemNotFound message="Oops! Something went wrong" />;
  } else if (Object.keys(cart).length == 0 || cartProducts.length == 0) {
    content = <ItemNotFound message="Oops! Your shopping cart is empty" />;
  } else if (Object.keys(cart).length > 0 && cartProducts.length > 0) {
    content = (
      <>
        <div className="mt-20 space-y-10 overflow-auto ">
          <div className="flex items-center justify-between bg-[#f5f5f5] p-5 shadow-lg rounded-lg font-semibold min-w-[600px]">
            <p className="w-72">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartContent}
        </div>

        <div className="flex justify-between my-6 max-[550px]:flex-col-reverse max-md:items-center max-md:gap-6">
          <Link
            to="/shop"
            className="w-[218px] h-[56px] border flex items-center justify-center font-semibold border-black hover:text-slate-400 duration-500 transition-colors"
          >
            Return To Shop
          </Link>
          <button
            onClick={handleUpdateCart}
            disabled={editCartLoading}
            className="w-[218px] h-[56px] border flex items-center justify-center font-semibold border-black hover:text-slate-400 duration-500 transition-colors disabled:opacity-50 disabled:pointer-events-none "
          >
            <span className={`${editCartLoading ? "animate-fadeInLeft" : ""}`}>
              {editCartLoading ? "Updating..." : "Update Cart"}
            </span>
          </button>
        </div>

        <div className="w-1/2 p-5 mb-10 ml-auto space-y-6 font-semibold border border-black max-sm:w-full">
          <p className="text-3xl">Cart total</p>
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>{cart.totalAmount}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <hr className="border-zinc-500" />
          <div className="flex justify-between">
            <p>total:</p>
            <p>{cart.totalAmount}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNavigateToCheckout}
              className="tracking-wider text-white btn btn-error"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="mt-20 ">
      <div className="text-sm breadcrumbs">
        <ul className="text-slate-500">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li className="font-bold tracking-wider text-black">Cart</li>
        </ul>
      </div>

      {/* cart item */}
      {content}
      {openModal && <PermissionModal confirm={handleRemoveFromCart} />}
    </div>
  );
};
export default Cart;
