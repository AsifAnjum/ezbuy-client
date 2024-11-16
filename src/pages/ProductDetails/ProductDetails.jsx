import { Link } from "react-router-dom";

import RelatedItems from "./RelatedItems";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/features/product/productApi";
import ItemNotFound from "../../component/ui/error/ItemNotFound";
import Product from "./Product";

import ComponentLoader from "../../component/ui/loader/ComponentLoader";

const ProductDetails = () => {
  const { slug } = useParams();
  const idIndex = slug.lastIndexOf("-");

  const id = slug.slice(idIndex + 1);

  const { data, isLoading, isError, error, isSuccess } = useGetProductQuery(id);

  const product = data?.data || {};

  let content;
  if (isLoading) {
    content = <ComponentLoader />;
  } else if (isError && error.status === 404) {
    content = <ItemNotFound message="Oops No Product Found" />;
  } else if (!Object.keys(product).length) {
    content = <ItemNotFound message="Something Went Wrong!!!" />;
  } else if (isSuccess && Object.keys(product).length) {
    content = <Product product={product} />;
  }

  return (
    <section className="mt-20">
      {/* navigation */}
      <div className="text-sm breadcrumbs">
        <ul className="text-slate-500">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li className="font-bold text-black">{product?.title}</li>
        </ul>
      </div>

      {/* product */}
      {content}

      {/* related items */}
      {isSuccess && (
        <RelatedItems tags={product?.tags} currentProductId={product?._id} />
      )}
    </section>
  );
};
export default ProductDetails;
