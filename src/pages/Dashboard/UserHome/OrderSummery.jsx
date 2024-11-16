import { FaDollarSign, FaShoppingBag, FaTag } from "react-icons/fa";

const OrderSummery = ({
  totalOrders,
  totalItems,
  totalPaidAmount,
  totalDiscount,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="px-6 py-4 text-white bg-gray-800 rounded-t-lg">
        <h2 className="text-xl font-semibold">Order Summery</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-2">
        {/* Full Name */}
        <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
          <div className="flex flex-row items-center justify-between p-4">
            <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
            <FaShoppingBag className="w-4 h-4 text-gray-400" />
          </div>
          <div className="p-4 pt-0">
            <p className="text-2xl font-bold">{totalOrders}</p>
            <p className="text-xs text-gray-500">total Items: {totalItems}</p>
          </div>
        </div>

        <div className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
          <div className="p-4">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Financial Summary
              </h3>
              <FaDollarSign className="w-4 h-4 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p
                  className={`text-2xl font-bold ${
                    totalDiscount > 0
                      ? ""
                      : totalPaidAmount > 0
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  ${totalPaidAmount.toFixed(2)}
                </p>
                <p className="flex items-center mt-1 text-xs text-gray-500">
                  <FaDollarSign className="w-3 h-3 mr-1" />
                  Total Paid
                </p>
              </div>
              <div>
                <p
                  className={`text-2xl font-bold ${
                    totalDiscount > 0 ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  ${totalDiscount.toFixed(2)}
                </p>
                <p className="flex items-center mt-1 text-xs text-gray-500">
                  <FaTag className="w-3 h-3 mr-1" />
                  Total Discount
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummery;
