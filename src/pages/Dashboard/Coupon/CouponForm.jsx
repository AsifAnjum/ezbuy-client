import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { couponSchema } from "../../../schemas/couponSchema";
import { useEditCouponMutation } from "../../../redux/features/coupon/couponApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CouponForm = ({ coupon, setIsEditing }) => {
  const { _id, code, discount, status, expiryDate, stock } = coupon;

  const [editCoupon, { isLoading, isSuccess, isError, error, reset }] =
    useEditCouponMutation();

  const toLocalDateTimeString = (utcDateString) => {
    const date = new Date(utcDateString);
    const localISODate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    return localISODate;
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: code,
      discount: discount,
      expiryDate: toLocalDateTimeString(expiryDate),
      stock: stock,
      status: status,
    },

    resolver: zodResolver(couponSchema),
  });

  const watchStatus = watch("status");

  const handleStatusChange = () => {
    setValue("status", watchStatus === "active" ? "blocked" : "active");
  };

  const onsubmit = (data) => {
    const updatedData = {};

    if (data.code !== code) {
      updatedData.code = data.code;
    }
    if (data.discount !== discount) {
      updatedData.discount = data.discount;
    }
    if (data.expiryDate !== toLocalDateTimeString(expiryDate)) {
      updatedData.expiryDate = data.expiryDate;
    }
    if (data.stock !== stock) {
      updatedData.stock = data.stock;
    }

    if (watchStatus !== status) {
      updatedData.status = watchStatus;
    }

    if (Object.keys(updatedData).length > 0) {
      editCoupon({ id: _id, data: updatedData });
    } else {
      toast.warn("No changes made to the coupon");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon Updated Successfully", {
        icon: () => "🏷️",
      });
      reset();
    }

    if (isError && error?.data) {
      toast.error("OOps!!! Try Again", {
        icon: "🚫",
      });
      reset();

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
    }
  }, [isSuccess, isError, error, setError, setIsEditing, reset]);

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
      <div>
        <label htmlFor="code" className="font-medium text-gray-700">
          Coupon Code
        </label>
        <input
          type="text"
          {...register("code")}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.code && <p className="form-error">{errors.code.message} !!!</p>}
      </div>
      <div>
        <label htmlFor="discount" className="font-medium text-gray-700">
          Discount
        </label>
        <input
          type="number"
          {...register("discount", { valueAsNumber: true })}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.discount && (
          <p className="form-error">{errors.discount.message} !!!</p>
        )}
      </div>
      <div>
        <label htmlFor="expiryDate" className="font-medium text-gray-700">
          Expiry Date
        </label>
        <input
          type="datetime-local"
          {...register("expiryDate")}
          min={new Date().toISOString().slice(0, 16)}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.expiryDate && (
          <p className="form-error">{errors.expiryDate.message} !!!</p>
        )}
      </div>
      <div>
        <label htmlFor="stock" className="font-medium text-gray-700">
          Stock
        </label>
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.stock && (
          <p className="form-error">{errors.stock.message} !!!</p>
        )}
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleStatusChange}
          className={`${
            watchStatus === "active" ? "bg-green-500" : "bg-red-500"
          } flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none `}
        >
          <span className="sr-only">Toggle status</span>
          <span
            aria-hidden="true"
            className={`${
              watchStatus === "active" ? "translate-x-3" : "-translate-x-3"
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </button>
        <span className="ml-3 text-sm">
          {watchStatus === "active" ? "Active" : "Blocked"}
        </span>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="tracking-wider text-white btn btn-error"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
export default CouponForm;
