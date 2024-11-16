import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthString } from "../../../lib/constants/constants";

const RevenueChart = ({ last12MonthsRevenue }) => {
  const last12MonthsRevenueData = last12MonthsRevenue.map((item) => ({
    month: `${monthString[item.month - 1]} ${item.year}`,
    revenue: item.totalMonthlyRevenue,
    orders: item.totalOrders,
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={last12MonthsRevenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default RevenueChart;
