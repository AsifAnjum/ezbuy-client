import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddCouponMutation } from "../../../redux/features/coupon/couponApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { couponSchema } from "../../../schemas/couponSchema";

const AddCoupon = () => {
  const [
    addCoupon,
    { isLoading, isSuccess, isError, error, data, reset: couponReset },
  ] = useAddCouponMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(couponSchema),
  });

  const onSubmit = (data) => {
    const expiryDate = data.expiryDate.slice(0, 16);

    addCoupon({ ...data, expiryDate });
  };

  useEffect(() => {
    if (isSuccess && data?.success) {
      toast.success("Coupon Generated Successfully", {
        icon: () => "🏷️",
      });

      couponReset();
      reset();
    }

    if (isError && error?.data) {
      toast.error("OOps!!! Try Again", {
        icon: "🚫",
      });

      const apiErrors = error.data?.error[0]?.field;

      if (apiErrors) {
        error.data.error.forEach((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        setError("global", {
          type: "manual",
          message: error.data.message,
        });
      }
      couponReset();
    }
  }, [isSuccess, data, couponReset, reset, isError, error, setError]);

  return (
    <div>
      <div className="p-10 rounded-lg shadow-xl shadow-slate-700">
        <form
          className="w-full space-y-4 form-control"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="font-bold divider">Coupon Info</div>

          <div>
            <label className="font-semibold">Code</label>
            <input
              type="text"
              className="profile-input"
              placeholder="Coupon Code"
              {...register("code")}
            />
            {errors.code && (
              <p className="form-error">{errors.code.message} !!!</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Discount</label>
            <input
              type="number"
              className="profile-input"
              placeholder="Discount Amount"
              {...register("discount", { valueAsNumber: true })}
            />
            {errors.discount && (
              <p className="form-error">{errors.discount.message} !!!</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Expiry Date</label>
            <input
              type="datetime-local"
              className="profile-input"
              {...register("expiryDate")}
              min={new Date().toISOString().slice(0, 16)}
            />
            {errors.expiryDate && (
              <p className="form-error">{errors.expiryDate.message} !!!</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Stock</label>
            <input
              type="number"
              className="profile-input "
              placeholder="Stock Quantity"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="form-error">{errors.stock.message} !!!</p>
            )}
          </div>

          {errors.global && (
            <p className="form-error">{errors.global.message} !!!</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="text-white btn btn-error"
          >
            Generate Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
