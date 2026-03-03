import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaRupeeSign, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { useCart } from "../Store/ContextApi";

const Dashboard = () => {
  const { logout, isAuthenticated, currentUser } = useCart();
  const navigate = useNavigate();

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Stats (can fetch from backend later)
  const [stats] = useState({
    totalProducts: 24,
    totalOrders: 18,
    totalRevenue: 76000,
    totalUsers: 12,
  });

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Home Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition z-10"
      >
        <AiFillHome size={20} />
      </Link>

      {/* Safe rendering: show loading until currentUser is ready */}
      {!currentUser ? (
        <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
          Loading user data...
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-white shadow-md border-b">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

              {/* Left: User info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome, {currentUser.name} 👋
                </h1>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
              </div>

              {/* Right: Role + logout */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUserCircle size={28} />
                  <span className="text-sm font-medium capitalize">
                    {currentUser.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
                >
                  <FaSignInAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="max-w-7xl mx-auto px-6 py-10">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard title="Total Products" value={stats.totalProducts} />
              <StatCard title="Total Orders" value={stats.totalOrders} />
              <StatCard
                title="Total Revenue"
                value={
                  <span className="flex items-center gap-1">
                    <FaRupeeSign /> {stats.totalRevenue}
                  </span>
                }
              />

              {/* Admin-only */}
              {currentUser.role === "admin" && (
                <StatCard title="Total Users" value={stats.totalUsers} />
              )}
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Orders
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-3">Order ID</th>
                      <th className="text-left py-3">Customer</th>
                      <th className="text-left py-3">Amount</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3">#1023</td>
                      <td>John Doe</td>
                      <td>₹5000</td>
                      <td>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TOP PRODUCTS */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Top Products
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <ProductCard name="Product 1" />
                <ProductCard name="Product 2" />
                <ProductCard name="Product 3" />
                <ProductCard name="Product 4" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 border-l-4 border-blue-500">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

// Product Card Component
const ProductCard = ({ name }) => (
  <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-5 text-center font-semibold text-gray-700 hover:shadow-lg transition">
    {name}
  </div>
);

export default Dashboard;