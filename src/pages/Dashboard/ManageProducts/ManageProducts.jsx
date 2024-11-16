import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/product/productApi";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";

import TableLoader from "../../../component/ui/loader/tableLoader";
import { useState, useRef } from "react";
import Pagination from "../../../component/Pagination/Pagination";
import useIsAdmin from "../../../hooks/useIsAdmin";
import PermissionModal from "../../../modal/PermissionModal";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(`page=${page}`);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const searchRef = useRef();

  const isAdmin = useIsAdmin();

  const { data, isLoading, isError } = useGetProductsQuery(query);
  const [
    deleteProduct,
    {
      isLoading: deleteIsLoading,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      reset: deleteReset,
    },
  ] = useDeleteProductMutation();

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

  const handleDeleteProduct = (res) => {
    setOpenModal(false);

    if (res) {
      // Delete product
      deleteProduct(deleteProductId);
    }
  };

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.success("Product Deleted Successfully");
      deleteReset();
    }

    if (deleteError) {
      if (deleteError.status === 403) {
        toast.error("You don't have permission to delete product");
      } else {
        toast.error("Failed to delete product");
      }
      deleteReset();
    }
  }, [deleteIsSuccess, deleteError, deleteReset]);

  const { products } = data?.data || [];
  const totalPage = data?.data.page || 0;
  const limit = data?.data.limit || 0;
  let content;

  if (isLoading) {
    content = <TableLoader />;
  } else if (isError) {
    content = <ItemNotFound message="Something Went Wrong!!!" />;
  } else if (products?.length === 0) {
    content = <ItemNotFound message="Oops! No Product Found" />;
  } else if (products?.length > 0) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th>{(page - 1) * limit + index + 1}</th>
              {/* 20 is limit of per page */}
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.status}</td>
              <td className="space-x-1">
                <Link
                  to={`/dashboard/edit-product/${product._id}`} // Fixed dynamic route
                  className="text-white btn btn-xs btn-success"
                >
                  <FaEdit size={20} />
                </Link>
                {isAdmin && (
                  <p
                    onClick={() => {
                      setDeleteProductId(product._id);
                      setOpenModal(true);
                    }}
                    className={`text-white btn btn-xs btn-error ${
                      deleteIsLoading ? " btn-disabled" : ""
                    }`}
                  >
                    <FaRegTrashAlt size={20} />
                  </p>
                )}
              </td>
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
          All Products
        </h1>
        <div className="flex justify-end  max-[464px]:flex-col gap-2">
          <input
            type="text"
            ref={searchRef}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search product"
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
            <option value="continued">Continued</option>
            <option value="discontinued">Discontinued</option>
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

      {/* modal */}
      {openModal && <PermissionModal confirm={handleDeleteProduct} />}
    </div>
  );
};
export default ManageProducts;
