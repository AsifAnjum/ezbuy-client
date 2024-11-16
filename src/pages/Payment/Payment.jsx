import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_APP_PAYMENT_GATEWAY_KEY);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#4F46E5",
      colorBackground: "#ffffff",
      colorText: "#1F2937",
      colorDanger: "#EF4444",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      spacingUnit: "4px",
      borderRadius: "8px",
    },
    rules: {
      ".Tab": {
        border: "1px solid #E5E7EB",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      ".Tab:hover": {
        color: "var(--colorText)",
      },
      ".Tab--selected": {
        borderColor: "#4F46E5",
        boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)",
      },
      ".Input": {
        border: "1px solid #E5E7EB",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      ".Input:focus": {
        boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)",
      },
      ".Label": {
        fontWeight: "500",
      },
      ".Error": {
        color: "var(--colorDanger)",
      },
    },
  };

  const clientSecret = location.state?.clientSecret;
  const totalAmount = location.state?.amount;
  const products = location.state?.products;
  const shippingAddress = location.state?.shippingAddress;
  const couponCode = location.state?.couponCode || "";
  const couponDiscount = location.state?.couponDiscount || 0;
  const redirect = location.state?.redirectFrom;

  useEffect(() => {
    if (!clientSecret || !totalAmount) {
      navigate("/checkout");
    }
  }, [clientSecret, totalAmount, navigate]);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance,
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              totalAmount={totalAmount}
              products={products}
              shippingAddress={shippingAddress}
              couponCode={couponCode}
              couponDiscount={couponDiscount}
              redirect={redirect}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};
export default Payment;
