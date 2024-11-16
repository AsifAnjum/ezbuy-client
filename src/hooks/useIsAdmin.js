import { useSelector } from "react-redux";

const useIsAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.role === "admin";
};
export default useIsAdmin;
