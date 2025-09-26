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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

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
    ],
    staff: [
      { to: "/staff", label: "Dashboard", icon: <Home size={20} /> },
      { to: "/staff/assignlead", label: "Assigned Leads", icon: <ClipboardList size={20} /> },
      { to: "/staff/completed", label: "Completed Leads", icon: <ClipboardList size={20} /> },
      { to: "/staff/rejected", label: "Rejected Leads", icon: <ClipboardList size={20} /> },
    ],
  };

  const navLinks = links[role] || [];
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">CRM Dashboard</h2>
        <nav className="flex-1">
          {navLinks.map((item) =>
            item.submenu ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="flex items-center justify-between w-full pt-2 pb-2 gap-2 hover:text-gray-300 border-b border-gray-400"
                >
                  <span className="flex items-center gap-2">
                    {item.icon} {item.label}
                  </span>
                  {openMenus[item.label] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openMenus[item.label] && (
                  <div>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className={`block border-b border-gray-400 flex items-center rounded px-2 py-1 ${
                          isActive(sub.to)
                            ? "bg-[#0a5beb6b] text-white"
                            : "hover:text-gray-300"
                        }`}
                      >
                        {sub.icon} {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 pt-2 pb-2 rounded px-2 border-b border-gray-400 ${
                  isActive(item.to)
                    ? "bg-[#0a5beb6b] text-white"
                    : "hover:text-gray-300"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            )
          )}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-300 hover:text-white"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="hidden md:block">
          <Topbar title={title} />
        </div>
        <main className="p-4 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}