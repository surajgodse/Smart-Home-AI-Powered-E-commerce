import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import TopNav from './components/TopNav';
import LeftNav from './components/LeftNav';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Checkout from './components/Checkout';
import OrderView from './components/OrderView';
import OpenTicket from './components/customer service/OpenTicket';
import TicketStatus from './components/customer service/TicketStatus';

// Import Product Components
import SmartDoorbells from './components/products/SmartDoorbells';
import SmartDoorlocks from './components/products/SmartDoorlocks';
import SmartSpeakers from './components/products/SmartSpeakers';
import SmartLightings from './components/products/SmartLightings';
import SmartThermostats from './components/products/SmartThermostats';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 flex flex-col">
        {/* Background pattern overlay */}
        <div 
          className="fixed inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.657 0L26.172 6.485 24 8.657l4.485-4.485L32 0h.657z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <Header />
        <TopNav />
        
        <div className="container mx-auto px-6 py-8 flex-grow">
          <div className="flex gap-8">
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-8">
                <LeftNav />
              </div>
            </div>
            
            <div className="flex-grow">
              <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                
                {/* Product Category Routes with Brand Parameter */}
                <Route path="/smart-doorbells" element={<SmartDoorbells />} />
                <Route path="/smart-doorbells/:brand" element={<SmartDoorbells />} />
                
                <Route path="/smart-doorlocks" element={<SmartDoorlocks />} />
                <Route path="/smart-doorlocks/:brand" element={<SmartDoorlocks />} />
                
                <Route path="/smart-speakers" element={<SmartSpeakers />} />
                <Route path="/smart-speakers/:brand" element={<SmartSpeakers />} />
                
                <Route path="/smart-lightings" element={<SmartLightings />} />
                <Route path="/smart-lightings/:brand" element={<SmartLightings />} />
                
                <Route path="/smart-thermostats" element={<SmartThermostats />} />
                <Route path="/smart-thermostats/:brand" element={<SmartThermostats />} />
                
                {/* Other Routes */}
                <Route path="/cart" element={<div>Cart Component</div>} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<OrderView />} />
                <Route path="/open-ticket" element={<OpenTicket />} />
                <Route path="/ticket-status" element={<TicketStatus />} />
                
                {/* 404 Route */}
                <Route path="*" element={
                  <div className="bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm border border-purple-500/20 p-16 text-center">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-montserrat">
                      404 - Page Not Found
                    </h2>
                    <p className="mt-4 text-gray-400 font-montserrat">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;