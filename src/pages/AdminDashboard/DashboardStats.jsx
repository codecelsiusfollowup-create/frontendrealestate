"use client";

import React from "react";
import {
  Building2,
  User,
  UserPlus,
  IndianRupee,
  MapPin,
  TrendingUp,
} from "lucide-react";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 py-6">
      {/* Total Properties */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-blue-50 border-blue-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Building2 className="text-white" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">
              <TrendingUp size={14} />
              <span>+12%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">1,245</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Total Properties
            </p>
            <p className="text-xs text-gray-500">Active listings</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: "98%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Active Dealers */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-green-50 border-green-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <User className="text-white" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">
              <TrendingUp size={14} />
              <span>+5%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">89</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Active Dealers
            </p>
            <p className="text-xs text-gray-500">Verified partners</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: "90%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Total Leads */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-purple-50 border-purple-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <UserPlus className="text-white" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">
              <TrendingUp size={14} />
              <span>+18%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">2,456</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Total Leads
            </p>
            <p className="text-xs text-gray-500">This month</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: "84%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-orange-50 border-orange-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
              <IndianRupee className="text-white" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">
              <TrendingUp size={14} />
              <span>+8%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">₹45.2L</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Monthly Revenue
            </p>
            <p className="text-xs text-gray-500">Commission earned</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: "91%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Site Visits */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-indigo-50 border-indigo-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <MapPin className="text-white" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">
              <TrendingUp size={14} />
              <span>+15%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">567</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Site Visits
            </p>
            <p className="text-xs text-gray-500">Scheduled visits</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: "95%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-pink-50 border-pink-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold px-2 py-1 rounded-full text-green-700 bg-green-100">
              <TrendingUp size={14} />
              <span>+3%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">68%</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Conversion Rate
            </p>
            <p className="text-xs text-gray-500">Lead to sale</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-600 h-1 rounded-full transition-all duration-1000"
              style={{ width: "89%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;