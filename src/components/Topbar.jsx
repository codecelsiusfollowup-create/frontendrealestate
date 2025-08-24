import React, { useEffect, useState } from "react";
import { Search, Bell, User, UserPlus, IndianRupee, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ title = "Dashboard" }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white px-4 py-3 flex items-center justify-between shadow relative">
      <div>
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          {title} {username ? `- ${username}` : ""}
        </h1>
        <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Search Bar */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search properties, dealers..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     text-sm w-64"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-gray-100 rounded-lg relative cursor-pointer whitespace-nowrap"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white 
                           text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Overlay */}
          {open && (
            <div
              className="fixed inset-0 bg-[#00000024] bg-opacity-20 z-40"
              onClick={() => setOpen(false)}
            />
          )}

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              </div>

              {/* Notifications List */}
              <div className="max-h-64 overflow-y-auto">
                {/* Item 1 */}
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">New lead assigned</p>
                      <p className="text-sm text-gray-600">Rahul Agarwal - 3BHK requirement</p>
                      <p className="text-xs text-gray-500 mt-1">5 min ago</p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                      <IndianRupee className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Property sold</p>
                      <p className="text-sm text-gray-600">Villa in Jubilee Hills - ₹4.2Cr</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Site visit scheduled</p>
                      <p className="text-sm text-gray-600">Tomorrow 3:00 PM - Andheri property</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 text-center border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar + Name */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 
                        rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            Admin User
          </span>
        </div>
      </div>
    </div>
  );
}