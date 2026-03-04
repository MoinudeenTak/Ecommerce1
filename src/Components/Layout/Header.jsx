import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Store/ContextApi";
import {
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";

const Header = ({ onSearch, onCategoryChange }) => {
  const { cartItems, logout, isAuthenticated, currentUser } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const totalCartItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* Top Row */}
        <div className="flex items-center justify-between gap-4 mb-3">

          <Link to="/">
            <h1 className="text-2xl font-bold text-blue-600">
              EcommercePro
            </h1>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search products..."
                className="bg-transparent flex-1 outline-none text-sm"
              />
              <FaSearch className="text-gray-500" />
            </div>
          </div>

          {/* User Info */}
          {isAuthenticated && currentUser && (
            <div className="text-right hidden md:block">
              <h1 className="text-lg font-semibold text-gray-800">
                {currentUser.name}
              </h1>
              <p className="text-gray-500 text-xs">
                {currentUser.email}
              </p>
            </div>
          )}

          {/* Cart + Auth */}
          <div className="flex items-center gap-4">
            <Link to="/Cart">
              <div className="relative text-gray-700 hover:text-blue-600 text-xl cursor-pointer">
                <FaShoppingCart />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-semibold"
              >
                <FaSignInAlt /> Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm font-semibold">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-6 text-sm font-medium text-gray-700">
          {["all", "electronics", "fashion", "home", "books"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="hover:text-blue-600 capitalize"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;