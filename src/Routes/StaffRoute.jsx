import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StaffRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  if (user && (user.role === "admin" || user.role === "moderator")) {
    return children;
  }

  return <Navigate to="*" state={{ from: location }} replace></Navigate>;
};
export default StaffRoute;
