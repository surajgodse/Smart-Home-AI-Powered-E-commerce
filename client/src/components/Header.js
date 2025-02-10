import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-8 shadow-2xl relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.657 0L26.172 6.485 24 8.657l4.485-4.485L32 0h.657z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold font-times-new-roman tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
              SmartHomes
            </span>
          </h1>
          
          <div className="relative group">
            <input
              type="text"
              placeholder="Search SmartHomes products..."
              className="px-6 py-3 rounded-full w-96 bg-gray-800/50 text-gray-100 border-2 border-gray-700 
                       focus:border-purple-500 focus:outline-none transition-all duration-300 
                       placeholder:text-gray-500 backdrop-blur-sm
                       group-hover:bg-gray-800/70"
              style={{ fontFamily: 'Times New Roman, serif' }}
            />
            <Search 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                         group-hover:text-purple-400 transition-colors duration-300 cursor-pointer"
              size={22}
            />
            
            {/* Decorative glow effect */}
            <div className="absolute inset-0 -z-10 rounded-full bg-purple-500/20 blur-xl 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </header>
  );
}

export default Header;