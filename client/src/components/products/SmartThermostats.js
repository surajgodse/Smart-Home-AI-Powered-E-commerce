import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Eye } from 'lucide-react';

const SmartThermostats = () => {
  const { brand } = useParams();
  const navigate = useNavigate();

  const products = {
    'google': [
      {
        name: 'Google Nest Learning',
        price: 249.99,
        discount: 20.0,
        image: '/images/thermostats/nest-learning.jpg',
        category: 'Smart Thermostats'
      },
      {
        name: 'Google Nest E',
        price: 169.99,
        discount: 15.0,
        image: '/images/thermostats/nest-e.jpg',
        category: 'Smart Thermostats'
      }
    ],
    'ecobee': [
      {
        name: 'Ecobee Smart Premium',
        price: 249.99,
        discount: 25.0,
        image: '/images/thermostats/ecobee-premium.jpg',
        category: 'Smart Thermostats'
      },
      {
        name: 'Ecobee Smart Enhanced',
        price: 189.99,
        discount: 20.0,
        image: '/images/thermostats/ecobee-enhanced.jpg',
        category: 'Smart Thermostats'
      }
    ],
    'honeywell': [
      {
        name: 'Honeywell T9',
        price: 199.99,
        discount: 15.0,
        image: '/images/thermostats/honeywell-t9.jpg',
        category: 'Smart Thermostats'
      },
      {
        name: 'Honeywell T5+',
        price: 149.99,
        discount: 20.0,
        image: '/images/thermostats/honeywell-t5.jpg',
        category: 'Smart Thermostats'
      }
    ]
  };

  React.useEffect(() => {
    if (brand && !products[brand.toLowerCase()]) {
      navigate('/smart-thermostats');
    }
  }, [brand, navigate]);

  const filteredProducts = brand 
    ? { [brand]: products[brand.toLowerCase()] }
    : products;

  const handleBuyNow = (product) => {
    localStorage.setItem('checkoutProduct', JSON.stringify(product));
    navigate('/checkout');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        {/* Top decorative border */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
            Smart Thermostats {brand && `- ${brand.charAt(0).toUpperCase() + brand.slice(1)}`}
          </h2>
        </div>
      </div>

      {/* Products Grid */}
      {Object.entries(filteredProducts).map(([brandName, items]) => (
        <div key={brandName} className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
          {/* Brand section decorative border */}
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 font-montserrat tracking-wide text-purple-300">
              {brandName.charAt(0).toUpperCase() + brandName.slice(1)}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items?.map(product => (
                <div 
                  key={product.name} 
                  className="group relative bg-gray-800/50 rounded-xl overflow-hidden border border-purple-500/10 
                           hover:border-purple-500/30 transition-all duration-300"
                >
                  {/* Product Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-900/50">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full 
                                  font-semibold shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      -{product.discount}%
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 relative">
                    <h4 className="text-xl font-bold mb-2 font-montserrat tracking-wide text-gray-200">
                      {product.name}
                    </h4>

                    {/* Price Section */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-purple-400">
                          ${(product.price * (1 - product.discount/100)).toFixed(2)}
                        </span>
                        <span className="text-gray-500 line-through text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleBuyNow(product)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg
                                 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center 
                                 justify-center gap-2 font-montserrat tracking-wide shadow-lg hover:shadow-purple-500/25"
                      >
                        <ShoppingCart size={20} />
                        Buy Now
                      </button>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-gray-800 text-purple-400 py-2.5 rounded-lg hover:bg-gray-700 
                                       transition-colors duration-300 flex items-center justify-center gap-2 
                                       font-montserrat tracking-wide">
                          <MessageCircle size={20} />
                          Review
                        </button>
                        
                        <button className="bg-gray-800 text-purple-400 py-2.5 rounded-lg hover:bg-gray-700 
                                       transition-colors duration-300 flex items-center justify-center gap-2 
                                       font-montserrat tracking-wide">
                          <Eye size={20} />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decorative border */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        </div>
      ))}
    </div>
  );
};

export default SmartThermostats;