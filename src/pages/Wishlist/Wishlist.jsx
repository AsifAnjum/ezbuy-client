import { useSelector } from "react-redux";
import ItemNotFound from "../../component/ui/error/ItemNotFound";
import ProductCardLoader from "../../component/ui/loader/ProductCardLoader";
import useProducts from "../../hooks/useProducts";
import Products from "../../component/Products/Products";
import { useDispatch } from "react-redux";
import { clearWishlist } from "../../redux/features/wishlist/wishlist";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();
  const query = `ids=${wishlist.join(",")}&limit=10`;

  const { products, isLoading, isSuccess, isError } = useProducts(query, {
    skip: wishlist.length === 0,
  });

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
    <div className="my-20 h-min">
      <div className="flex items-center justify-between font-bold">
        <p>Wishlist ({wishlist.length})</p>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="tracking-wide btn btn-outline"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid mt-16 max-sm:justify-items-center sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-y-8">
        {content}
      </div>
    </div>
  );
};
export default Wishlist;
