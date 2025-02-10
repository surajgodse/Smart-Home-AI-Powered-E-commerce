import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Camera, AlertCircle, CheckCircle } from 'lucide-react';

const OpenTicket = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);
      formData.append('userId', JSON.parse(localStorage.getItem('user')).id);

      const response = await axios.post('http://localhost:5000/api/tickets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setAlert({
        show: true,
        message: `Ticket Created Successfully! Your ticket number is: ${response.data.ticketNumber}`,
        type: 'success'
      });

      setImage(null);
      setPreview('');
      setDescription('');

    } catch (err) {
      setAlert({
        show: true,
        message: err.response?.data?.message || 'Error creating ticket',
        type: 'error'
      });
    } finally {
      setLoading(false);
      
      setTimeout(() => {
        setAlert({ show: false, message: '', type: '' });
      }, 5000);
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
            Open Support Ticket
          </h2>
        </div>
      </div>

      {/* Alert Message */}
      {alert.show && (
        <div className={`bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden
                        border ${alert.type === 'success' ? 'border-purple-500/20' : 'border-red-500/20'}`}>
          <div className={`h-1 bg-gradient-to-r ${
            alert.type === 'success' 
              ? 'from-purple-500 via-pink-500 to-purple-500'
              : 'from-red-500 via-pink-500 to-red-500'
          }`}></div>
          <div className="p-4 flex items-center gap-2">
            {alert.type === 'success' ? (
              <CheckCircle className="text-purple-400" size={20} />
            ) : (
              <AlertCircle className="text-red-400" size={20} />
            )}
            <span className="text-gray-200 font-montserrat">{alert.message}</span>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-purple-300 font-semibold mb-2 font-montserrat flex items-center gap-2">
              <Camera size={16} />
              Upload Image of the Product/Package*
            </label>
            <div className="border-2 border-dashed border-purple-500/20 rounded-xl p-6 text-center
                          hover:border-purple-500/40 transition-colors duration-300">
              {preview ? (
                <div className="mb-4">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <Upload className="mx-auto h-12 w-12 text-purple-400" />
                  <p className="mt-1 text-sm text-gray-400 font-montserrat">
                    Click or drag image to upload
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border file:border-purple-500/20
                  file:text-sm file:font-montserrat
                  file:bg-gray-800 file:text-purple-400
                  hover:file:bg-gray-700 hover:file:text-purple-300
                  file:transition-all file:duration-300"
                required
              />
            </div>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-purple-300 font-semibold mb-2 font-montserrat">
              Description of the Issue*
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-purple-500/30 rounded-lg text-gray-200 
                       focus:border-purple-500 focus:outline-none transition-colors duration-300 font-montserrat
                       min-h-[150px] resize-y"
              placeholder="Please describe the issue with your delivery..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
                       font-montserrat tracking-wide shadow-lg transition-all duration-300 flex items-center 
                       justify-center gap-2 ${
                         loading 
                           ? 'opacity-50 cursor-not-allowed' 
                           : 'hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/25'
                       }`}
          >
            {loading ? 'Processing...' : 'Submit Ticket'}
          </button>
        </form>

        {/* Bottom decorative border */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default OpenTicket;