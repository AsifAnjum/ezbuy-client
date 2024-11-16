import { useDashboardAnalyticsQuery } from "../../../redux/features/dashboard/dashboardApi";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import Header from "./Header";
import RevenueChart from "./RevenueChart";
import CategorySaleChart from "./CategorySaleChart";
import NewUserChart from "./NewUserChart";
import OrderStatusChart from "./OrderStatusChart";
import Top5SellingProducts from "./Top5SellingProducts";
import Top5ViewedProducts from "./Top5ViewedProducts";

const AdminHome = () => {
  const { data, isLoading, isError } = useDashboardAnalyticsQuery();

  if (isLoading) return <ComponentLoader />;
  if (isError) return <ItemNotFound />;

  if (data?.data?.length == 0)
    return <ItemNotFound message="Something Went Wrong" />;

  const { user, order, product } = data?.data || [];

  const totalUsers = user.totalUsers;
  const activeUsersLast30Days = user.activeUsersLast30Days;
  const totalProducts = product.totalProducts;
  const totalOrders = order.totalOrders;
  const totalRevenue = order.totalRevenue;
  const monthlyAverageRevenue = order.monthlyAverageRevenue;

  const revenuePercentageChange =
    order.last12MonthsRevenue.length > 1
      ? (
          ((order.last12MonthsRevenue[0].totalMonthlyRevenue -
            order.last12MonthsRevenue[1].totalMonthlyRevenue) /
            order.last12MonthsRevenue[1].totalMonthlyRevenue) *
          100
        ).toFixed(2)
      : 0;

  return (
    <div className="p-6 space-y-6">
      <Header
        totalUsers={totalUsers}
        activeUsersLast30Days={activeUsersLast30Days}
        totalProducts={totalProducts}
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        revenuePercentageChange={revenuePercentageChange}
        monthlyAverageRevenue={monthlyAverageRevenue}
      />

      {/* Last 12 Months Revenue Line Chart */}
      <div className="p-6 shadow-xl card bg-base-100">
        <h3 className="text-xl font-semibold">Last 12 Months Revenue</h3>
        <RevenueChart last12MonthsRevenue={order.last12MonthsRevenue} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Top 5 category Pie Chart */}
        <div className="p-6 shadow-xl card bg-base-100">
          <h3 className="text-xl font-semibold">
            Top 5 Category Sale Breakdown
          </h3>
          <CategorySaleChart top5Category={product.top5CategorySales} />
        </div>

        {/* Order Status Breakdown Pie Chart */}
        <div className="relative p-6 shadow-xl card bg-base-100">
          <h3 className="text-xl font-semibold">Order Status Breakdown</h3>

          <div className="mt-24">
            <OrderStatusChart
              orderStatusBreakdown={order.orderStatusBreakdown}
            />
          </div>
        </div>
      </div>

      {/* New Users Last 12 Months Bar Chart */}
      <div className="p-6 shadow-xl card bg-base-100">
        <h3 className="text-xl font-semibold">New Users Last 12 Months</h3>

        <NewUserChart newUsersLast12Months={user.newUsersLast12Months} />
      </div>

      {/* top 5 selling products */}

      <div className="p-6 shadow-xl card bg-base-100">
        <h3 className="font-serif text-xl font-semibold">
          Top 5 Sold Products
        </h3>
        <ul className="space-y-3">
          {product.topSellingProducts.map((product, index) => (
            <Top5SellingProducts
              key={product._id}
              index={index + 1}
              title={product.title}
              sold={product.sold}
            />
          ))}
        </ul>
      </div>

      {/* top 5 viewed products */}
      <div className="p-6 shadow-xl card bg-base-100">
        <h3 className="font-serif text-xl font-semibold">
          Top 5 Viewed Products
        </h3>
        <ul className="space-y-3">
          {product.highestViews.map((product, index) => (
            <Top5ViewedProducts
              key={product._id}
              index={index + 1}
              title={product.title}
              views={product.views}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminHome;
