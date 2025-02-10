import React, { useState } from 'react';
import axios from 'axios';
import { Search, Calendar, FileText, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const TicketStatus = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTicketData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/tickets/${ticketNumber}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setTicketData(response.data.ticket);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching ticket information');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (decision) => {
    switch (decision) {
      case 'Refund Order':
        return 'text-red-400';
      case 'Replace Order':
        return 'text-blue-400';
      case 'Escalate to Human Agent':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusGradient = (decision) => {
    switch (decision) {
      case 'Refund Order':
        return 'from-red-500/20 to-transparent';
      case 'Replace Order':
        return 'from-blue-500/20 to-transparent';
      case 'Escalate to Human Agent':
        return 'from-yellow-500/20 to-transparent';
      default:
        return 'from-gray-500/20 to-transparent';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        <div className="p-6">
          <h2 className="text-3xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
            Check Ticket Status
          </h2>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                placeholder="Enter Ticket Number"
                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                         focus:border-purple-500 focus:outline-none transition-colors duration-300 font-montserrat
                         pl-10"
                required
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600
                       hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-montserrat
                       flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Checking...' : 'Check Status'}
              <ArrowRight size={18} />
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

      {/* Ticket Details */}
      {ticketData && (
        <div className="space-y-6">
          {/* Ticket Information */}
          <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold font-montserrat text-purple-300 mb-4">Ticket Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-gray-400 font-montserrat flex items-center gap-2">
                    <FileText size={16} />
                    Ticket Number:
                  </p>
                  <p className="text-gray-200 font-medium font-montserrat">{ticketData.ticket_id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-montserrat flex items-center gap-2">
                    <Calendar size={16} />
                    Submitted On:
                  </p>
                  <p className="text-gray-200 font-medium font-montserrat">
                    {new Date(ticketData.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-gray-400 font-montserrat">Description:</p>
                  <p className="text-gray-200 font-medium font-montserrat">{ticketData.description}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-gray-400 font-montserrat">Decision:</p>
                  <div className={`rounded-lg p-3 bg-gradient-to-r ${getStatusGradient(ticketData.ai_decision)}`}>
                    <p className={`font-bold font-montserrat ${getStatusColor(ticketData.ai_decision)}`}>
                      {ticketData.ai_decision}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Image */}
          <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold font-montserrat text-purple-300 mb-4">Uploaded Image</h3>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <img 
                  src={`http://localhost:5000/${ticketData.image_path}`}
                  alt="Ticket attachment"
                  className="max-h-64 mx-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketStatus;