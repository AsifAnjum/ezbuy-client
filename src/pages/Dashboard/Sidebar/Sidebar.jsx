import { Link } from "react-router-dom";

import { IoMdExit } from "react-icons/io";

import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";

import { dashboard } from "../../../lib/constants/constants";
import { useLocation } from "react-router-dom";
import useIsStaff from "../../../hooks/useIsStaff";

const Sidebar = () => {
  const dispatch = useDispatch();

  const isStaff = useIsStaff();

  const location = useLocation();

  const logout = () => {
    dispatch(userLoggedOut());
  };

  const dashboardList = dashboard
    .filter((item) => item.isStaff === isStaff || item.isStaff == undefined)
    .map((item) => (
      <li
        key={item.id}
        className={`group hover:bg-slate-300 hover:rounded-full hover:p-0.5 ${
          location.pathname === item.url
            ? "bg-slate-300 rounded-full p-0.5"
            : ""
        }`}
      >
        <Link className="text-xl font-bold text-slate-600" to={item.url}>
          {item.img} {item.title}
        </Link>
      </li>
    ));

  return (
    <ul className="min-h-full mt-6 space-y-3 menu ">
      {/* Sidebar content here */}
      {dashboardList}

      <li>
        <p className="text-xl font-bold text-slate-600" onClick={logout}>
          <IoMdExit size={27} fill="black" />
          Logout
        </p>
      </li>
    </ul>
  );
};
export default Sidebar;
