// components/ManageDealers.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Search, Plus, Trash2 } from "lucide-react";

export default function ManageDealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters & controls
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    const fetchDealers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "https://a-new-vercel.vercel.app/api/users/dealers",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDealers(res.data);
      } catch (err) {
        console.error("Error fetching dealers:", err);
        setError("Failed to load dealers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  // Delete dealer API
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dealer?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://a-new-vercel.vercel.app/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDealers((prev) => prev.filter((dealer) => dealer._id !== id));
      alert("Dealer deleted successfully.");
    } catch (err) {
      console.error("Error deleting dealer:", err);
      alert("Failed to delete dealer. Please try again.");
    }
  };

  // Filter + Sort
  const filteredDealers = dealers
    .filter(
      (dealer) =>
        dealer.username?.toLowerCase().includes(search.toLowerCase()) ||
        dealer.email?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((dealer) =>
      statusFilter === "all" ? true : dealer.status === statusFilter
    )
    .sort((a, b) => {
      if (sort === "name") return a.username.localeCompare(b.username);
      if (sort === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dealer Management</h1>
          <p className="text-gray-500 text-sm">
            Manage and monitor dealer performance
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full outline-none text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="latest">Sort by Latest</option>
        </select>
      </div>

     

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-50 p-4 rounded mb-4">{error}</div>
      )}

      {/* Dealer Cards */}
      <div className="space-y-4">
        {filteredDealers.map((dealer) => (
          <div
            key={dealer._id}
            className="p-4 border border-gray-300 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow transition"
          >
            {/* Dealer Info */}
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${dealer.username}&background=random`}
                alt={dealer.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  {dealer.username}
                  <span className="text-yellow-500 text-sm">★ 4.2</span>
                </h2>
                <p className="text-sm text-gray-500">{dealer.email}</p>
                <p className="text-xs text-gray-400">
                  Joined: {new Date(dealer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Performance */}
            <div className="text-sm text-gray-600">
              <p>
                Properties: <b>{dealer.properties || 0}</b>
              </p>
              <p>Revenue: ₹{dealer.revenue || 0}</p>
              <p>Deals: {dealer.deals || 0}</p>
              <p>Commission: {dealer.commission || "0%"}</p>
            </div>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  dealer.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {dealer.status || "Inactive"}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Last login: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded text-blue-600 text-sm hover:bg-blue-50">
                View Profile
              </button>
              <button
                onClick={() => handleDelete(dealer._id)}
                className="px-3 py-1 border rounded text-red-600 text-sm hover:bg-red-50 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}

        {!loading && filteredDealers.length === 0 && (
          <p className="text-center text-gray-500 italic py-6">
            No dealers found.
          </p>
        )}
      </div>
    </div>
  );
}