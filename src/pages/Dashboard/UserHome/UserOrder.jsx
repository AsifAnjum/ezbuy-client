import { dateString, statusColor } from "../../../lib/helperFunction";

const UserOrder = ({ totalOrders, orders }) => {
  return (
    <div className="p-6 mt-6 rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-700">
        Recent Orders
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Total Items</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {totalOrders > 0 &&
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-4 py-2 border">{order.orderId}</td>
                  <td className="px-4 py-2 border">
                    {dateString(order.orderDate)}
                  </td>
                  <td className="px-4 py-2 border">{order.totalItems}</td>
                  <td className="px-4 py-2 border">${order.totalAmount}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`text-sm px-3 py-1 rounded-lg ${statusColor(
                        order.deliveryStatus
                      )}`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserOrder;
