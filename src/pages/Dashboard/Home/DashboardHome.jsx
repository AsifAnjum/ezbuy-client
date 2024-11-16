import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";

import useIsStaff from "../../../hooks/useIsStaff";

const DashboardHome = () => {
  const isStaff = useIsStaff();
  return isStaff ? <AdminHome /> : <UserHome />;
};
export default DashboardHome;
