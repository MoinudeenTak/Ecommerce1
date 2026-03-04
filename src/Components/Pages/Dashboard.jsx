import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/ContextApi";
import { FaRupeeSign } from "react-icons/fa";

const Dashboard = () => {
  const { isAuthenticated, currentUser, orders } = useCart();
  const navigate = useNavigate();

  // // 🔒 Protect Admin Route
  // useEffect(() => {
  //   if (!isAuthenticated || currentUser?.role !== "admin") {
  //     navigate("/", { replace: true });
  //   }
  // }, [isAuthenticated, currentUser, navigate]);

  // 📊 Calculate Stats
  const totalOrders = orders?.length || 0;

  const totalRevenue = useMemo(() => {
    return (
      orders?.reduce(
        (acc, order) =>
          acc +
          order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        0
      ) || 0
    );
  }, [orders]);

  const totalProductsSold = useMemo(() => {
    return (
      orders?.reduce(
        (acc, order) =>
          acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
        0
      ) || 0
    );
  }, [orders]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Owner Dashboard</h1>
        <p className="text-gray-500">Monitor all orders and revenue</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard
          title="Total Revenue"
          value={
            <span className="flex items-center gap-1">
              <FaRupeeSign /> {totalRevenue}
            </span>
          }
        />
        <StatCard title="Products Sold" value={totalProductsSold} />
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">All Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-3">#</th>
                <th className="text-left py-3">Customer</th>
                <th className="text-left py-3">Items</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders?.map((order, index) => {
                  const orderTotal = order.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  );

                  return (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3">{index + 1}</td>
                      <td>{order.customerName}</td>
                      <td>{order.items.length} items</td>
                      <td>₹{orderTotal}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 📦 Reusable Stat Card
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;
