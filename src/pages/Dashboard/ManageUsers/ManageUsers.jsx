import { Link } from "react-router-dom";

import ItemNotFound from "../../../component/ui/error/ItemNotFound";

import TableLoader from "../../../component/ui/loader/tableLoader";
import { useGetUsersQuery } from "../../../redux/features/user/userApi";
import { useState, useRef } from "react";
import Pagination from "../../../component/Pagination/Pagination";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(`page=${page}`);
  const searchRef = useRef();
  const { data, isLoading, isError, error } = useGetUsersQuery(query);

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

  const handleFilter = (status) => {
    setPage(1); // Reset to first page
    updateQuery({ status: status || null, page: 1 });
  };

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
    updateQuery({ page: pageNumber });
  };

  const { users } = data?.data || [];
  const totalPage = data?.data.page || 0;
  const limit = data?.data.limit || 0;

  let content;

  if (isLoading) {
    content = <TableLoader />;
  } else if (isError) {
    if (error.status === 403) {
      content = (
        <ItemNotFound
          className="text-red-500"
          message="You are not authorized to view this page"
        />
      );
    } else {
      content = <ItemNotFound message="Something Went Wrong!!!" />;
    }
  } else if (users?.length === 0) {
    content = <ItemNotFound message="Oops! No Users Found" />;
  } else if (users?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{(page - 1) * limit + index + 1}</th>
              <td className="italic font-bold tracking-wide link">
                <Link to={`/dashboard/user/${user._id}`}>{user.fullName}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="min-h-screen p-10 rounded-lg shadow-xl shadow-slate-700">
      <div className="flex justify-between my-4 max-md:flex-col max-md:items-center">
        <h1 className="text-3xl font-bold max-md:text-center max-md:mb-3">
          All Users
        </h1>
        <div className="flex justify-end  max-[464px]:flex-col gap-2">
          <input
            type="text"
            ref={searchRef}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by name or email"
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
            <option value="inactive">Inactive</option>
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

      <div className="overflow-auto">{content}</div>

      <Pagination
        currentPage={page}
        handlePage={handlePage}
        totalPage={totalPage}
      />
    </div>
  );
};
export default ManageUsers;
