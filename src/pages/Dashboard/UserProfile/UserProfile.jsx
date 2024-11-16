import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../../redux/features/user/userApi";
import { dateString } from "../../../lib/helperFunction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import useGetOrderByStaff from "../../../hooks/useGetOrderByStaff";

const UserProfile = () => {
  const { id } = useParams();
  const { user: authUser } = useSelector((state) => state.auth);

  const { data, isLoading, isError, isSuccess } = useGetUserQuery(id);

  let query;
  if (!isLoading && isSuccess) {
    query = `search=${data.data.email}`;
  }

  const { orders, total } = useGetOrderByStaff(query);

  const [
    updateUserRole,
    {
      error: updateRoleError,
      isSuccess: updateRoleSuccess,
      reset: updateRoleReset,
    },
  ] = useUpdateUserRoleMutation();
  const [
    updateUserStatus,
    {
      error: updateStatusError,
      isSuccess: updateStatusSuccess,
      reset: updateStatusReset,
    },
  ] = useUpdateUserStatusMutation();

  const [userRole, setUserRole] = useState("");

  const user = data?.data || {};

  const {
    fullName,
    gender,
    email,
    lastLogin,
    status,
    createdAt,
    passwordChangedAt,
    role,
  } = user;

  const totalOrders = total || 0;

  useEffect(() => {
    if (updateRoleSuccess) {
      toast.success("Role Updated Successfully");
      updateRoleReset();
    }

    if (updateRoleError?.data) {
      toast.error("Role Update Failed");
      updateRoleReset();
    }

    if (updateStatusSuccess) {
      toast.success("Status Updated Successfully");

      updateStatusReset();
    }

    if (updateStatusError?.data) {
      toast.error("Status Update Failed");
      updateStatusReset();
    }
  }, [
    updateRoleSuccess,
    updateRoleError,
    updateRoleReset,
    updateStatusSuccess,
    updateStatusError,
    updateStatusReset,
  ]);

  const handleUpdateRole = () => {
    if (userRole) {
      updateUserRole({ id, role: userRole });
    } else {
      toast.error("Please select a role");
    }
  };

  const handleUpdateStatus = () => {
    updateUserStatus({
      id,
      status: status === "active" ? "blocked" : "active",
    });
  };

  if (isLoading) return <ComponentLoader />;

  if (isError) return <ItemNotFound message="Something Went Wrong" />;

  if (!Object.keys(user).length)
    return <ItemNotFound message="User Not Found" />;

  return (
    <div>
      <div className="container p-4 mx-auto">
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="px-6 py-4 text-white bg-gray-800">
            <h2 className="text-xl font-semibold">User Profile</h2>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="block font-semibold text-gray-700">
                Full Name
              </label>
              <p className="">{fullName}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <p className="">{email}</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold text-gray-700">
                Gender
              </label>
              <p className="">{gender}</p>
            </div>

            {/* Status */}
            <div>
              <label className="block font-semibold text-gray-700">
                Status
              </label>
              <p
                className={`${
                  status === "active" ? "text-green-500" : "text-slate-400"
                }`}
              >
                {status}
              </p>
            </div>

            {/* Total Orders */}
            <div>
              <label className="block font-semibold text-gray-700">
                Total Orders
              </label>
              <p className="">{totalOrders}</p>
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Role</label>
              <p
                className={`${
                  role == "admin"
                    ? "text-red-500 font-semibold tracking-wide"
                    : role == "moderator"
                    ? "text-yellow-500 font-semibold tracking-wide"
                    : ""
                }`}
              >
                {role?.toUpperCase() || "User"}
              </p>
            </div>
            <div>
              <label className="block font-semibold text-gray-700">
                Last Login
              </label>
              <p>{lastLogin ? dateString(lastLogin) : "N/A"}</p>
            </div>
            <div>
              <label className="block font-semibold text-gray-700">
                Password Changed
              </label>
              <p>{passwordChangedAt ? dateString(passwordChangedAt) : "N/A"}</p>
            </div>

            {/* Account Created */}
            <div>
              <label className="block font-semibold text-gray-700">
                Account Created
              </label>
              <p className="">{dateString(createdAt)}</p>
            </div>
          </div>

          {/* Update Role */}
          {role !== "admin" && authUser?.role === "admin" && (
            <div className="p-6 space-y-2">
              <label className="block font-semibold text-accent">
                Update User Role
              </label>
              <select
                className="block px-3 py-2 border rounded-lg focus:outline-none"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="">Select User Role</option>
                {["user", "moderator", "admin"].map((r, i) => {
                  return (
                    role !== r && (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    )
                  );
                })}
              </select>
              <button
                onClick={handleUpdateRole}
                className="text-white btn btn-neutral"
              >
                Update Role
              </button>
            </div>
          )}

          {/* Action Buttons */}
          {role === "admin" ||
          (role === "moderator" && authUser.role === "moderator") ? (
            ""
          ) : (
            <div className="flex items-center justify-end p-3 bg-gray-50">
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 text-white btn-error btn"
              >
                {status !== "active" ? "Activate" : "Block"} User
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white ">
        {/* Statistics Section */}

        {/* Orders Table */}
        <div className="p-6 mt-6 rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Order History
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Total Items</th>
                  <th className="px-4 py-2 border">Total Price</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {totalOrders > 0 &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-4 py-2 border">{order._id}</td>
                      <td className="px-4 py-2 border">
                        {dateString(order.createdAt)}
                      </td>
                      <td className="px-4 py-2 border">
                        {order.products.length}
                      </td>
                      <td className="px-4 py-2 border">${order.totalAmount}</td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`text-sm px-3 py-1 rounded-lg ${
                            order.status === "delivered"
                              ? "text-green-600 bg-green-100"
                              : "text-yellow-600 bg-yellow-100"
                          }`}
                        >
                          {order.deliveryStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
