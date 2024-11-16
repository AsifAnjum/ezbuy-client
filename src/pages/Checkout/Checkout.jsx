import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import BillingDetails from "./BillingDetails";
import OrderData from "./OrderData";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { email: userEmail } = user || {};

  const billingRef = useRef({});

  const { orderData, redirectFrom } = location?.state || {};

  useEffect(() => {
    if (!orderData) {
      navigate("/shop");
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <div className="mt-20 ">
      <div className="text-sm breadcrumbs">
        <ul className="text-slate-500">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">View Cart</Link>
          </li>

          <li className="font-bold tracking-wider text-black">Checkout</li>
        </ul>
      </div>

      <div className="flex justify-between my-16 max-md:flex-col">
        {/* billing details */}
        <BillingDetails userEmail={userEmail} ref={billingRef} />

        {/* order summary */}
        <OrderData
          billingDetails={billingRef.current}
          userEmail={userEmail}
          redirectFrom={redirectFrom}
          orderData={orderData}
        />
      </div>
    </div>
  );
};
export default Checkout;
