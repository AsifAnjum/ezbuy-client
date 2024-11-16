import { Outlet, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";

import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import DashboardBreadcrumbs from "./DashboardBreadcrumbs";

const Dashboard = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <div className="">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col drawer-content">
          {/* Navbar */}
          <div className="w-full shadow-lg navbar bg-base-100">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 p-6 mx-2">
              <Link to="/" className="text-3xl lg:text-4xl">
                𝓔𝓩𝓑𝓤𝓨
              </Link>
            </div>
          </div>

          {/* Page content here */}
          <div className="p-14 max-lg:px-2 max-lg:py-6">
            {/* Breadcrumbs */}
            <DashboardBreadcrumbs />
            {/* Page content */}
            <Outlet />
          </div>
        </div>
        <div className="shadow-lg max-lg:drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="min-h-screen bg-base-100">
            <p className="px-6 text-4xl italic font-bold text-transparent py-9 bg-gradient-to-r from-pink-400 via-red-500 to-pink-500 bg-clip-text">
              𝔇𝔞𝔰𝔥𝔟𝔬𝔞𝔯𝔡
            </p>
            <Sidebar logout={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
