import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE - Billing & Payment */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Billing Details
          </h2>

          {/* Billing Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            />
          </div>

          {/* Payment Method */}
          <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-800">
            Payment Method
          </h2>

          <div className="space-y-4">
            <div
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${
                paymentMethod === "card"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              <FaCreditCard className="text-indigo-600 text-xl mr-4" />
              <span className="font-medium">Credit / Debit Card</span>
            </div>

            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${
                paymentMethod === "cod"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              <FaMoneyBillWave className="text-green-600 text-xl mr-4" />
              <span className="font-medium">Cash on Delivery</span>
            </div>

            <div
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${
                paymentMethod === "paypal"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              <FaPaypal className="text-blue-600 text-xl mr-4" />
              <span className="font-medium">PayPal</span>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Place Order Button */}
          <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-md">
            Place Order
          </button>
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$120.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>$130.00</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold transition duration-300">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;