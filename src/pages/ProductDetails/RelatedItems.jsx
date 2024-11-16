import SectionTitle from "../../component/SectionTitle";

import useProducts from "../../hooks/useProducts";
import ProductCardLoader from "../../component/ui/loader/ProductCardLoader";
import ItemNotFound from "../../component/ui/error/ItemNotFound";
import Products from "../../component/Products/Products";

const RelatedItems = ({ tags, currentProductId }) => {
  const query = `tags=${tags.join(",")}&_id[$ne]=${currentProductId}&limit=5`;

  const { products, isLoading, error, isSuccess } = useProducts(query, {
    skip: tags.length === 0,
  });

  let content;

  if (isLoading) {
    content = <ProductCardLoader limit={4} />;
  } else if (error?.data) {
    content = <ItemNotFound message="Something Went Wrong" />;
  } else if (isSuccess && products.length > 0) {
    content = <Products products={products} />;
  }

  return (
    <div className="mt-24">
      <SectionTitle title="Related Items" />

      <div className="flex flex-wrap gap-16 my-20">{content}</div>
    </div>
  );
};
export default RelatedItems;
