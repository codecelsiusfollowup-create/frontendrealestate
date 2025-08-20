// components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Users, Home, Building2, List, UserPlus, ChevronDown, ChevronUp, Dot } from "lucide-react";
import Topbar from "./Topbar";

export default function DashboardLayout({ title = "Dashboard", children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setRole(user.role);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = {
    admin: [
      { to: "/admin", label: "Dashboard", icon: <Home size={20} /> },
      { to: "/admin/postproperty", label: "Post Property", icon: <Building2 size={20} /> },
      { to: "/admin/property-list", label: "Property List", icon: <List size={20} /> },
      {
        label: "Lead",
        icon: <UserPlus size={20} />,
        submenu: [
          { to: "/admin/lead/all", label: "All Leads", icon: <Dot size={40} /> },
          { to: "/admin/lead/filter", label: "Filter Leads", icon: <Dot size={40} /> },
          { to: "/admin/addlead", label: "Add Basic Leads", icon: <Dot size={40} /> },
        ],
      },
    ],

    dealer: [
      { to: "/dealer", label: "Dashboard", icon: <Home size={20} /> },
      { to: "/dealer/create-staff", label: "Create Staff", icon: <Users size={20} /> },
      { to: "/dealer/manage-staff", label: "Manage Staff", icon: <Users size={20} /> },
    ],
    staff: [{ to: "/staff", label: "Dashboard", icon: <Home size={20} /> }],
  };

  const navLinks = links[role] || [];


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      <div className={`fixed z-40 inset-y-0 left-0 w-64 bg-blue-900 text-white p-4 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out md:hidden`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">CRM Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)}><X /></button>
        </div>
        <nav>
          {navLinks.map((item,index) => (
            <Link key={`${item.to}-${index}`} to={item.to} onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 mb-4 hover:text-gray-300">
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-white mt-6 cursor-pointer">
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">CRM Dashboard</h2>
        <nav className="flex-1">
          {navLinks.map((item) => {
            if (item.submenu) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex items-center justify-between w-full pt-2 pb-2 gap-2 mb-4 hover:text-gray-300 cursor-pointer border-b border-gray-400"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon} {item.label}
                    </span>
                    <span>
                      {openMenu === item.label ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {openMenu === item.label && (
                    <div className="ml-6">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block mb-2 hover:text-gray-300 flex items-center"
                        >
                          {sub.icon} {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 pt-2 pb-2 hover:text-gray-300 border-b border-gray-400"
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-white cursor-pointer">
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Topbar */}
        <header className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
          <h1 className="text-lg font-bold">{title}</h1>
          <button onClick={handleLogout}><LogOut size={24} color="red" /></button>
        </header>

        {/* Desktop Topbar */}
        <div className="hidden md:block">
          <Topbar title={title} />
        </div>

        {/* Page Content */}
        <main className="p-4 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}