import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Users,
  Home,
  Building2,
  List,
  UserPlus,
  ChevronDown,
  ChevronUp,
  Dot,
  ClipboardList,
} from "lucide-react";
import Topbar from "./Topbar";

export default function DashboardLayout({ title = "Dashboard", children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const stored = localStorage.getItem("user");
        if (!token || !stored) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(stored);
        if (user?.role) {
          setRole(user.role.toLowerCase());
        } else {
          navigate("/login");
          return;
        }
      } catch (err) {
        console.error("Error reading user:", err);
        navigate("/login");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location, navigate]);

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
    ],
    dealer: [
      { to: "/dealer", label: "Dashboard", icon: <Home size={20} /> },
      { to: "/dealer/create-staff", label: "Create Staff", icon: <Users size={20} /> },
      { to: "/dealer/manage-staff", label: "Manage Staff", icon: <Users size={20} /> },
      {
        label: "Lead Management",
        icon: <UserPlus size={20} />,
        submenu: [
          { to: "/dealer/staffleadall", label: "All Leads", icon: <Dot size={24} /> },
          { to: "/dealer/staffleadfilter", label: "Filter Leads", icon: <Dot size={24} /> },
          { to: "/dealer/addlead", label: "Add Basic Leads", icon: <Dot size={24} /> },
        ],
      },
      { to: "/dealer/leadstatus", label: "Lead Status", icon: <Users size={20} /> },
    ],
    staff: [
      { to: "/staff", label: "Dashboard", icon: <Home size={20} /> },
      { to: "/staff/assignlead", label: "Assigned Leads", icon: <ClipboardList size={20} /> },
      { to: "/staff/followup", label: "Follow Up", icon: <ClipboardList size={20} /> },
      { to: "/staff/visited", label: "Visited", icon: <ClipboardList size={20} /> },
    ],
  };

  const navLinks = links[role] || [];
  const isActive = (path) => location.pathname === path;

  // Close sidebar when clicking on a link (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header - Fixed at top */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex pt-14 md:pt-0 h-screen"> {/* Add padding for mobile header */}
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:relative
          top-0 left-0
          z-50
          w-64
          h-full
          bg-blue-900
          text-white
          p-4
          transform
          transition-transform
          duration-300
          ease-in-out
          flex
          flex-col
        `}>
          {/* Logo/Title */}
          <div className="flex items-center justify-between mb-6 mt-14 md:mt-6">
            <h2 className="text-xl md:text-2xl font-bold">CRM Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 rounded-md hover:bg-blue-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {navLinks.map((item) =>
                item.submenu ? (
                  <li key={item.label} className="space-y-1">
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-800 transition-colors duration-200"
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                      {openMenus[item.label] ? 
                        <ChevronUp size={16} className="flex-shrink-0" /> : 
                        <ChevronDown size={16} className="flex-shrink-0" />
                      }
                    </button>
                    {openMenus[item.label] && (
                      <ul className="ml-4 space-y-1">
                        {item.submenu.map((sub) => (
                          <li key={sub.to}>
                            <Link
                              to={sub.to}
                              onClick={handleLinkClick}
                              className={`
                                flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
                                ${isActive(sub.to)
                                  ? "bg-blue-800 text-white"
                                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
                                }
                              `}
                            >
                              {sub.icon}
                              <span className="text-sm">{sub.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={handleLinkClick}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                        ${isActive(item.to)
                          ? "bg-blue-800 text-white"
                          : "text-blue-100 hover:bg-blue-800 hover:text-white"
                        }
                      `}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="mt-6 pt-4 border-t border-blue-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-red-300 hover:bg-red-900 hover:text-white transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Topbar */}
          <div className="hidden md:block">
            <Topbar title={title} />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}