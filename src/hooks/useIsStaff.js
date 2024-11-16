import { useSelector } from "react-redux";

const useIsStaff = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return false;
  return ["moderator", "admin"].includes(user?.role);
};
export default useIsStaff;
