import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { toast, Zoom } from "react-toastify";
import { useUpdateOrderMutation } from "../../../redux/features/order/orderApi";

const OrderForm = ({ order, setIsEditing }) => {
  const {
    shippingAddress: { name, streetAddress, city, phone },
    deliveryStatus,
    paymentDetails: { status },
  } = order;

  const [updateOrder, { isLoading, isError, isSuccess, error, reset }] =
    useUpdateOrderMutation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      streetAddress: streetAddress,
      city: city,
      phone: phone,
      deliveryStatus: deliveryStatus,
      paymentStatus: status,
    },
  });

  const initialValues = useRef(watch());

  // Handle form submission
  const onSubmit = (data) => {
    const updatedData = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== initialValues.current[key]) {
        updatedData[key] = data[key];
      }
    });

    if (Object.keys(updatedData).length == 0) {
      toast.warn("No changes made to the order");
    } else {
      updateOrder({ id: order._id, data: updatedData });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order Updated Successfully", {
        transition: Zoom,
      });
      setIsEditing(false);
      reset();
    }

    if (isError && error?.data) {
      toast.error("OOps!!! Failed to update order");
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
  }, [isSuccess, isError, error, setError, setIsEditing, reset, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      {/* Shipping Details Section */}
      <div className="space-y-4">
        <h3>Shipping Details</h3>
        <label>
          Name:
          <input
            type="text"
            className="profile-input"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </label>

        <label>
          Address:
          <input
            type="text"
            className="profile-input"
            {...register("streetAddress", { required: "Address is required" })}
          />
          {errors.streetAddress && (
            <p className="form-error">{errors.streetAddress.message}</p>
          )}
        </label>

        <label>
          City:
          <input
            type="text"
            className="profile-input"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="form-error">{errors.city.message}</p>}
        </label>

        <label>
          Phone:
          <input
            type="tel"
            className="profile-input"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </label>
      </div>

      {/* Delivery Status Section */}
      <div className="section">
        <h3>Delivery Status</h3>
        <select className="profile-input" {...register("deliveryStatus")}>
          <option value="pending">Pending</option>
          <option value="onTheWay">On The Way</option>
          <option value="reached">reached</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>

        {errors.deliveryStatus && (
          <p className="form-error">{errors.deliveryStatus.message}</p>
        )}
      </div>

      {/* Payment Status Section */}
      <div className="section">
        <h3>Payment Status</h3>
        <select className="profile-input" {...register("paymentStatus")}>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
        {errors.paymentStatus && (
          <p className="form-error">{errors.paymentStatus.message}</p>
        )}
      </div>

      {errors.global && (
        <p className="mt-8 form-error">{errors.global.message} !!!</p>
      )}

      {/* Submit Button */}
      <button
        onClick={() => clearErrors("global")}
        disabled={isLoading}
        className="text-error btn btn-outline hover:bg-error hover:border-error"
      >
        <FaSave className="w-5 h-5 mr-2" />
        Save Changes
      </button>
    </form>
  );
};
export default OrderForm;
