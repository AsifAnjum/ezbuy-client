import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { usePlaceOrderMutation } from "../../redux/features/order/orderApi";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../modal/SuccessModal";
import { toast } from "react-toastify";

const CheckoutForm = ({
  totalAmount,
  products,
  shippingAddress,
  couponCode,
  couponDiscount,
  redirect,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  const navigate = useNavigate();

  const [placeOrder, { isLoading, isError, isSuccess }] =
    usePlaceOrderMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const paymentDetails = {
        method: "online",
        transactionId: paymentIntent.id,
        status: "success",
      };

      const orderData = {
        paymentDetails,
        totalAmount: (paymentIntent.amount / 100).toFixed(2),
        products,
        shippingAddress,
        couponCode,
        couponDiscount,
        redirect,
      };

      placeOrder(orderData);
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if (isSuccess) {
      // Redirect to order success page
      toast.success("Order placed successfully");
      navigate("/dashboard/my-order", { replace: true, state: {} });
    }

    if (isError) {
      setShowModal(true);
    }
  }, [isSuccess, navigate, isError]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Complete Your Payment
      </h2>
      <p className="mb-10">
        Total Amount: <strong>${totalAmount}</strong>
      </p>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing || isLoading}
        className="w-full px-4 py-3 mt-6 text-white transition duration-300 ease-in-out transform bg-indigo-600 rounded-md hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing || isLoading ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}

      {showModal && (
        <SuccessModal
          title={`
      Dear Customer,

We apologize for the inconvenience, but we've encountered a technical issue while processing your recent order.

Please note that your payment has been successfully received, and your transaction ID is ${transactionId}.

Please save this transaction ID for future reference. Our team is working diligently to resolve the issue as soon as possible. To get the latest update on your order, please contact our customer support team at +8800000000000.

Thank you for your patience and understanding.`}
        />
      )}
    </form>
  );
};
export default CheckoutForm;
