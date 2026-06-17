import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const generatedRef = useRef(false);
  useEffect(() => {
    if (!generatedRef.current) {
      generatedRef.current = true;
      setOrderNumber(
        "GH" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      );
    }
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "momo",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        items,
        subtotal: cartTotal,
        total: cartTotal,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to place order");
      }

      const data = await response.json();
      setOrderNumber(
        data.orderNumber ||
          `GH${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsComplete(true);
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-8 lg:p-12 max-w-md w-full mx-4 text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Check className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Order #{orderNumber}</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
            A confirmation email will be sent to{" "}
            {formData.email || "your email"}.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full px-6 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors active:scale-95 text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          <span>Back to Cart</span>
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Checkout</h1>
          <div className="flex items-center justify-between max-w-2xl gap-2 sm:gap-4">
            {[
              { num: 1, title: "Details" },
              { num: 2, title: "Delivery" },
              { num: 3, title: "Payment" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full font-semibold text-xs sm:text-sm flex-shrink-0 ${
                    step >= s.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? <Check className="w-4 sm:w-5 h-4 sm:h-5" /> : s.num}
                </div>
                <span
                  className={`ml-1 sm:ml-2 font-medium text-xs sm:text-sm ${
                    step >= s.num ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {s.title}
                </span>
                {i < 2 && (
                  <div
                    className={`w-6 sm:w-12 lg:w-24 h-1 mx-2 sm:mx-4 rounded-full ${
                      step > s.num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8">
                {step === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="+250 788 123 456"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Delivery Address
                    </h2>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="KG 123 St, Kacyiru"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Kigali"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Payment Method
                    </h2>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          id: "momo",
                          name: "Mobile Money (MOMO)",
                          desc: "MTN Mobile Money, Airtel Money",
                        },
                        {
                          id: "card",
                          name: "Credit/Debit Card",
                          desc: "Visa, Mastercard",
                        },
                        {
                          id: "cash",
                          name: "Cash on Delivery",
                          desc: "Pay when you receive",
                        },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`block p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 text-sm sm:text-base">
                                {method.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500">
                                {method.desc}
                              </p>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                formData.paymentMethod === method.id
                                  ? "border-blue-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {formData.paymentMethod === method.id && (
                                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-2.5 sm:py-3 border border-gray-200 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors active:scale-95 text-sm sm:text-base"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      to="/cart"
                      className="px-6 py-2.5 sm:py-3 border border-gray-200 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base text-center"
                    >
                      Back to Cart
                    </Link>
                  )}
                  {step === 3 ? (
                    <button
                      type="submit"
                      className="px-8 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors active:scale-95 text-sm sm:text-base"
                    >
                      Place Order
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-2.5 sm:py-3 bg-white text-black border border-gray-200 font-medium rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors active:scale-95 text-sm sm:text-base"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 sticky top-24">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 pb-5 sm:pb-6 border-b max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          RFW {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-4 sm:py-6 border-b space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>RFW {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-lg font-bold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>RFW {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
