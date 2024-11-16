import { useLocation, Link } from "react-router-dom";
import { FaHome, FaShoppingBag, FaUserCog } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { HiTicket } from "react-icons/hi2";

const DashboardBreadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderBreadcrumbs = () => {
    if (path.includes("/edit-product")) {
      return (
        <li>
          <IoSettingsSharp />
          <Link to="/dashboard/manage-products" className="ml-1">
            Manage Products
          </Link>
        </li>
      );
    } else if (path.includes("/user")) {
      return (
        <li>
          <FaUserCog />
          <Link to="/dashboard/manage-users" className="ml-1">
            Manage Users
          </Link>
        </li>
      );
    } else if (path.includes("/support-message/")) {
      return (
        <li>
          <FaMessage />
          <Link to="/dashboard/support-messages" className="ml-1">
            Support Messages
          </Link>
        </li>
      );
    } else if (path.includes("/order")) {
      return (
        <li>
          <FaShoppingBag />
          <Link to="/dashboard/manage-orders" className="ml-1">
            Mange Orders
          </Link>
        </li>
      );
    } else if (path.includes("/coupon")) {
      return (
        <li>
          <HiTicket />
          <Link to="/dashboard/manage-coupons" className="ml-1">
            Mange Coupons
          </Link>
        </li>
      );
    }
  };
  return (
    <div className="mb-4 text-sm breadcrumbs">
      <ul className="text-slate-500">
        <li>
          <FaHome />
          <Link to="/dashboard" className="ml-1">
            Dashboard
          </Link>
        </li>

        {renderBreadcrumbs()}
      </ul>
    </div>
  );
};
export default DashboardBreadcrumbs;
