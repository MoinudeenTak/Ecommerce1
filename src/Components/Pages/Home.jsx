import { Link } from "react-router-dom";
import { useCart } from "../Store/ContextApi";
import {
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import Products from "./Products";
const Home = () => {
  const { cartItems, logout, isAuthenticated,} = useCart();

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 mb-3">
           <Link to='/'> <h1 className="text-2xl font-bold text-blue-600">EcommercePro</h1></Link>
            <div className="flex-1 max-w-md">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent flex-1 outline-none text-sm"
                />
                <button className="text-gray-600 hover:text-blue-600">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/Cart">
                <button className="relative text-gray-700 hover:text-blue-600 text-xl">
                  <FaShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </button>
              </Link>
              {/* 🔥 CONDITION STARTS HERE */}
              {isAuthenticated ? (
                // ____________________________^^^^^^^^^^^^^^^
                // If user is logged in → show Logout button

                <button
                  onClick={logout} // no need arrow function
                  // ________^^^^^^^^
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-semibold"
                >
                  <FaSignInAlt /> Logout
                </button>
              ) : (
                // If user NOT logged in → show Login + Signup

                <>
                  <Link to="/LoginForm">
                    <button
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold"
                    >
                      <FaSignInAlt /> Login
                    </button>
                  </Link>

                  <Link to="/SignUp">
                    <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm font-semibold">
                      <FaUserPlus /> Sign Up
                    </button>
                  </Link>
                </>
              )}
              {/* 🔥 CONDITION ENDS HERE */}
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600">
              All
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Electronics
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Fashion
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Home & Kitchen
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Books
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to EcommercePro</h2>
            <p className="text-lg mb-6">
              Shop the best products at unbeatable prices
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Products
          </h3>
          <Products />
        </section>
      </main>
    </>
  );
};

export default Home;
