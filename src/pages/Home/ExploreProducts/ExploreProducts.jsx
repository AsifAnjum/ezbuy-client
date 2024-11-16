import SectionTitle from "../../../component/SectionTitle";

import { Link } from "react-router-dom";

import useProducts from "../../../hooks/useProducts";
import ProductCardLoader from "../../../component/ui/loader/ProductCardLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import Products from "../../../component/Products/Products";

const ExploreProducts = () => {
  const { products, error, isLoading, isSuccess } = useProducts();

  let productContent;

  if (isLoading) {
    productContent = <ProductCardLoader limit={8} />;
  } else if (error?.data) {
    productContent = (
      <div className="col-span-4">
        <ItemNotFound section={true} message="Oops! unable to fetch products" />
      </div>
    );
  } else if (isSuccess && products.length > 0) {
    productContent = <Products products={products} limit={8} />;
  }

  return (
    <section>
      <SectionTitle title="Our Products" />

      <h1 className="my-8 section-subtitle">Explore Our Products</h1>

      {/* card */}
      <div className="grid grid-cols-1 max-md:justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8">
        {productContent}
      </div>

      <Link
        to="/shop"
        className="block w-48 p-2 mx-auto mt-10 tracking-wide text-center text-white duration-500 rounded bg-rose-500 hover:bg-rose-400"
      >
        View All Products
      </Link>
    </section>
  );
};
export default ExploreProducts;
