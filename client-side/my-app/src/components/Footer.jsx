import React from 'react'

const Footer = () => (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
            <p>1234 Street Address, City, State, ZIP</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  
