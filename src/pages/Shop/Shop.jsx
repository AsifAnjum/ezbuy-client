import FilterSidebar from "./FilterSidebar/FilterSidebar";
import useProducts from "../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";

import ItemNotFound from "../../component/ui/error/ItemNotFound";
import ProductCardLoader from "../../component/ui/loader/ProductCardLoader";
import Pagination from "../../component/Pagination/Pagination";
import Products from "../../component/Products/Products";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, totalPage, isLoading, isSuccess, isError } =
    useProducts(searchParams);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handlePage = (pageNumber) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set("page", pageNumber);
      return updatedParams;
    });
  };

  let content;

  if (isLoading) {
    content = <ProductCardLoader limit={8} />;
  } else if (isError) {
    content = (
      <div className="col-span-full justify-items-center">
        <ItemNotFound message="Something Went Wrong" />;
      </div>
    );
  } else if (isSuccess && products?.length === 0) {
    content = (
      <div className="col-span-full">
        <ItemNotFound message="No Product Found" />;
      </div>
    );
  } else if (isSuccess && products?.length > 0) {
    content = <Products products={products} />;
  }

  return (
    <div id="shop_page" className="">
      <h1 className="mt-20 mb-8 text-4xl font-bold tracking-wide max-md:text-center">
        EzBuy Shop
      </h1>

      <div className="divider divider-neutral " />

      <div className="flex flex-col xl:flex-row">
        <FilterSidebar />

        <div className="divider divider-horizontal divider-neutral max-xl:hidden" />
        {/* Product Grid */}
        <section className="w-full p-4">
          <div className="grid grid-cols-1 justify-items-center gap-4 min-[600px]:grid-cols-2 lg:grid-cols-3">
            {content}
          </div>
        </section>
      </div>

      <div className="mb-20">
        <Pagination
          currentPage={currentPage}
          handlePage={handlePage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}

export default Shop;
