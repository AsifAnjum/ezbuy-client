import slideImg1 from "../../assets/carousel/iphone hero.png";
import ps5Img from "../../assets/product/ps5-slim-goedkope-playstation_large 1.png";
import attrWomenImg from "../../assets/product/attrWomen.png";
import speakerImg from "../../assets/product/Frame 707.png";
import perfumeImg from "../../assets/product/Frame 706.png";

import {
  PiAppleLogoLight,
  PiCirclesThreePlusLight,
  PiGameControllerThin,
  PiHeadphonesThin,
} from "react-icons/pi";

import {
  IoBagAddSharp,
  IoBookOutline,
  IoHardwareChipOutline,
  IoSettingsSharp,
  IoShirtOutline,
} from "react-icons/io5";
import { FaKitchenSet, FaMessage } from "react-icons/fa6";
import { TbHorseToy, TbLayoutDashboardFilled } from "react-icons/tb";
import {
  FaCalendarPlus,
  FaHeart,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";

export const navOptions = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Shop",
    url: "/shop",
  },
  {
    id: 3,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 4,
    title: "Signup",
    url: "/signup",
    isLoggedIn: false,
  },
  {
    id: 5,
    title: "Dashboard",
    url: "/dashboard",
    isLoggedIn: true,
  },
];

export const slide = [
  {
    id: 1,
    img: slideImg1,
    title: (
      <>
        <PiAppleLogoLight size={40} /> iPhone 14 Series
      </>
    ),
    offer: "Up to 10% off Voucher",
    url: "/",
  },
  {
    id: 2,
    img: slideImg1,
    title: (
      <>
        <PiAppleLogoLight size={40} /> iPhone 15 Series
      </>
    ),
    offer: "Up to 10% off Voucher",
    url: "/",
  },
  {
    id: 3,
    img: slideImg1,
    title: (
      <>
        <PiAppleLogoLight size={40} /> iPhone 16 Series
      </>
    ),
    offer: "Up to 10% off Voucher",
    url: "/",
  },
  {
    id: 4,
    img: slideImg1,
    title: (
      <>
        <PiAppleLogoLight size={40} /> iPhone 17 Series
      </>
    ),
    offer: "Up to 10% off Voucher",
    url: "/",
  },
  {
    id: 5,
    img: slideImg1,
    title: (
      <>
        <PiAppleLogoLight size={40} /> iPhone 18 Series
      </>
    ),
    offer: "Up to 10% off Voucher",
    url: "/",
  },
];

export const tags = [
  {
    id: 1,
    title: "Women's Fashion",
    url: "/shop?tags=women's cloth",
  },
  {
    id: 2,
    title: "Men's Fashion",
    url: "/shop?tags=man's cloth",
  },
  {
    id: 3,
    title: "Electronics",
    url: "/shop?tags=electronics",
  },
  {
    id: 4,
    title: "Home & Kitchen",
    url: "/shop?tags=home,kitchen",
  },
  {
    id: 5,
    title: "Baby's & Toys",
    url: "/shop?tags=toy,toys,baby,babies",
  },
  {
    id: 6,
    title: "Sports & Outdoors",
    url: "/shop?tags=sports,outdoors",
  },
  {
    id: 7,
    title: "Books",
    url: "/shop?tags=books",
  },
  {
    id: 8,
    title: "Grocery",
    url: "/shop?tags=grocery",
  },
  {
    id: 9,
    title: "Health & Beauty",
    url: "/shop?tags=makeup,beauty,health",
  },
];

export const categories = [
  {
    id: 1,
    title: "Electronics",
    url: "/shop?category=Electronics",
    img: <IoHardwareChipOutline style={{ strokeWidth: 0.5 }} size={56} />,
  },
  {
    id: 2,
    title: "Books",
    url: "/shop?category=Books",
    img: <IoBookOutline size={56} />,
  },
  {
    id: 3,
    title: "Kitchen",
    url: "/shop?category=Kitchen",
    img: <FaKitchenSet size={56} />,
  },
  {
    id: 4,
    title: "Toys",
    url: "/shop?category=Toys",
    img: <TbHorseToy strokeWidth={0.6} size={56} />,
  },
  {
    id: 5,
    title: "Sports",
    url: "/",
    img: <PiHeadphonesThin size={56} />,
  },
  {
    id: 6,
    title: "Gaming",
    url: "/shop?category=Gaming",
    img: <PiGameControllerThin size={56} />,
  },
  {
    id: 7,
    title: "Cloths",
    url: "/shop?category=Clothing",
    img: <IoShirtOutline size={56} />,
  },
  {
    id: 8,
    title: "Others",
    url: "/shop?category=Others",
    img: <PiCirclesThreePlusLight size={56} />,
  },
];

export const newArrival = [
  {
    id: 1,
    title: "Playstation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    img: ps5Img,
    ur: "/",
  },
  {
    id: 2,
    title: "Women’s Collections",
    description: "Featured woman collections that give you another vibe.",
    img: attrWomenImg,
    ur: "/",
  },
  {
    id: 3,
    title: "Speakers",
    description: "Amazon wireless speakers",
    img: speakerImg,
    ur: "/",
  },
  {
    id: 4,
    title: "Perfume",
    description: "GUCCI INTENSE OUD EDP",
    img: perfumeImg,
    ur: "/",
  },
];

export const dashboard = [
  {
    id: 1,
    title: "Dashboard",
    img: <TbLayoutDashboardFilled size={27} />,
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Profile",
    img: <FaUser size={27} />,
    url: "/dashboard/profile",
  },
  {
    id: 3,
    title: "My Cart",
    img: <FaShoppingCart size={27} />,
    url: "/cart",
    isStaff: false,
  },
  {
    id: 4,
    title: "My Order",
    img: <FaShoppingBag size={27} />,
    url: "/dashboard/my-order",
    isStaff: false,
  },
  {
    id: 5,
    title: "My Wishlist",
    img: <FaHeart className="group-hover:animate-heart" size={27} />,
    url: "/wishlist",
    isStaff: false,
  },
  {
    id: 6,
    title: "Add Products",
    img: <IoBagAddSharp size={27} />,
    url: "/dashboard/add-product",
    isStaff: true,
  },
  {
    id: 7,
    title: "Manage Products",
    img: (
      <IoSettingsSharp
        size={27}
        className="group-hover:animate-spin-one-time"
      />
    ),
    url: "/dashboard/manage-products",
    isStaff: true,
  },
  {
    id: 8,
    title: "Manage Users",
    img: <FaUserCog size={27} />,
    url: "/dashboard/manage-users",
    isStaff: true,
  },
  {
    id: 9,
    title: "Manage Orders",
    img: <FaShoppingBag size={27} />,
    url: "/dashboard/manage-orders",
    isStaff: true,
  },
  {
    id: 10,
    title: "Add Coupon",
    img: <FaCalendarPlus size={27} />,
    url: "/dashboard/add-coupon",
    isStaff: true,
  },
  {
    id: 11,
    title: "Manage Coupons",
    img: <HiTicket size={27} className="group-hover:animate-spin-one-time" />,
    url: "/dashboard/manage-coupons",
    isStaff: true,
  },
  {
    id: 12,
    title: "Support",
    img: <FaMessage size={27} className="group-hover:animate-tada" />,
    url: "/dashboard/support-messages",
    isStaff: true,
  },
];

export const monthString = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
