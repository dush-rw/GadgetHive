import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Calendar, DollarSign, User, Phone, MapPin } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-16 flex items-center justify-center">
        <div className="text-slate-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Link
          to="/admin"
          className="inline-flex items-center text-slate-600 hover:text-indigo-600 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 text-white p-10 sm:p-12">
            <h1 className="text-4xl font-extrabold">Order Management</h1>
            <p className="mt-3 text-slate-100 max-w-2xl">
              View and manage all customer orders.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {error && (
              <div className="mb-6 rounded-3xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-slate-200 rounded-3xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Order Header */}
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="w-full bg-slate-50 hover:bg-slate-100 p-6 transition-colors text-left flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold text-slate-900">
                            {order.order_number}
                          </span>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {order.first_name} {order.last_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.created_at)}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-900">
                            <DollarSign className="w-4 h-4" />
                            RFW {order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-slate-400">
                        {expandedOrder === order.id ? "−" : "+"}
                      </div>
                    </button>

                    {/* Order Details */}
                    {expandedOrder === order.id && (
                      <div className="border-t border-slate-200 p-6 bg-white space-y-6">
                        {/* Customer Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-3">
                              Customer Information
                            </h3>
                            <div className="space-y-2 text-sm text-slate-600">
                              <div className="flex items-start gap-2">
                                <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>
                                  {order.first_name} {order.last_name}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-4 h-4 flex-shrink-0">✉</span>
                                <span>{order.email}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{order.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-900 mb-3">
                              Shipping Address
                            </h3>
                            <div className="space-y-2 text-sm text-slate-600">
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{order.address}</span>
                              </div>
                              <div className="ml-6">{order.city}</div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-3">
                            Order Items
                          </h3>
                          <div className="space-y-3">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl"
                                >
                                  {item.image_url && (
                                    <img
                                      src={item.image_url}
                                      alt={item.name}
                                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-900 truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold text-slate-900">
                                      RFW {item.total_price.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-slate-600">
                                      RFW {item.unit_price.toLocaleString()} each
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-slate-600 text-sm">No items</p>
                            )}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border-t border-slate-200 pt-6">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Subtotal:</span>
                              <span className="font-medium">
                                RFW {order.subtotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Shipping:</span>
                              <span className="font-medium">
                                RFW {order.shipping_cost.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2">
                              <span>Total:</span>
                              <span className="text-indigo-600">
                                RFW {order.total.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="text-sm">
                              <span className="text-slate-600">
                                Payment Method:{" "}
                              </span>
                              <span className="font-medium text-slate-900">
                                {order.payment_method}
                              </span>
                            </div>
                            {order.notes && (
                              <div className="mt-3">
                                <span className="text-slate-600 text-sm">
                                  Notes:{" "}
                                </span>
                                <p className="text-slate-900 mt-1 text-sm">
                                  {order.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
