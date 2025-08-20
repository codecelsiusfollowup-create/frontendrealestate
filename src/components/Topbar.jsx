import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ title = "Dashboard" }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

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
    <div className="w-full bg-white px-4 py-3 flex items-center justify-between border-b shadow">
      <h1 className="text-lg md:text-xl font-semibold text-gray-800">
        {title} {username ? `- ${username}` : ""}
      </h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline cursor-pointer">Logout</span>
      </button>
    </div>
  );
}
