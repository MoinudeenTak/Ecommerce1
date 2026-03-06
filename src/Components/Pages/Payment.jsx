import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";
import { useCart } from "../Store/ContextApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { paymentApiCall } from "../Apis/Services";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { cartItems, dispatch, currentUser } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const res = await paymentApiCall({
        amount: totalPrice,
      });

      if (res.data.success) {
        toast.success("Payment Successful!");

        /* CREATE ORDER */
        const newOrder = {
          id: crypto.randomUUID(),

          userId: currentUser?.id || null,
          customerName:
            currentUser?.name ||
            currentUser?.username ||
            currentUser?.email ||
            "Guest",

          customerEmail: currentUser?.email || "",

          items: cartItems,

          totalAmount: totalPrice,

          paymentMethod,

          status: "Pending",

          createdAt: new Date().toISOString(),
        };

        /* SAVE ORDER */
        dispatch({ type: "ADD_ORDER", payload: newOrder });

        /* CLEAR CART */
        dispatch({ type: "CLEAR_CART" });

        navigate("/", {
          replace: true,
          state: { paymentSuccess: true },
        });
      }
    } catch (error) {
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="border p-3 rounded-lg"/>
            <input type="text" placeholder="Last Name" className="border p-3 rounded-lg"/>
            <input type="email" placeholder="Email" className="border p-3 rounded-lg md:col-span-2"/>
            <input type="text" placeholder="Address" className="border p-3 rounded-lg md:col-span-2"/>
          </div>

          {/* PAYMENT METHOD */}

          <h2 className="text-2xl font-bold mt-10 mb-6">Payment Method</h2>

          <div className="space-y-4">

            <div
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center p-4 border rounded-xl cursor-pointer ${
                paymentMethod === "card" ? "border-indigo-500 bg-indigo-50" : ""
              }`}
            >
              <FaCreditCard className="mr-3"/> Credit / Debit Card
            </div>

            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center p-4 border rounded-xl cursor-pointer ${
                paymentMethod === "cod" ? "border-indigo-500 bg-indigo-50" : ""
              }`}
            >
              <FaMoneyBillWave className="mr-3"/> Cash On Delivery
            </div>

            <div
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center p-4 border rounded-xl cursor-pointer ${
                paymentMethod === "paypal" ? "border-indigo-500 bg-indigo-50" : ""
              }`}
            >
              <FaPaypal className="mr-3"/> PayPal
            </div>

          </div>

          <button
            onClick={handlePayment}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
          >
            Place Order
          </button>
        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl"
          >
            Proceed to Payment
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payment;