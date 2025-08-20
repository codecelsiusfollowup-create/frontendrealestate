import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "dealer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://a-new-vercel.onrender.com/api/auth/register", formData);
      alert("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed. User may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Dealer Signup</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-2 mb-4"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={formData.password}
          onChange={handleChange}
        />

        {/* 👇 No more dropdown, role is fixed to "dealer" */}

        <button
          className="bg-blue-600 text-white w-full py-2 rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Signup
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}
