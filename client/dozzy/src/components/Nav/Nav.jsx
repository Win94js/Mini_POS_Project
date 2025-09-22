import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import userPhoto from '../../photos/user-profile.png';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex sm:flex-row justify-between items-center gap-4 relative">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex items-center text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo/Brand */}
        <h3 className="text-xl font-bold text-blue-600">My Dozzy POS</h3>

        {/* Nav Links */}
        <div
          className={`sm:flex 
            flex-col sm:flex-row 
            items-center gap-4 
            text-gray-700 font-medium 
            sm:static max-sm:absolute 
            max-sm:top-16 max-sm:left-4 
            max-sm:w-4/5 max-sm:bg-white 
            max-sm:shadow-lg max-sm:rounded-lg 
            max-sm:transition-all max-sm:duration-300 
            max-sm:overflow-hidden
            ${isMobileMenuOpen ? 'max-sm:max-h-96 max-sm:opacity-100' : 'max-sm:max-h-0 max-sm:opacity-0'}`}
        >
          <ul className="flex flex-col sm:flex-row w-full items-center gap-4 py-2 sm:py-0">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-500">Products</Link></li>
            <li><Link to="/menu" className="hover:text-blue-500">Sales</Link></li>
            <li><Link to="/reports" className="hover:text-blue-500">Reports</Link></li>
          </ul>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img src={userPhoto} alt="user" className="w-10 h-10 rounded-full object-cover border" />
          <div className="text-sm">
            <p className="font-semibold">User Name</p>
            <p className="text-gray-500">User Role</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
