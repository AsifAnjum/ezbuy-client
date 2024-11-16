import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OrderStatusChart = ({ orderStatusBreakdown }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={orderStatusBreakdown}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="status" type="category" />
        <Tooltip />

        <Legend />

        <Bar
          dataKey="count"
          barSize={20}
          fill="#3FA7D6"
          label={{ position: "right" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default OrderStatusChart;
