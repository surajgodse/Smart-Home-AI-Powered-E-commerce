import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, ChevronDown, Home, Bell, Lock, Speaker, Lightbulb, Thermometer } from 'lucide-react';

const TopNav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const publicNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Smart Doorbells', path: '/smart-doorbells', icon: Bell },
    { name: 'Smart Doorlocks', path: '/smart-doorlocks', icon: Lock },
    { name: 'Smart Speakers', path: '/smart-speakers', icon: Speaker },
    { name: 'Smart Lightings', path: '/smart-lightings', icon: Lightbulb },
    { name: 'Smart Thermostats', path: '/smart-thermostats', icon: Thermometer },
  ];

  const privateNavItems = [
    { name: 'View Orders', path: '/orders' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 shadow-2xl relative z-50">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(139,92,246,0.05)_50%,transparent_100%)] pointer-events-none"
        style={{ mixBlendMode: 'overlay' }}
      ></div>

      <div className="container mx-auto relative">
        <ul className="flex items-center justify-between font-times-new-roman">
          <div className="flex items-center">
            {publicNavItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className="block py-5 px-6 hover:bg-purple-500/10 transition-all duration-300 relative group"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon 
                      size={18} 
                      className="opacity-70 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 text-purple-400" 
                    />
                    <span className="relative tracking-wide">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            
            {user && (
              <>
                {privateNavItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path}
                      className="block py-5 px-6 hover:bg-purple-500/10 transition-all duration-300 relative group"
                    >
                      <span className="relative tracking-wide">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="relative">
                  <button
                    className="flex items-center py-5 px-6 hover:bg-purple-500/10 transition-all duration-300 group"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="relative tracking-wide">
                      Customer Service
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                    <ChevronDown 
                      size={18} 
                      className="ml-2 transform group-hover:rotate-180 transition-transform duration-300 text-purple-400" 
                    />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 bg-gray-900/95 backdrop-blur-lg w-56 rounded-xl shadow-2xl transform origin-top transition-all duration-300 border border-purple-500/20">
                      <Link
                        to="/open-ticket"
                        className="block px-6 py-3 hover:bg-purple-500/10 transition-colors duration-300 first:rounded-t-lg tracking-wide"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Open a Ticket
                      </Link>
                      <Link
                        to="/ticket-status"
                        className="block px-6 py-3 hover:bg-purple-500/10 transition-colors duration-300 last:rounded-b-lg border-t border-purple-500/20 tracking-wide"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Status of a Ticket
                      </Link>
                    </div>
                  )}
                </li>
              </>
            )}
          </div>
          
          <div className="flex items-center">
            <li>
              <Link to="/cart" className="block py-5 px-6 hover:bg-purple-500/10 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <ShoppingCart 
                    size={20} 
                    className="transform group-hover:scale-110 transition-transform duration-300 text-purple-400" 
                  />
                  <span className="bg-purple-500/20 px-2 py-0.5 rounded-full text-sm border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors duration-300">
                    (0)
                  </span>
                </div>
              </Link>
            </li>
            
            {user ? (
              <>
                <li>
                  <span className="block py-5 px-6 text-purple-300/80">
                    Welcome, <span className="font-semibold text-purple-300">{user.username}</span>!
                  </span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center py-5 px-6 hover:bg-purple-500/10 transition-all duration-300 group space-x-2"
                  >
                    <LogOut 
                      size={20} 
                      className="transform group-hover:rotate-12 transition-transform duration-300 text-purple-400" 
                    />
                    <span className="tracking-wide">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login"
                  className="block py-3 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 
                           transition-all duration-300 rounded-full mx-2 shadow-lg hover:shadow-purple-500/25 tracking-wide
                           border border-purple-400/20"
                >
                  Login
                </Link>
              </li>
            )}
          </div>
        </ul>
      </div>
      
      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </nav>
  );
};

export default TopNav;