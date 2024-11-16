import { Link, useLocation } from "react-router-dom";
import { navOptions } from "../../../lib/constants/constants";
import { CiLogout } from "react-icons/ci";

import { GrCart, GrUser } from "react-icons/gr";

import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import useGetCart from "../../../hooks/useGetCart";
import { useSelector } from "react-redux";
import { HiOutlineHeart } from "react-icons/hi2";
import Search from "./Search";
import { PiShoppingBagOpen } from "react-icons/pi";

const Navbar = () => {
  const location = useLocation();

  const isLoggedIn = useAuth();
  const { cart } = useGetCart() || {};
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
  };

  const navbarOptions = navOptions
    .filter(
      (item) => item.isLoggedIn === undefined || item.isLoggedIn === isLoggedIn
    )
    .map((item) => (
      <li
        className={`text-lg font-semibold duration-1000 ${
          location.pathname == item.url
            ? "border-b rounded-none border-slate-900"
            : ""
        }`}
        key={item.id}
      >
        <Link
          className="transition-colors hover:text-slate-600 focus:text-slate-600 hover:bg-transparent focus:!bg-transparent active:!bg-transparent"
          to={item.url}
        >
          {item.title}
        </Link>
      </li>
    ));
  return (
    <header className="">
      <div className=" lg:py-6 md:py-4 navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navbarOptions}
            </ul>
          </div>
          <Link to="/" className="text-3xl lg:text-4xl">
            𝓔𝓩𝓑𝓤𝓨
          </Link>
        </div>
        <div className="hidden mr-16 navbar-start xl:flex">
          <ul className="px-1 menu menu-horizontal">{navbarOptions}</ul>
        </div>
        <div className="gap-6 max-sm:gap-3 navbar-end">
          {/* product search */}
          <Search />
          <Link to="/wishlist" className="indicator max-[350px]:hidden">
            <span className="text-white p-[0.1rem] !rounded-full indicator-item badge badge-error">
              {wishlist.length || 0}
            </span>
            <HiOutlineHeart
              size={38}
              className={`${
                wishlist.length ? "fill-red-500/80 stroke-none" : ""
              }`}
            />
          </Link>
          <Link to="/cart" className="indicator">
            <span className="text-white p-[0.1rem] rounded-full indicator-item badge badge-error w-4">
              {cart.totalQuantity || 0}
            </span>
            <GrCart size={30} />
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-white btn bg-gradient-to-r from-red-500 to-fuchsia-700"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end dropdown-hover group">
              <div role="button">
                <GrUser
                  size={40}
                  className="p-1 group-hover:text-white group-hover:rounded-full group-hover:bg-red-500"
                />
              </div>

              <ul className="dropdown-content menu bg-gradient-to-tr from-[#c4b0c7] via-slate-400/75 to-slate-400 from-10% rounded-box z-[1] w-52 p-2 text-white ">
                <li>
                  <Link to="/dashboard/profile">
                    <GrUser size={20} />
                    Manage My Account
                  </Link>
                </li>
                {user.role == "user" && (
                  <li>
                    <Link to="/dashboard/my-order">
                      <PiShoppingBagOpen size={20} />
                      My Order
                    </Link>
                  </li>
                )}

                <li onClick={logout}>
                  <Link>
                    <CiLogout size={20} />
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr className="w-screen -mx-[calc((100vw-100%)/2)] border-zinc-400" />
    </header>
  );
};
export default Navbar;
