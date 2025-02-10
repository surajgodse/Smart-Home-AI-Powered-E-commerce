// src/components/Footer.js
import React from 'react';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-purple-500/20 mt-auto">
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left section - Developer Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
              Developed By
            </h3>
            <div className="space-y-2">
              <p className="text-xl text-gray-200 font-montserrat">Suraj Godse</p>
              <p className="text-lg text-purple-400 font-montserrat">A20547793</p>
              <p className="text-gray-400 font-montserrat">Illinois Institute of Technology</p>
            </div>
          </div>

          {/* Right section - Social Links */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-2xl font-bold font-montserrat tracking-wide bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
              Connect
            </h3>
            <div className="flex gap-4 md:justify-end">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800/50 text-purple-400 hover:text-purple-300 
                         hover:bg-gray-700/50 transition-all duration-300"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800/50 text-purple-400 hover:text-purple-300 
                         hover:bg-gray-700/50 transition-all duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:your.email@example.com"
                className="p-2 rounded-lg bg-gray-800/50 text-purple-400 hover:text-purple-300 
                         hover:bg-gray-700/50 transition-all duration-300"
              >
                <Mail size={24} />
              </a>
              <a 
                href="https://yourportfolio.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800/50 text-purple-400 hover:text-purple-300 
                         hover:bg-gray-700/50 transition-all duration-300"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-4 border-t border-purple-500/20 text-center">
          <p className="text-gray-400 font-montserrat">
            © {currentYear} Smart Homes. All rights reserved. Built with React & TailwindCSS
          </p>
        </div>
      </div>
      
      {/* Bottom decorative gradient */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
    </footer>
  );
};

export default Footer;