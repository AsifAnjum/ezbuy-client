import { useState } from "react";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import TableLoader from "../../../component/ui/loader/TableLoader";
import { useGetOrdersByUserQuery } from "../../../redux/features/order/orderApi";
import RenderComponent from "../../../component/RenderComponent/RenderComponent";
import Pagination from "../../../component/Pagination/Pagination";

import pdfGenerator from "./PdfGenerator";
import { statusColor } from "../../../lib/helperFunction";

const Order = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(`page=${page}`);

  const { data, isLoading, isError } = useGetOrdersByUserQuery(query);

  const orders = data?.data.order || [];
  const totalPage = data?.data.page || 0;

  const updateQuery = (newParams) => {
    setQuery((prev) => {
      const params = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      return params.toString();
    });
  };

  const handleDeliveryFilter = (status) => {
    setPage(1); // Reset to first page
    updateQuery({ deliveryStatus: status || null, page: 1 });
  };

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
    updateQuery({ page: pageNumber });
  };

  const content = (
    <table className="table">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Total Amount</th>
          <th>Payment Status</th>
          <th>Delivery Status</th>
          <th>Invoice</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr className="cursor-pointer hover:bg-slate-100" key={order._id}>
            <td>{order._id}</td>
            <td>{order.totalAmount}</td>
            <td className={`${statusColor(order.paymentDetails.status)}`}>
              {order.paymentDetails.status}
            </td>
            <td className={`${statusColor(order.deliveryStatus)}`}>
              {order.deliveryStatus}
            </td>
            <td>
              <button
                onClick={() => pdfGenerator(order)}
                className="text-blue-500 link"
              >
                Invoice
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderProps = {
    isLoading,
    isError,
    item: orders,
    loadingComponent: <TableLoader />,
    errorComponent: <ItemNotFound />,
    emptyComponent: <ItemNotFound message="No Order Found" />,
    contentComponent: content,
  };

  return (
    <div className="min-h-screen p-10 rounded-lg shadow-xl shadow-slate-700">
      <div className="flex justify-between my-4 max-md:flex-col max-md:items-center">
        <h1 className="text-3xl font-bold max-md:text-center max-md:mb-3">
          MY Orders
        </h1>
        {!isError && (
          <div className="flex justify-end  max-[464px]:flex-col gap-2">
            <select
              name=""
              className="input-bordered input focus:outline-none input-accent text-slate-500"
              onChange={(e) => handleDeliveryFilter(e.target.value)}
            >
              <option disabled value="">
                Filter By Delivery Status
              </option>
              <option value="">Default</option>
              <option value="pending">Pending</option>
              <option value="onTheWay">On The Way</option>
              <option value="reached">Destination Reached</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        )}
      </div>
      <div className="overflow-auto">
        <RenderComponent {...renderProps} />
      </div>

      {orders.length > 0 && (
        <div className="overflow-hidden">
          <Pagination
            totalPage={totalPage}
            handlePage={handlePage}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
};
export default Order;
