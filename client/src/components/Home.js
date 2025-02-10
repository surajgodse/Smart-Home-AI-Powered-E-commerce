import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      
      <div className="px-8 py-6">
        <h1 className="text-4xl font-extrabold mb-6 font-times-new-roman tracking-wider">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
            Welcome to SmartHomes
          </span>
        </h1>
      </div>
      
      {/* Hero Image Section */}
      <div className="relative group">
        <img 
          src="/images/smart-home-image.PNG" 
          alt="SmartHomes Banner"
          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent 
                       opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Purple accent overlay on hover */}
        <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl font-bold font-times-new-roman tracking-wide mb-4">
            Transform Your Home
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl font-times-new-roman">
            Discover the latest in smart home technology. Create a more comfortable, secure, and efficient living space with our curated selection of premium devices.
          </p>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </div>
  );
};

export default Home;