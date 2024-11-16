import { useNavigate } from "react-router-dom";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import TableLoader from "../../../component/ui/loader/TableLoader";
import { useGetMessagesQuery } from "../../../redux/features/message/messageApi";
import RenderComponent from "../../../component/RenderComponent/RenderComponent";
import { useState, useRef } from "react";

import Pagination from "../../../component/Pagination/Pagination";

const Support = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(`page=${page}`);
  const searchRef = useRef();

  const { data, isLoading, isError, isSuccess } = useGetMessagesQuery(query);

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

  const handleSort = (status) => {
    setPage(1); // Reset to first page
    updateQuery({ sort: status || null, page: 1 });
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

  const messages = data?.data.messages || [];
  const totalPage = data?.data.page || 0;
  const limit = data?.data?.limit || 20;
  const content = (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action By</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, index) => {
          return (
            <tr
              className="cursor-pointer hover:bg-slate-100"
              onClick={() =>
                navigate(`/dashboard/support-message/${message._id}`)
              }
              key={message._id}
            >
              <th>{(page - 1) * limit + index + 1}</th>
              {/*20 is the limit per page */}
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.status}</td>
              <td>{message?.actionBy?.name || "N/A"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderProps = {
    isLoading,
    isError,
    item: messages,
    loadingComponent: <TableLoader />,
    errorComponent: <ItemNotFound />,
    emptyComponent: <ItemNotFound message="No Support Message Found" />,
    contentComponent: content,
  };

  return (
    <div className="relative min-h-screen p-10 rounded-lg shadow-xl shadow-slate-700">
      <div className="flex justify-between my-4 max-md:flex-col max-md:items-center">
        <h1 className="text-3xl font-bold max-md:text-center max-md:mb-3">
          All Support Messages
        </h1>
        <div className="flex justify-end  max-[464px]:flex-col gap-2">
          <input
            type="text"
            ref={searchRef}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by user info"
            className="input-bordered input focus:outline-none input-accent"
          />

          <button
            onClick={handleSearch}
            className="text-slate-50 btn btn-accent"
          >
            Search
          </button>
        </div>
      </div>
      {isSuccess && (
        <div className="flex flex-wrap justify-center gap-4 my-4">
          <button
            className="text-white btn btn-neutral"
            onClick={() => handleSort("")}
          >
            All <span>({data?.data.total})</span>
          </button>
          <button
            className="text-white btn btn-warning"
            onClick={() => handleSort("pending")}
          >
            Pending <span>({data.data.pending})</span>
          </button>
          <button
            className={`text-white btn btn-success`}
            onClick={() => handleSort("solved")}
          >
            Solved <span>({data.data.solved})</span>
          </button>
          <button
            className="text-white btn btn-error"
            onClick={() => handleSort("rejected")}
          >
            Rejected <span>({data.data.rejected})</span>
          </button>
        </div>
      )}
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
export default Support;
