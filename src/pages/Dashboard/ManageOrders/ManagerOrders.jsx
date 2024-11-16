import { useState, useRef } from "react";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import TableLoader from "../../../component/ui/loader/TableLoader";
import RenderComponent from "../../../component/RenderComponent/RenderComponent";
import Pagination from "../../../component/Pagination/Pagination";
import useGetOrderByStaff from "../../../hooks/useGetOrderByStaff";
import { useNavigate } from "react-router-dom";
import { statusColor } from "../../../lib/helperFunction";

const ManageOrders = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(`page=${page}`);
  const searchRef = useRef();
  const navigate = useNavigate();

  const { orders, totalPage, isError, isLoading } = useGetOrderByStaff(query);

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
  const handleSearch = () => {
    const searchQuery = searchRef.current.value;
    setPage(1); // Reset to first page
    updateQuery({ search: searchQuery || null, page: 1 });
  };

  const handleDeliveryFilter = (status) => {
    setPage(1); // Reset to first page
    updateQuery({ deliveryStatus: status || null, page: 1 });
  };

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
    updateQuery({ page: pageNumber });
  };

  // const statusColor = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "text-warning";
  //     case "success":
  //       return "text-success";
  //     case "failed":
  //       return "text-error";
  //     case "canceled":
  //       return "text-error";
  //     case "delivered":
  //       return "text-success";
  //     case "onTheWay":
  //       return "text-accent";

  //     default:
  //       return "";
  //   }
  // };

  const content = (
    <table className="table">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>User Email</th>
          <th>Total Amount</th>
          <th>Payment Status</th>
          <th>Delivery Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            onClick={() => navigate(`/dashboard/order/${order._id}`)}
            className="cursor-pointer hover:bg-slate-100"
            key={order._id}
          >
            <td>{order._id}</td>
            <td>{order.userEmail}</td>
            <td>{order.totalAmount}</td>
            <td className={`${statusColor(order.paymentDetails.status)}`}>
              {order.paymentDetails.status}
            </td>
            <td className={`${statusColor(order.deliveryStatus)}`}>
              {order.deliveryStatus}
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
    <div className="relative min-h-screen p-10 rounded-lg shadow-xl shadow-slate-700">
      <div className="flex justify-between my-4 max-md:flex-col max-md:items-center">
        <h1 className="text-3xl font-bold max-md:text-center max-md:mb-3">
          Customer Orders
        </h1>
        <div className="flex justify-end  max-[464px]:flex-col gap-2">
          <input
            type="text"
            ref={searchRef}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by orderId or email"
            className="input-bordered input focus:outline-none input-accent"
          />
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
export default ManageOrders;
