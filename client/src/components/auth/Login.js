import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, Lock, UserCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    usertype: 'customer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Login successful!', {
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '0.5rem',
            border: '1px solid rgba(147, 51, 234, 0.2)'
          },
        });
        
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage, {
        style: {
          background: '#1f2937',
          color: '#fff',
          borderRadius: '0.5rem',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Login Card */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        {/* Top decorative border */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2 font-montserrat">Please sign in to continue</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 font-montserrat flex items-center gap-2">
                <User size={16} />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                         focus:border-purple-500 focus:outline-none transition-colors duration-300 font-montserrat"
                required
                disabled={isLoading}
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 font-montserrat flex items-center gap-2">
                <Lock size={16} />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                         focus:border-purple-500 focus:outline-none transition-colors duration-300 font-montserrat"
                required
                disabled={isLoading}
              />
            </div>
            
            {/* User Type Select */}
            <div>
              <label className="block text-purple-300 font-semibold mb-2 font-montserrat flex items-center gap-2">
                <UserCircle size={16} />
                User Type
              </label>
              <select
                name="usertype"
                value={formData.usertype}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                         focus:border-purple-500 focus:outline-none transition-colors duration-300 font-montserrat"
                disabled={isLoading}
              >
                <option value="customer" className="bg-gray-800">Customer</option>
                <option value="retailer" className="bg-gray-800">Store Manager</option>
                <option value="manager" className="bg-gray-800">Salesman</option>
              </select>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
                         font-montserrat tracking-wide shadow-lg transition-all duration-300 flex items-center 
                         justify-center gap-2 ${
                           isLoading 
                             ? 'opacity-50 cursor-not-allowed' 
                             : 'hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/25'
                         }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400 font-montserrat">
                Don't have an account?{' '}
                <a 
                  href="/register" 
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Bottom decorative border */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Login;