import { useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineHeart,
  HiOutlineMinus,
  HiOutlinePlus,
} from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import Rating from "../../component/Rating";
import useWishlist from "../../hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import ReviewModal from "../../modal/ReviewModal";

const Product = ({ product }) => {
  const {
    _id,
    title,
    description,
    imgUrls,
    salePrice,
    price,
    stock,
    status,
    averageRating: { userId, rating },
  } = product;

  const [stockCount, setStockCount] = useState(stock);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const { wishlist, handleToggleWishlist } = useWishlist();

  const isWishlist = wishlist.includes(_id);

  const [counter, setCounter] = useState(1);

  const incCounter = () => {
    if (stockCount > 1) {
      setCounter((prevCounter) => prevCounter + 1);
      setStockCount((prevStockCount) => prevStockCount - 1);
    }
  };
  const decCounter = () => {
    if (counter > 1) setCounter((prevCounter) => prevCounter - 1);
  };
  const [selectedImg, setSelectedImg] = useState(imgUrls[0]);

  const handleNavigateToCheckout = () => {
    // Navigate to checkout page
    const products = [
      {
        productId: _id,
        title,
        price: salePrice > 0 ? salePrice : price,
        quantity: counter,
      },
    ];

    const totalAmount = products[0].price * products[0].quantity;
    const orderData = {
      products,
      totalAmount,
    };
    navigate("/checkout", { state: { orderData } });
  };

  const handleReview = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex gap-10 my-20 xl:justify-between max-xl:flex-col">
      {/* img section */}
      <div className="flex flex-col gap-4 xl:flex-row-reverse">
        {/* Main Image */}
        <div className="flex items-center justify-center bg-[#F5F5F5] h-[37.5rem] min-[527px]:w-[31.25rem] rounded-lg overflow-hidden">
          <img
            src={selectedImg}
            loading="lazy"
            decoding="async"
            className="duration-500 hover:scale-125 image-bg-remove"
            alt={title}
          />
        </div>

        {/* Sub Images */}
        <div className="space-y-2 max-xl:flex max-xl:space-x-2 max-xl:flex-wrap">
          {imgUrls.map((img, index) => (
            <div
              key={index}
              className={`p-4 rounded bg-[#F5F5F5] cursor-pointer max-xl:w-48 ${
                img === selectedImg ? "border-4 border-neutral" : ""
              }`}
              onClick={() => setSelectedImg(img)}
            >
              <img
                src={img}
                decoding="async"
                loading="lazy"
                className="w-[121px] h-[97px] image-bg-remove"
                alt={title}
              />
            </div>
          ))}
        </div>
      </div>

      {/* info section */}
      <div>
        <div className="xl:w-[373px]">
          <p className="text-2xl font-bold">{title}</p>
          <div className="mt-2 text-gray-400">
            <span onClick={() => setOpenModal(true)}>
              <Rating rating={rating} />
            </span>
            <span> ({userId.length} reviews)</span>
            <span> | </span>
            {status === "discontinued" ? (
              <span className="text-sm text-gray-500">Discontinued</span>
            ) : (
              <span
                className={`tracking-wider ${
                  stock > 0 ? "text-green-500" : "text-rose-500 font-semibold"
                }`}
              >
                {stock > 0 ? "In Stock" : "Sold Out"}
              </span>
            )}
          </div>
          <div className="flex gap-8 mt-2">
            <p className="text-2xl font-semibold ">
              ${salePrice > 0 ? salePrice : price}
            </p>
            {salePrice > 0 && (
              <span className="text-2xl line-through text-slate-400">
                ${price}
              </span>
            )}
          </div>
          <p className="mt-10 font-mono font-semibold">{description}</p>
          <hr className="mt-6 border-zinc-300" />

          {/* buy section  */}
          {stock > 0 && status == "continued" && (
            <div className="flex items-center max-[410px]:flex-wrap gap-4 mt-10">
              <div className="flex items-center justify-between border-[1px] w-[159px] h-[44px] rounded">
                <span
                  onClick={decCounter}
                  className="flex items-center justify-center w-[41px] h-full cursor-pointer"
                >
                  <HiOutlineMinus size={25} />
                </span>
                <span className="border-x-[1px] p-2 text-center w-[80px]">
                  {counter}
                </span>
                <span
                  onClick={incCounter}
                  className="bg-rose-500 rounded-r text-white flex items-center justify-center w-[41px] h-full cursor-pointer hover:bg-rose-600 duration-500"
                >
                  <HiOutlinePlus size={25} />
                </span>
              </div>
              <button
                onClick={handleNavigateToCheckout}
                className="text-white btn bg-rose-500 w-[159px] hover:bg-rose-600 duration-500"
              >
                Buy Now
              </button>
              <p className="bg-[#f5f5f5] border-[1px] border-black h-[44px] p-2 cursor-pointer">
                <HiOutlineHeart
                  onClick={() => handleToggleWishlist(_id, isWishlist)}
                  size={25}
                  className={`${
                    isWishlist ? "fill-red-500/90 stroke-none" : ""
                  }`}
                />
              </p>
            </div>
          )}

          <div className="border-[1px] border-black mt-8">
            <div className="flex items-center gap-2 p-6">
              <TbTruckDelivery size={40} />
              <p className="font-bold">
                Free Deliver
                <span className="block mt-1 text-xs underline">
                  Enter your postal code for Delivery Availability
                </span>
              </p>
            </div>
            <hr />
            <div className="flex items-center gap-2 p-6">
              <HiOutlineArrowPath size={40} />
              <p className="font-bold">
                Return Delivery
                <span className="block mt-1 text-xs">
                  Free 30 Days Delivery Returns.
                  <span className="underline">Details</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {openModal && <ReviewModal confirm={handleReview} productId={_id} />}
    </div>
  );
};
export default Product;
