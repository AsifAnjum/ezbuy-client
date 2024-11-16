import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/order/orderApi";
import { useState } from "react";
import {
  FaClock,
  FaMoneyCheck,
  FaPencilAlt,
  FaPencilRuler,
} from "react-icons/fa";
import { dateString } from "../../../lib/helperFunction";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import OrderForm from "./OrderForm";

const OrderDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetOrderByIdQuery(id);

  const order = data?.data || {};

  const handleCancel = () => {
    setIsEditing(false);
  };

  const subTotal =
    order?.products?.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0) || 0;

  let content;

  const paymentStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="w-5 h-5 text-warning" />;
      case "success":
        return <IoMdCheckmarkCircleOutline className="w-5 h-5 text-success" />;

      case "failed":
        return <IoMdCloseCircleOutline className="w-5 h-5 text-error" />;

      default:
        return null;
    }
  };

  const userRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-error";
      case "moderator":
        return "text-warning";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    content = <ComponentLoader />;
  } else if (isError) {
    content = <ItemNotFound />;
  } else if (!Object.keys(order).length) {
    content = <ItemNotFound message="Order not found" />;
  } else if (isSuccess && Object.keys(order).length) {
    content = (
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <div
            className={`flex items-center justify-between px-6 py-4 text-white ${
              isEditing ? "bg-error" : "bg-indigo-600"
            } `}
          >
            <div>
              <h1 className="text-2xl font-bold">Order Details</h1>
              <p className="text-indigo-200">Order ID: {order._id}</p>
            </div>
            <button
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              className={`flex items-center px-4 py-2 ${
                isEditing ? "text-error" : "text-indigo-600"
              } bg-white rounded-md`}
            >
              {isEditing ? (
                <>
                  <FaPencilRuler className="w-5 h-5 mr-2" />
                  Cancel Edit
                </>
              ) : (
                <>
                  <FaPencilAlt className="w-5 h-5 mr-2" />
                  Edit
                </>
              )}
            </button>
          </div>

          {isEditing ? (
            <div className="p-6">
              <OrderForm order={order} setIsEditing={setIsEditing} />
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h2 className="mb-2 text-lg font-semibold">
                    Shipping Information
                  </h2>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="font-medium">
                      Name: {order.shippingAddress.name}
                    </p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                    <p>Street: {order.shippingAddress.streetAddress}</p>
                    <p>City: {order.shippingAddress.city}</p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <span>Order Date:</span>
                      <span>{dateString(order.createdAt)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Delivery Status:</span>

                      <span>{order.deliveryStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-semibold">
                        ${order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-lg font-semibold">
                    Payment Details
                  </h2>
                  <div
                    className={`p-4 rounded-lg bg-gray-50 ${
                      order.paymentDetails.transactionId ? "w-max" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <FaMoneyCheck className="w-5 h-5 text-indigo-600" />
                      <span className="capitalize">
                        {order.paymentDetails.method === "online"
                          ? "Online"
                          : "Cash on Delivery"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      {paymentStatusIcon(order.paymentDetails.status)}
                      <span className="capitalize">
                        {order.paymentDetails.status}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between ${
                        order.paymentDetails.transactionId ? "gap-5" : ""
                      } text-gray-600`}
                    >
                      <span>Transaction: </span>
                      <span>{order.paymentDetails.transactionId || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* last update */}
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Last Update By</h2>
                  <div
                    className={`p-4 rounded-lg bg-gray-50 
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span>Name:</span>
                      <span className="capitalize">
                        {order.actionBy?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Email:</span>
                      <span
                        className={`${
                          order?.actionBy?.role == "admin" ? "text-error" : ""
                        }`}
                      >
                        {order.actionBy?.role === "admin"
                          ? "Restricted"
                          : order.actionBy?.email || "N/A"}
                      </span>
                    </div>
                    <div className={`flex justify-between`}>
                      <span>Role: </span>
                      <span
                        className={`${userRoleColor(
                          order?.actionBy?.role
                        )} capitalize`}
                      >
                        {order.actionBy?.role || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold">Order Items</h2>
                <div className="overflow-hidden rounded-lg bg-gray-50">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-4 text-left">Product</th>
                        <th className="p-4 text-right">Price</th>
                        <th className="p-4 text-right">Quantity</th>
                        <th className="p-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product) => (
                        <tr
                          key={product._id}
                          className="border-t border-gray-200"
                        >
                          <td className="p-4">{product.title}</td>
                          <td className="p-4 text-right">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="p-4 text-right">{product.quantity}</td>
                          <td className="p-4 font-medium text-right">
                            ${product.price * product.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 mt-8 rounded-lg bg-gray-50">
                <h2 className="mb-2 text-lg font-semibold">Order Totals</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>${order.shippingCharges.toFixed(2)}</span>
                </div>

                <div
                  className={`flex justify-between mb-2 ${
                    order.couponDiscount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <span>Coupon Discount:</span>
                  <span>{order.couponDiscount}%</span>
                </div>

                <div className="flex justify-between pt-2 mt-2 text-lg font-semibold border-t border-gray-200">
                  <span>Total:</span>
                  <span>${order.totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return content;
};
export default OrderDetails;
