import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import { useUserDashboardAnalyticsQuery } from "../../../redux/features/user/userApi";
import OrderSummery from "./OrderSummery";
import UserDetails from "./UserDetails";
import UserOrder from "./UserOrder";

const UserHome = () => {
  const { data, isLoading, isError, error } = useUserDashboardAnalyticsQuery();

  if (isLoading) return <ComponentLoader />;

  if (isError) {
    if (error?.status === 403)
      return <ItemNotFound message="Forbidden Access" />;

    return <ItemNotFound />;
  }

  if (Object.keys(data.data).length === 0)
    return <ItemNotFound message="No Data Found" />;

  const { user, order } = data?.data || {};

  const totalOrders = order?.totalOrders || 0;
  const orders = order?.orderInfo || [];
  const overAllTotalItems = order?.overAllTotalItems || 0;

  return (
    <div>
      <div className="container p-4 mx-auto space-y-8">
        <UserDetails user={user} totalOrders={totalOrders} />

        {/* order summery */}
        <OrderSummery
          totalOrders={totalOrders}
          totalItems={overAllTotalItems}
          totalPaidAmount={order?.totalPaidAmount || 0}
          totalDiscount={order?.totalDiscount || 0}
        />
      </div>

      <div className="bg-white ">
        {/* Statistics Section */}

        {/* Orders Table */}
        <UserOrder orders={orders} totalOrders={totalOrders} />
      </div>
    </div>
  );
};
export default UserHome;
