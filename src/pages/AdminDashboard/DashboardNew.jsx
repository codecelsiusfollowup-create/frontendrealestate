// components/DashboardNew.jsx
"use client";
import React from "react";

const DashboardNew = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Section */}
        <div className="mb-4 lg:mb-0">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-2">
            <i className="ri-time-line text-blue-500"></i>
            <span>Real-time insights for your real estate business</span>
          </p>

          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="text-sm text-gray-600">
              Last updated: 4:57:28 PM
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer whitespace-nowrap shadow-sm">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>

          {/* Export Button */}
          <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2 shadow-sm">
            <i className="ri-download-line text-gray-600"></i>
            <span>Export</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardNew;
