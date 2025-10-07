import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function CreateStaff() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [dealerId, setDealerId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id || user?._id;
    if (user?.role === "dealer" && id) {
      setDealerId(id); // ✅ Safely fallback to _id
    } else {
      alert("Dealer ID not found. Please login again.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!dealerId) {
      alert("Dealer ID missing. Please login again.");
      return;
    }

    try {
      await axios.post("https://backend-six-plum-52.vercel.app/api/auth/register", {
        ...formData,
        role: "staff",
        dealerId,
      });
      alert("✅ Staff created successfully!");
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Register error:", err);
      alert("❌ Error creating staff");
    }
  };

  return (
    <DashboardLayout title="Create Staff">
      <div className="flex justify-center items-center px-4 py-6 md:py-10 w-full">
        <div className="w-full max-w-lg bg-white rounded shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Staff</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded"
            onClick={handleSubmit}
          >
            Create Staff
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}