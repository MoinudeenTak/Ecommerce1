import { useState } from 'react';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";

const Dashboard = () => {
    const [stats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0
    });

    const [filters, setFilters] = useState({
        category: 'all',
        dateRange: '7days',
        status: 'all'
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Home Button */}
            <Link
                to="/"
                className="fixed top-6 left-6 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition duration-200 z-10"
                title="Go Home"
            >
                <AiFillHome size={24} />
            </Link>

            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back! Here's your business overview</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="home">Home & Garden</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="7days">Last 7 Days</option>
                                <option value="30days">Last 30 Days</option>
                                <option value="90days">Last 90 Days</option>
                                <option value="1year">Last Year</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-blue-500">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-green-500">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Orders</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-purple-500">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Revenue</h3>
                        <p className="text-3xl font-bold text-gray-900"><FaRupeeSign />{stats.totalRevenue}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-l-4 border-orange-500">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Order ID</th>
                                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Customer</th>
                                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Amount</th>
                                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-600">-</td>
                                    <td className="py-2 px-4 text-gray-600">-</td>
                                    <td className="py-2 px-4 text-gray-600">-</td>
                                    <td className="py-2 px-4 text-gray-600">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center font-semibold text-gray-700 hover:shadow-md transition">Product 1</div>
                        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-4 text-center font-semibold text-gray-700 hover:shadow-md transition">Product 2</div>
                        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center font-semibold text-gray-700 hover:shadow-md transition">Product 3</div>
                        <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center font-semibold text-gray-700 hover:shadow-md transition">Product 4</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
