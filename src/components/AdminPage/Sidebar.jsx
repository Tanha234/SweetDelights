import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true); // For mobile responsiveness

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white p-5 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <button
        className="text-white md:hidden mb-6"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* User Profile Section */}
      <div className="mb-6 flex items-center space-x-4">
        <img
          src={user.profileImage} // Profile image URL
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        {isOpen && (
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm">{user.email}</p>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <ul className="space-y-6">
        <li>
          <Link to="/dashboard" className="text-lg">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/orders" className="text-lg">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/products" className="text-lg">
            Products
          </Link>
        </li>
        <li>
          <Link to="/customers" className="text-lg">
            Customers
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-lg">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
