import React from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => {
  const categories = {
    'Smart Doorbells': [
      'Arlo',
      'Eufy',
      'Nest'
    ],
    'Smart Doorlocks': [
      'Ultralock',
      'August',
      'Bosma'
    ],
    'Smart Speakers': [
      'Amazon',
      'Apple',
      'Sonos'
    ],
    'Smart Lightings': [
      'Philips',
      'Meross'
    ],
    'Smart Thermostats': [
      'Google',
      'Ecobee',
      'Honeywell'
    ]
  };

  return (
    <aside className="w-64 rounded-xl overflow-hidden shadow-xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/20">
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      
      {Object.entries(categories).map(([category, brands]) => (
        <div key={category} className="group mb-2 last:mb-0 relative">
          {/* Category header */}
          <h3 className="font-bold text-lg px-6 py-4 text-gray-200 border-b border-purple-500/20 font-times-new-roman tracking-wide
                       bg-gradient-to-r from-gray-900 to-gray-800">
            {category}
          </h3>
          
          {/* Brands list */}
          <ul className="py-2 relative">
            {/* Subtle hover effect background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                          bg-gradient-to-r from-purple-500/5 to-transparent"></div>
            
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  to={`/${category.toLowerCase().replace(/\s+/g, '-')}/${brand.toLowerCase()}`}
                  className="relative flex items-center overflow-hidden group/item"
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent transform -translate-x-full 
                                group-hover/item:translate-x-0 transition-transform duration-500 ease-out"></div>
                  
                  {/* Left border indicator */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-pink-500 transform 
                                -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-out"></div>
                  
                  {/* Brand name */}
                  <span className="relative px-6 py-2.5 font-medium text-gray-400 group-hover/item:text-gray-200 
                                 transition-all duration-300 group-hover/item:translate-x-1 font-times-new-roman tracking-wide">
                    {brand}
                  </span>
                  
                  {/* Subtle right arrow */}
                  <span className="absolute right-4 opacity-0 transform translate-x-2 group-hover/item:opacity-100 
                                 group-hover/item:translate-x-0 transition-all duration-300 text-purple-400">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Category bottom border */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        </div>
      ))}
      
      {/* Bottom decorative border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </aside>
  );
};

export default LeftNav;