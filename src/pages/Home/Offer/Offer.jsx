import SectionTitle from "../../../component/SectionTitle";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { useRef } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../../component/ProductCard/ProductCard";

import ProductCardLoader from "../../../component/ui/loader/ProductCardLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import useProducts from "../../../hooks/useProducts";

import useAddToCart from "../../../hooks/useAddToCart";
import useWishlist from "../../../hooks/useWishlist";

import CountDown from "./CountDown";

const Offer = () => {
  const query = `page=1&sort=-sale`;
  const { products, isLoading, error, isSuccess, isError } = useProducts(query);
  const { cartLoading, handleAddToCart } = useAddToCart();
  const { wishlist, handleToggleWishlist } = useWishlist();

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,

    className: "slider variable-width",
  };

  let offersContent;

  if (isLoading) {
    offersContent = <ProductCardLoader limit={1} />;
  } else if (isSuccess && products.length > 0) {
    offersContent = products?.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        addToCart={handleAddToCart}
        cartLoading={cartLoading}
        className="px-2"
        toggleWishlist={handleToggleWishlist}
        isWishlist={wishlist.includes(product._id)}
      />
    ));
  }

  return (
    <section>
      <SectionTitle title="Today's" />
      <div className="flex justify-between my-8 md:items-center max-md:flex-col">
        {/* sub heading */}
        <div className="flex gap-6 md:items-center md:gap-24 max-md:flex-col">
          <h1 className="section-subtitle">Flash Sales</h1>

          {/* countdown */}
          <CountDown />
        </div>

        {/* <!-- Navigation --> */}
        {isSuccess && (
          <div className="space-x-1 max-md:ml-auto max-md:mt-8">
            <span
              onClick={previous}
              className="p-[8px] bg-gray-200 rounded-[20px] cursor-pointer"
            >
              <GoArrowLeft size={23} className="inline mb-1" />
            </span>
            <span
              onClick={next}
              className="p-[8px] bg-gray-200 rounded-[20px] cursor-pointer"
            >
              <GoArrowRight size={23} className="inline mb-1" />
            </span>
          </div>
        )}
      </div>
      {/* card */}
      {isError || error?.data ? (
        <ItemNotFound section={true} message="Oops! unable to fetch products" />
      ) : (
        <div className="slider-container">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {offersContent}
          </Slider>
        </div>
      )}

      {isSuccess && (
        <Link
          to="/shop?sort=best-discount"
          className="block w-48 p-2 mx-auto mt-10 tracking-wide text-center text-white duration-500 rounded bg-rose-500 hover:bg-rose-400"
        >
          View All Products
        </Link>
      )}
    </section>
  );
};
export default Offer;
