import { useParams } from "react-router-dom";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import {
  useEditMessageStatusMutation,
  useGetMessageQuery,
} from "../../../redux/features/message/messageApi";

import { dateString } from "../../../lib/helperFunction";
import { useEffect } from "react";
import { toast } from "react-toastify";
import RenderComponent from "../../../component/RenderComponent/RenderComponent";

const SupportMessage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetMessageQuery(id);
  const [
    editMessageStatus,
    {
      isLoading: updateLoading,
      isError: updateIsError,
      isSuccess: updateIsSuccess,
    },
  ] = useEditMessageStatusMutation();

  const handleAction = (status) => {
    editMessageStatus({ id, data: { status } });
  };

  const supportMessage = data?.data || {};

  useEffect(() => {
    if (updateIsSuccess) {
      toast.success("Status Updated Successfully");
    }

    if (updateIsError) {
      toast.error("Something Went Wrong");
    }
  }, [updateIsSuccess, updateIsError]);

  //   if (isLoading) return <ComponentLoader />;
  //   if (isError) return <ItemNotFound message="Something Went Wrong" />;

  //   if (!Object.keys(supportMessage).length) {
  //     return <ItemNotFound message="No Support Message" />;
  //   }

  const {
    name,
    email,
    phone,
    message,
    status,
    actionBy,
    createdAt,
    updatedAt,
  } = supportMessage;

  const supportMessageContent = (
    <div className="max-w-3xl p-4 mx-auto overflow-auto bg-white rounded-lg shadow-lg !min-w-24">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-700">
          Support Message
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "solved"
              ? "bg-green-100 text-green-600"
              : status === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status === "solved"
            ? "Solved"
            : status === "rejected"
            ? "Rejected"
            : "Pending"}
        </span>
      </div>

      {/* Message Info Section */}
      <div className="mb-4 space-y-3">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Name:</p>
          <p className="text-gray-700">{name}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Email:</p>
          <p className="text-gray-700">{email}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Phone:</p>
          <p className="text-gray-700">{phone}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Sent Date:</p>
          <p className="text-gray-700">{dateString(createdAt)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Message:</p>
          <p className="p-3 mt-2 text-gray-700 border rounded-lg bg-gray-50">
            {message}
          </p>
        </div>
      </div>

      {/* Solved Section */}

      <div className="pt-3 space-y-3 border-t">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Action By:</p>
          <p className="text-gray-700">{actionBy?.name || "N/A"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Action Date:</p>
          <p className="text-gray-700">
            {createdAt !== updatedAt ? dateString(updatedAt) : "N/A"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-4 space-x-3">
        <button
          onClick={() => handleAction("solved")}
          className="px-4 py-2 text-white transition bg-green-500 rounded-lg shadow hover:bg-green-600 disabled:bg-slate-300"
          disabled={status === "solved" || updateLoading}
        >
          Mark as Solved
        </button>
        <button
          onClick={() => handleAction("rejected")}
          className="px-4 py-2 text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600 disabled:bg-slate-300"
          disabled={status === "rejected" || updateLoading}
        >
          Reject
        </button>
        <button
          onClick={() => handleAction("pending")}
          className="px-4 py-2 text-white transition bg-yellow-500 rounded-lg shadow hover:bg-yellow-600 disabled:bg-slate-300"
          disabled={status === "pending" || updateLoading}
        >
          Set to Pending
        </button>
      </div>
    </div>
  );

  const props = {
    isLoading,
    isError,
    item: supportMessage,
    loadingComponent: <ComponentLoader />,
    errorComponent: <ItemNotFound />,
    emptyComponent: <ItemNotFound message=" Support Message Not Found" />,
    contentComponent: supportMessageContent,
  };
  return <RenderComponent {...props} />;
};
export default SupportMessage;
