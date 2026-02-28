import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/ContextApi";
import { Link } from "react-router-dom";

const CartItem = () => {
  const { cartItems, dispatch } = useCart();
  
 
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔥 Redirect when cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) {
    return null; // prevent UI flash before redirect
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-lg bg-gray-100 p-2"
              />

              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h4>

                <p className="text-gray-500 mt-1">
                  ₹{item.price}
                </p>

                <div className="mt-3 flex items-center gap-4">
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    Qty: {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item.id,
                      })
                    }
                    className="text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-lg font-semibold text-gray-800">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 h-fit">
          <h3 className="text-xl font-semibold mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Total Items</span>
            <span>
              {cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>
              <Link to='/Payment'>
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItem;