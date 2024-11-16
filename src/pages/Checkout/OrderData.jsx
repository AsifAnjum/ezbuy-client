import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  usePaymentIntentMutation,
  usePlaceOrderMutation,
} from "../../redux/features/order/orderApi";
import { useLazyGetCouponQuery } from "../../redux/features/coupon/couponApi";
import { toast } from "react-toastify";
import {} from "react";

const OrderData = ({ billingDetails, userEmail, orderData, redirectFrom }) => {
  const navigate = useNavigate();

  const [
    paymentIntent,
    {
      data: paymentIntentData,
      isLoading: paymentIntentLoading,
      isError: paymentIntentIsError,
      isSuccess: paymentIntentIsSuccess,
    },
  ] = usePaymentIntentMutation();

  const [
    placeOrder,
    {
      isLoading: placeOrderLoading,
      isError: placeOrderError,
      isSuccess: placeOrderSuccess,
    },
  ] = usePlaceOrderMutation();

  const couponRef = useRef("");

  const [shippingAddress, setShippingAddress] = useState({});

  const [isValidCoupon, setIsValidCoupon] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("online");

  const [trigger, { data, isError, isLoading, isFetching, error }] =
    useLazyGetCouponQuery();

  const handleCoupon = () => {
    const couponCode = couponRef.current.value;
    if (couponCode && /^\S+$/.test(couponCode) && couponCode.length <= 40) {
      trigger(couponCode)
        .unwrap()
        .then(() => {
          setIsValidCoupon(true);
          couponRef.current.value = "";
        })
        .catch(() => {
          setIsValidCoupon(false);
        });
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  useEffect(() => {
    if (paymentIntentIsSuccess) {
      navigate("/payment", {
        state: {
          clientSecret: paymentIntentData.data.client_secret,
          amount: paymentIntentData.data.amount,
          products: orderData.products,
          shippingAddress,
          couponCode: isValidCoupon && data?.data?.code,
          couponDiscount: isValidCoupon && data?.data?.discount,
          redirectFrom,
        },
      });
    }

    if (paymentIntentIsError) {
      toast.error("Something went wrong. Please try again later");
    }

    if (placeOrderSuccess) {
      toast.success("Order Placed Successfully");
      navigate("/dashboard/my-order", { replace: true, state: {} });
    }

    if (placeOrderError) {
      toast.error("Error placing order. Please try again");
    }
  }, [
    navigate,
    orderData,
    paymentIntentData,
    paymentIntentIsSuccess,
    paymentIntentIsError,
    shippingAddress,
    isValidCoupon,
    data,
    redirectFrom,
    placeOrderSuccess,
    placeOrderError,
  ]);

  if (!orderData) return null;

  let totalAmount = orderData.totalAmount;

  const discount = data?.data?.discount || 0;

  const couponDiscount = isValidCoupon
    ? (totalAmount * (discount / 100)).toFixed(2)
    : "N/A";

  if (isValidCoupon) {
    totalAmount -= couponDiscount;
  }
  if (paymentMethod !== "online") {
    totalAmount += 20;
  }

  totalAmount = totalAmount.toFixed(2);

  const handlePlaceOrder = () => {
    const { name, phone, city, streetAddress } = billingDetails;
    const shippingAddress = {};
    if (phone.value && city.value && streetAddress.value && name.value) {
      shippingAddress.name = name.value;
      shippingAddress.email = userEmail;
      shippingAddress.phone = phone.value;
      shippingAddress.city = city.value;
      shippingAddress.streetAddress = streetAddress.value;

      // eslint-disable-next-line no-unused-vars
      const { email, ...withoutEmail } = shippingAddress;

      setShippingAddress(withoutEmail);

      if (paymentMethod === "online") {
        paymentIntent({
          totalAmount,
          products: orderData.products,
          couponCode: isValidCoupon ? data?.data?.code : "N/A",
          couponDiscount: isValidCoupon ? data?.data?.discount + "%" : "N/A",
          shippingAddress,
        });
      } else {
        const paymentDetails = {
          method: "cod",
          transactionId: "",
          status: "pending",
        };

        const orderInfo = {
          paymentDetails,
          totalAmount,
          products: orderData.products,
          shippingAddress,
          couponCode: isValidCoupon ? data?.data?.code : "",
          couponDiscount: isValidCoupon ? data?.data?.discount : 0,
          shippingCharges: 20,
          redirect: redirectFrom,
        };

        placeOrder(orderInfo);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <div className="mt-20 md:w-1/2 ">
      <div className="flex flex-col justify-between gap-4">
        {orderData.products.map((product) => {
          const { productId, title, price, quantity } = product;
          const subTotal = (price * quantity).toFixed(2);
          return (
            <div
              key={productId}
              className="flex items-center justify-between py-1 font-semibold"
            >
              <div className="flex items-center gap-2">
                <p className="w-40 min-[450px]:w-72">{title}</p>
                <p className="text-slate-500">(x {quantity})</p>
              </div>

              {/* sub total */}
              <p className="">{subTotal}</p>
            </div>
          );
        })}
        <div className="flex items-center justify-between py-1 font-semibold">
          <p>Subtotal:</p>
          <p>{orderData.totalAmount.toFixed(2)}</p>
        </div>
        <div className="border-b-[1px] border-b-slate-400 space-y-4" />

        <div className="flex items-center justify-between font-semibold">
          <p>Shipping:</p>
          <p>{paymentMethod === "online" ? "Free" : 20}</p>
        </div>

        <div className="flex items-center justify-between font-semibold">
          <p>Coupon Discount:</p>
          <p>{couponDiscount}</p>
        </div>

        <div className="flex items-center justify-between font-semibold">
          <p>Total:</p>
          <p>{totalAmount}</p>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            className="radio-xs radio"
            name="paymentMethod"
            value="online"
            checked={paymentMethod === "online"}
            onChange={handlePaymentMethodChange}
          />
          Online Payment
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            className="radio radio-xs"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={handlePaymentMethodChange}
          />
          Cash On Delivery
        </label>

        <div>
          <input
            type="text"
            ref={couponRef}
            className="mr-2 rounded-sm input input-bordered focus:outline-none focus:ring-1 focus:ring-neutral"
            placeholder="Coupon Code"
          />
          <button
            onClick={handleCoupon}
            className={`${
              isLoading || isFetching ? "animate-pulse pointer-events-none" : ""
            } tracking-wider text-white btn btn-error`}
          >
            {isLoading || isFetching ? "Checking..." : "Apply Coupon"}
          </button>
          {isValidCoupon && (
            <p className="text-sm">
              <span className="italic font-semibold text-neutral">
                {data?.data?.code || ""}
              </span>{" "}
              is Applied
            </p>
          )}
          {isError && (
            <p className="text-sm text-red-500">
              {error?.data?.message || "Unknown Error Occurred"} !!!
            </p>
          )}
        </div>

        <button
          disabled={paymentIntentLoading || placeOrderLoading}
          onClick={handlePlaceOrder}
          className="tracking-wider text-white btn btn-error"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
export default OrderData;
