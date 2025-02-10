import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Package, User, Truck, Calendar, AlertCircle, CreditCard } from 'lucide-react';

const OrderView = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login', { state: { from: '/orders' } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      if (error.response?.status === 401) {
        navigate('/login', { state: { from: '/orders' } });
      } else if (error.response?.status === 404) {
        setError('Order not found or you do not have permission to view this order.');
      } else {
        setError('Failed to fetch order details. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        <div className="p-6">
          <h2 className="text-3xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
            View Order Details
          </h2>
        </div>
      </div>

      {/* Order Lookup Form */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                         focus:border-purple-500 focus:outline-none transition-colors duration-300 font-montserrat pl-10"
                required
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600
                       hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-montserrat
                       flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Loading...' : 'Look Up Order'}
            </button>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-red-500/20">
          <div className="h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500"></div>
          <div className="p-4 flex items-center gap-2 text-red-400">
            <AlertCircle size={18} />
            <span className="font-montserrat">{error}</span>
          </div>
        </div>
      )}

      {/* Order Details */}
      {order && (
        <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
          <div className="p-6">
            <h3 className="text-2xl font-bold font-montserrat text-purple-300 mb-6">
              Order #{order.orderId}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold font-montserrat text-purple-400 flex items-center gap-2">
                  <Package size={20} />
                  Product Information
                </h4>
                <div className="space-y-2 text-gray-300 font-montserrat">
                  <p>Name: {order.productName}</p>
                  <p>Price: ${Number(order.price).toFixed(2)}</p>
                  <p>Discount: {order.discount}%</p>
                  <p className="text-purple-400 font-semibold">
                    Final Price: ${Number(order.finalPrice).toFixed(2)}
                  </p>
                  <p>Quantity: {order.quantity}</p>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold font-montserrat text-purple-400 flex items-center gap-2">
                  <User size={20} />
                  Customer Information
                </h4>
                <div className="space-y-2 text-gray-300 font-montserrat">
                  <p>Name: {order.customerName}</p>
                  <p>Address: {order.customerAddress}</p>
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-purple-400" />
                    <p>Credit/Account: {order.creditAccountNo}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold font-montserrat text-purple-400 flex items-center gap-2">
                  <Truck size={20} />
                  Delivery Information
                </h4>
                <div className="space-y-2 text-gray-300 font-montserrat">
                  <p>Type: {order.deliveryType}</p>
                  {order.deliveryType === 'inStore' && (
                    <p>Store Location: {order.storeLocation}</p>
                  )}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold font-montserrat text-purple-400 flex items-center gap-2">
                  <Calendar size={20} />
                  Order Information
                </h4>
                <div className="space-y-2 text-gray-300 font-montserrat">
                  <p>Order Date: {formatDate(order.orderDate)}</p>
                  <p className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    Status: Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderView;