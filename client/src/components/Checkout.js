import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, MapPin, CreditCard, Truck, Store } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    creditAccountNo: '',
    deliveryType: 'delivery',
    storeLocation: '100'
  });

  const storeLocations = [
    { id: '100', address: 'Store-100 @ 3320 S Cicero Ave, Cicero, Chicago, Illinois, 60804' },
    { id: '101', address: 'Store-101 @ 2500 W 95th St, Evergreen Park, Chicago, Illinois, 60805' },
    { id: '102', address: 'Store-102 @ 4650 W North Ave, Chicago, Illinois, 60639' },
    { id: '103', address: 'Store-103 @ 10900 S Doty Ave, Chicago, Illinois, 60628' },
    { id: '104', address: 'Store-104 @ 1300 Des Plaines Ave, Forest Park, Chicago, Illinois, 60130' },
    { id: '105', address: 'Store-105 @ 7050 S Cicero Ave, Bedford Park, Chicago, Illinois, 60638' },
    { id: '106', address: 'Store-106 @ 4626 W Diversey Ave, Chicago, Illinois, 60639' },
    { id: '107', address: 'Store-107 @ 7535 S Ashland Ave, Chicago, Illinois, 60620' },
    { id: '108', address: 'Store-108 @ 2189 75th St, Darien, Illinois, 60561' },
    { id: '109', address: 'Store-109 @10260 S Harlem Ave, Bridgeview, Illinois, 60455' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    const productData = localStorage.getItem('checkoutProduct');
    if (!productData) {
      navigate('/');
      return;
    }
    setProduct(JSON.parse(productData));

    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setFormData(prev => ({
        ...prev,
        customerName: userData.username
      }));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        ...formData,
        product,
        quantity: 1
      };

      const response = await axios.post(
        'http://localhost:5000/api/orders', 
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        localStorage.removeItem('checkoutProduct');
        alert(`Order placed successfully! Your order ID is: ${response.data.orderId}`);
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { state: { from: '/checkout' } });
      } else {
        alert('Failed to submit order. Please try again.');
      }
    }
  };

  if (!product) return (
    <div className="text-center p-6 text-gray-300 font-montserrat">Loading...</div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        <div className="p-6">
          <h2 className="text-3xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 flex items-center gap-2">
            <ShoppingBag className="w-8 h-8" />
            Checkout
          </h2>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20 p-6">
        <h3 className="text-xl font-bold mb-4 text-purple-300 font-montserrat">Order Summary</h3>
        <div className="space-y-2 text-gray-300">
          <p>Product: {product.name}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Discount: {product.discount}%</p>
          <p className="text-lg font-semibold text-purple-400">
            Final Price: ${(product.price * (1 - product.discount / 100)).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm 
                                             border border-purple-500/20 p-6 space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2 font-montserrat">
            Customer Name
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                     focus:border-purple-500 focus:outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Customer Address */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2 font-montserrat">
            Customer Address
          </label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                     focus:border-purple-500 focus:outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Credit/Account Number */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2 font-montserrat">
            Credit/Account No.
          </label>
          <input
            type="text"
            name="creditAccountNo"
            value={formData.creditAccountNo}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                     focus:border-purple-500 focus:outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Delivery Type */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2 font-montserrat">
            Delivery Type
          </label>
          <div className="space-x-6 text-gray-300">
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="deliveryType"
                value="delivery"
                checked={formData.deliveryType === 'delivery'}
                onChange={handleInputChange}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="flex items-center gap-1">
                <Truck size={16} />
                Delivery
              </span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="deliveryType"
                value="inStore"
                checked={formData.deliveryType === 'inStore'}
                onChange={handleInputChange}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="flex items-center gap-1">
                <Store size={16} />
                In-Store Pickup
              </span>
            </label>
          </div>
        </div>

        {/* Store Location Select */}
        {formData.deliveryType === 'inStore' && (
          <div>
            <label className="block text-purple-300 font-semibold mb-2 font-montserrat">
              Store Location
            </label>
            <select
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                       focus:border-purple-500 focus:outline-none transition-colors duration-300"
              required
            >
              {storeLocations.map(store => (
                <option key={store.id} value={store.id} className="bg-gray-800">
                  {store.address}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
                   hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-montserrat
                   tracking-wide shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} />
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;