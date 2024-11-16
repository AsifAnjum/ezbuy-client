import { FaChartLine, FaShoppingBag, FaUsers } from "react-icons/fa";

const Header = ({
  totalUsers,
  activeUsersLast30Days,
  totalProducts,
  totalOrders,
  totalRevenue,
  revenuePercentageChange,
  monthlyAverageRevenue,
}) => {
  const isRevenueIncreased = revenuePercentageChange > 0;
  const isRevenueDecreased = revenuePercentageChange < 0;

  const revenuePercentageChangeClass =
    revenuePercentageChange > 0
      ? " text-green-500"
      : revenuePercentageChange < 0
      ? " text-red-500"
      : " text-gray-500";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center justify-between p-4">
          <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
          <FaUsers className="w-4 h-4 text-gray-400" />
        </div>
        <div className="p-4 pt-0">
          <p className="text-2xl font-bold">{totalUsers}</p>
          <p className="text-xs text-gray-500">
            {activeUsersLast30Days} active in last 30 days
          </p>
          <div className="w-full h-2 mt-4 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-full transition-all duration-500 ease-in-out bg-blue-500"
              style={{
                width: `${(activeUsersLast30Days / totalUsers) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center justify-between p-4">
          <h3 className="text-sm font-medium text-gray-600">
            Products & Orders
          </h3>
          <FaShoppingBag className="w-4 h-4 text-gray-400" />
        </div>
        <div className="p-4 pt-0">
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-gray-500">Total Products</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
          </div>
          <div className="flex w-full h-2 mt-4 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-full transition-all duration-500 ease-in-out bg-blue-500"
              style={{
                width: `${
                  (totalProducts / (totalProducts + totalOrders)) * 100
                }%`,
              }}
            />
            <div
              className="h-full transition-all duration-500 ease-in-out bg-purple-500"
              style={{
                width: `${
                  (totalOrders / (totalProducts + totalOrders)) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
        <div className="flex flex-row items-center justify-between p-4">
          <h3 className="text-sm font-medium text-gray-600">
            Revenue Overview
          </h3>
          <FaChartLine className="w-4 h-4 text-gray-400" />
        </div>
        <div className="p-4 pt-0">
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <div className={`text-sm ${revenuePercentageChangeClass}`}>
              {isRevenueIncreased ? "↑" : isRevenueDecreased ? "↓" : ""} $
              {Math.abs(revenuePercentageChange)}%
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Monthly Avg: ${monthlyAverageRevenue.toFixed(2)}
          </p>
          <div className="w-full h-2 mt-4 overflow-hidden bg-gray-200 rounded-full">
            <div
              className={`h-full transition-all duration-500 ease-in-out ${
                isRevenueIncreased
                  ? "bg-green-500"
                  : isRevenueDecreased
                  ? "bg-red-500"
                  : ""
              }`}
              style={{
                width: `${Math.abs(revenuePercentageChange)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
