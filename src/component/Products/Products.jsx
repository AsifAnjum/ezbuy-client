import useAddToCart from "../../hooks/useAddToCart";
import ProductCard from "../ProductCard/ProductCard";

import useWishlist from "../../hooks/useWishlist";

const Products = ({ products, className, limit }) => {
  const { cartLoading, handleAddToCart } = useAddToCart();
  const { wishlist, handleToggleWishlist } = useWishlist();

  return limit
    ? products
        ?.slice(0, limit)
        .map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={handleAddToCart}
            cartLoading={cartLoading}
            className={className}
            toggleWishlist={handleToggleWishlist}
            isWishlist={wishlist.includes(product._id)}
          />
        ))
    : products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          addToCart={handleAddToCart}
          cartLoading={cartLoading}
          className={className}
          toggleWishlist={handleToggleWishlist}
          isWishlist={wishlist.includes(product._id)}
        />
      ));
};
export default Products;
