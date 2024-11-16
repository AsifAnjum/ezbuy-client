import { useRef, useState } from "react";
import { useGetCouponsQuery } from "../../../redux/features/coupon/couponApi";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../../component/ui/loader/TableLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import Pagination from "../../../component/Pagination/Pagination";
import RenderComponent from "../../../component/RenderComponent/RenderComponent";
import { statusColor } from "../../../lib/helperFunction";

const ManageCoupons = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(`page=${page}`);
  const searchRef = useRef();

  const { data, isLoading, isError } = useGetCouponsQuery(query);

  const navigate = useNavigate();

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
  const handleFilter = (status) => {
    setPage(1); // Reset to first page
    updateQuery({ status: status || null, page: 1 });
  };

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
    updateQuery({ page: pageNumber });
  };

  const handleSearch = () => {
    const searchQuery = searchRef.current.value;
    setPage(1); // Reset to first page
    updateQuery({ search: searchQuery || null, page: 1 });
  };

  const coupons = data?.data.coupons || [];
  const totalPage = data?.data.page || 0;
  const limit = data?.data.limit || 0;

  const content = (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Code</th>
          <th>Discount</th>
          <th>Status</th>
          <th>stock</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((coupon, index) => {
          return (
            <tr
              className="cursor-pointer hover:bg-slate-100"
              onClick={() => navigate(`/dashboard/coupon/${coupon.code}`)}
              key={coupon._id}
            >
              <th>{(page - 1) * limit + index + 1}</th>
              {/*20 is the limit per page */}
              <td>{coupon.code}</td>
              <td>{coupon.discount}</td>
              <td className={`${statusColor(coupon.status)}`}>
                {coupon.status}
              </td>
              <td>{coupon.stock}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderProps = {
    isLoading,
    isError,
    item: coupons,
    loadingComponent: <TableLoader />,
    errorComponent: <ItemNotFound />,
    emptyComponent: <ItemNotFound message="No Coupon Found" />,
    contentComponent: content,
  };

  return (
    <div className="min-h-screen p-10 rounded-lg shadow-xl shadow-slate-700">
      <div className="flex justify-between my-4 max-md:flex-col max-md:items-center">
        <h1 className="text-3xl font-bold max-md:text-center max-md:mb-3">
          All Coupon Code
        </h1>
        <div className="flex justify-end  max-[464px]:flex-col gap-2">
          <input
            type="text"
            ref={searchRef}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by coupon code"
            className="input-bordered input focus:outline-none input-accent"
          />

          <select
            name=""
            className="input-bordered input focus:outline-none input-accent text-slate-500"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option disabled value="">
              Filter By Status
            </option>
            <option value="">Default</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <button
            onClick={handleSearch}
            className="text-slate-100 btn btn-accent"
          >
            Search
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <RenderComponent {...renderProps} />
      </div>

      <div className="overflow-hidden">
        <Pagination
          totalPage={totalPage}
          handlePage={handlePage}
          currentPage={page}
        />
      </div>
    </div>
  );
};
export default ManageCoupons;
