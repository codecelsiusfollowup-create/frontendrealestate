import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageDealers() {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchDealers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://a-new-vercel.onrender.com/api/users/dealers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDealers(res.data);
      } catch (err) {
        console.error("Error fetching dealers:", err);
      }
    };

    fetchDealers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this dealer?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://a-new-vercel.onrender.com/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDealers((prev) => prev.filter((dealer) => dealer._id !== id));
    } catch (err) {
      console.error("Error deleting dealer:", err);
    }
  };

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">All Dealers</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((dealer) => (
                <tr key={dealer._id} className="border-t">
                  <td className="p-3">{dealer.username}</td>
                  <td className="p-3">{dealer.email}</td>
                  <td className="p-3 space-x-2">
                    {/* You can add edit logic here later */}
                    <button
                      onClick={() => handleDelete(dealer._id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {dealers.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No dealers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
