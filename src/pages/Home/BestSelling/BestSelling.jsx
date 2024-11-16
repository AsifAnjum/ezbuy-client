import { Link } from "react-router-dom";

import SectionTitle from "../../../component/SectionTitle";

import ProductCardLoader from "../../../component/ui/loader/ProductCardLoader";
import useProducts from "../../../hooks/useProducts";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import Products from "../../../component/Products/Products";

const BestSelling = () => {
  const { products, isLoading, isSuccess, error, isError } =
    useProducts("page=1&sort=-sold");

  let bestSellingContent;

  if (isLoading) {
    bestSellingContent = <ProductCardLoader limit={5} />;
  } else if (isError || error?.data || products?.length === 0) {
    bestSellingContent = (
      <div className="flex-1">
        <ItemNotFound section={true} message="Oops! unable to fetch products" />
      </div>
    );
  } else if (products?.length > 0) {
    bestSellingContent = <Products products={products} limit={5} />;
  }
  return (
    <section className="">
      <SectionTitle title="This Month" />
      <div className="flex items-center justify-between my-8">
        <h1 className="section-subtitle">Best Selling Products</h1>

        {isSuccess && (
          <Link
            to="/shop?sort=most-sold"
            className="px-8 max-[560px]:hidden tracking-wider text-white btn btn-error "
          >
            View All
          </Link>
        )}
      </div>

      {/* cards */}
      <div className="flex flex-wrap gap-y-5 max-[560px]:justify-center justify-between">
        {bestSellingContent}
      </div>

      {isSuccess && (
        <Link
          to="/shop?page=1&sort=-sold"
          className="px-8 mt-10 flex w-1/2 mx-auto min-[560px]:hidden tracking-wider text-white btn btn-md btn-error "
        >
          View All
        </Link>
      )}
    </section>
  );
};
export default BestSelling;
