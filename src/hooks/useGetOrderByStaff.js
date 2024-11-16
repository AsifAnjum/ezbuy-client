import { useGetOrdersByStaffQuery } from "../redux/features/order/orderApi";

const useGetOrderByStaff = (query) => {
  const { data, isLoading, isError, error } = useGetOrdersByStaffQuery(query, {
    skip: !query,
  });

  const orders = data?.data?.order || [];
  const total = orders.length;
  const totalPage = data?.data?.page || 0;

  return { orders, total, totalPage, isLoading, isError, error };
};
export default useGetOrderByStaff;
