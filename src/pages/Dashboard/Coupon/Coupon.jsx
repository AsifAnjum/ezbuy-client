import { useState } from "react";
import { useGetCouponByStaffQuery } from "../../../redux/features/coupon/couponApi";
import { useParams } from "react-router-dom";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import { dateString } from "../../../lib/helperFunction";
import CouponForm from "./CouponForm";

const Coupon = () => {
  const { code: couponCode } = useParams();

  const { data, isLoading, isError, error } =
    useGetCouponByStaffQuery(couponCode);

  const coupon = data?.data || {};

  const [isEditing, setIsEditing] = useState(false);

  const { code, discount, status, expiryDate, used, stock } = coupon;

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError && error.status === 403) {
    return (
      <ItemNotFound message={error.data.message} className="text-red-500" />
    );
  }

  if (isError) {
    return <ItemNotFound />;
  }

  if (!Object.keys(coupon).length) {
    return <ItemNotFound message="Coupon not found" />;
  }

  return (
    <div className="flex flex-col justify-center py-6 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="font-mono text-3xl font-extrabold text-gray-900">
                  Coupon Details
                </h2>
                {isEditing ? (
                  <CouponForm coupon={coupon} setIsEditing={setIsEditing} />
                ) : (
                  <>
                    <p>
                      <span className="font-bold">Coupon Code:</span> {code}
                    </p>
                    <p>
                      <span className="font-bold">Discount:</span> {discount}%
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 font-bold">Status:</span>

                      <span className="ml-1 capitalize">{status}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 font-bold">Expiry Date:</span>
                      {expiryDate ? dateString(expiryDate) : "No expiry date"}
                    </p>
                    <p>
                      <span className="font-bold">Times Used:</span> {used}
                    </p>
                    <p>
                      <span className="font-bold">Stock:</span> {stock}
                    </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="tracking-wide text-white btn btn-error"
                    >
                      Edit Coupon
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
