import { Link } from "react-router-dom";
import Rating from "../Rating";
import { HiOutlineHeart } from "react-icons/hi2";

const ProductCard = ({
  product,
  className,
  addToCart,
  cartLoading,
  toggleWishlist,
  isWishlist,
}) => {
  const {
    _id,
    slug,
    title,
    imgUrls,
    sale,
    salePrice,
    price,
    stock,
    status,
    averageRating: { userId, rating },
  } = product;

  return (
    <div className={`!w-[270px] group ${className ? className : ""}`}>
      <div className="relative flex items-center justify-center h-64 p-4 bg-gray-200 rounded">
        <figure className="flex items-center justify-center h-full">
          <img
            src={imgUrls}
            loading="lazy"
            className="image-bg-remove"
            alt={title}
          />
        </figure>
        <p
          onClick={() => toggleWishlist(_id, isWishlist)}
          className="absolute top-0 right-0 flex flex-col items-center justify-center w-8 h-8 p-1 mt-3 mr-3 bg-white rounded-full cursor-pointer"
        >
          <HiOutlineHeart
            size={32}
            className={`${isWishlist ? "fill-red-500/80 stroke-none" : ""}`}
          />
        </p>
        {sale > 0 && (
          <p className="absolute top-0 flex flex-col items-center justify-center px-6 mt-3 rounded-md cursor-pointer text-zinc-200 bg-rose-500 left-2 h-7 w-7">
            -{sale}%
          </p>
        )}
        <div className="absolute bottom-0 w-full p-2 text-center transition-opacity duration-1000 bg-black opacity-0 group-hover:opacity-100">
          {stock > 0 && status == "continued" ? (
            <button
              disabled={cartLoading}
              onClick={() => addToCart(_id)}
              className="text-white transition-colors duration-300 cursor-pointer hover:text-slate-300"
            >
              Add To Cart
            </button>
          ) : (
            <p className="text-white">Out of Stock</p>
          )}
        </div>
      </div>
      <div>
        <Link
          to={`/product/${slug}`}
          className={`font-bold ${
            status == "discontinued" ? "line-through" : ""
          }`}
        >
          {title}
        </Link>

        {status === "discontinued" ? (
          <p className="text-sm text-gray-500">Discontinued</p>
        ) : (
          <p className="mt-2 space-x-4">
            <span className="font-semibold text-rose-500">
              ${salePrice > 0 ? salePrice : price}
            </span>
            {salePrice > 0 && (
              <span className="line-through text-slate-400">${price}</span>
            )}
          </p>
        )}

        <div className="flex items-center mt-2">
          <div className="tooltip tooltip-error" data-tip={rating}>
            <Rating rating={rating} />
          </div>
          <p className="ml-2 text-slate-300">({userId.length})</p>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
