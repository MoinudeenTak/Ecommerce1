import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/ContextApi";
import {
  FaSignInAlt,
  FaRupeeSign,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";
import RevenueChart from "../Charts/RevenueCharts";

const Dashboard = () => {
  const { currentUser, orders, logout, dispatch } = useCart();
  const navigate = useNavigate();

  /* ADMIN PROTECTION */
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== "admin") return null;

  /* STATS */

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
          acc +
          order.items.reduce((sum, item) => sum + item.quantity, 0),
        0
      ) || 0
    );
  }, [orders]);

  /* LOGOUT */

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Owner Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor orders and store performance
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
          >
            <FaSignInAlt /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<FaShoppingCart />}
          />

          <StatCard
            title="Total Revenue"
            value={
              <span className="flex items-center gap-1">
                <FaRupeeSign /> {totalRevenue}
              </span>
            }
            icon={<FaRupeeSign />}
          />

          <StatCard
            title="Products Sold"
            value={totalProductsSold}
            icon={<FaBox />}
          />
        </div>

        {/* REVENUE CHART */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Revenue Overview
          </h2>

          <RevenueChart orders={orders} />
        </div>

        {/* ORDERS TABLE */}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500 text-left">
                  <th className="py-3">#</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
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
                  orders.map((order, index) => {
                    const orderTotal = order.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    );

                    return (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="py-4">{index + 1}</td>

                        <td className="font-medium text-gray-700">
                          {order.customerName ||
                            order.customerEmail ||
                            "Guest"}
                        </td>

                        <td>{order.items.length} items</td>

                        <td className="font-semibold text-gray-800">
                          ₹{orderTotal}
                        </td>

                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              dispatch({
                                type: "UPDATE_ORDER_STATUS",
                                payload: {
                                  id: order.id,
                                  status: e.target.value,
                                },
                              })
                            }
                            className="border px-2 py-1 rounded"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
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
    </div>
  );
};

/* STAT CARD COMPONENT */

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>

      <div className="text-blue-600 text-2xl bg-blue-50 p-3 rounded-lg">
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;