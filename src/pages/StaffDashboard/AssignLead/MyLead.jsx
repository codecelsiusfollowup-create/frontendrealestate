// frontend/src/pages/staff/StaffAssign.jsx
import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiCalendar, 
  FiDollarSign, 
  FiHome, 
  FiUser,
  FiTag,
  FiClock,
  FiTrendingUp,
  FiMessageSquare,
  FiStar
} from "react-icons/fi";

export default function StaffAssign() {
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const pollingRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

 // ---------- Fetch My Leads ----------
  const fetchMyLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const res = await axios.get(
        "https://backend-six-indol-62.vercel.app/api/assignlead",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setMyLeads(res.data.data || []);
      } else {
        setError(res.data.message || "Failed to fetch leads");
      }
    } catch (err) {
      console.error("Error fetching leads:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Initial Fetch + Polling ----------
  useEffect(() => {
    fetchMyLeads();

    // ✅ Optional polling every 30 seconds (you can remove if not needed)
    pollingRef.current = setInterval(() => {
      fetchMyLeads();
    }, 30000); // 30 seconds

    return () => clearInterval(pollingRef.current);
  }, []);


  const getLeadScore = (lead) => {
    let score = 0;
    if (lead.budget && lead.budget !== "N/A") score += 25;
    if (lead.propertyType && lead.propertyType !== "N/A") score += 20;
    if (lead.phone && lead.email) score += 15;
    if (lead.projectName && lead.projectName !== "N/A") score += 20;
    if (lead.remark && lead.remark !== "N/A") score += 20;
    return score;
  };

  const getLeadStatus = (lead) => {
    const daysSinceCreated = Math.floor(
      (new Date() - new Date(lead.createdAt)) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceCreated <= 1) return "new";
    if (daysSinceCreated <= 7) return "warm";
    if (daysSinceCreated <= 30) return "nurture";
    return "cold";
  };

  const filteredAndSortedLeads = myLeads
    .filter(lead => {
      if (filter === "all") return true;
      if (filter === "active") return lead.isActive;
      if (filter === "new") return getLeadStatus(lead) === "new";
      if (filter === "hot") return getLeadScore(lead) >= 70;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "score") return getLeadScore(b) - getLeadScore(a);
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-green-100 text-green-800";
      case "warm": return "bg-yellow-100 text-yellow-800";
      case "nurture": return "bg-blue-100 text-blue-800";
      case "cold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout title="Lead Management Dashboard">
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            My Property Leads
          </h2>
          <p className="text-gray-600">
            Manage your real estate leads and track property inquiries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{myLeads.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myLeads.filter(lead => getLeadStatus(lead) === "new").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hot Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myLeads.filter(lead => getLeadScore(lead) >= 70).length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <FiStar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myLeads.filter(lead => lead.isActive).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiMessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Leads
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Leads</option>
                <option value="new">New Leads</option>
                <option value="hot">Hot Leads (High Score)</option>
                <option value="active">Active Leads</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt">Newest First</option>
                <option value="score">Lead Score</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading leads...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiHome className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "No leads have been assigned to you yet."
                : `No leads match the selected filter: ${filter}`}
            </p>
          </div>
        )}

        {/* Leads Grid */}
        {!loading && !error && filteredAndSortedLeads.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedLeads.map((lead) => {
              const leadScore = getLeadScore(lead);
              const leadStatus = getLeadStatus(lead);
              
              return (
                <div
                  key={lead._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {lead.fullName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leadStatus)}`}>
                            {leadStatus.charAt(0).toUpperCase() + leadStatus.slice(1)}
                          </span>
                          <span className={`flex items-center gap-1 font-medium ${getScoreColor(leadScore)}`}>
                            <FiStar className="w-3 h-3" />
                            {leadScore}%
                          </span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}>
                        {lead.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMail className="w-4 h-4 mr-2 text-gray-400" />
                        {lead.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiPhone className="w-4 h-4 mr-2 text-gray-400" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {[lead.city, lead.area, lead.locality].filter(Boolean).join(", ") || "Location not specified"}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="px-6 py-4 bg-gray-50 border-y border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Requirements</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Property Type:</span>
                        <p className="font-medium text-gray-900">{lead.propertyType || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Budget:</span>
                        <p className="font-medium text-gray-900">{lead.budget || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Typology:</span>
                        <p className="font-medium text-gray-900">{lead.typology || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Facing:</span>
                        <p className="font-medium text-gray-900">{lead.facing || "Not specified"}</p>
                      </div>
                    </div>
                    
                    {lead.projectName && lead.projectName !== "N/A" && (
                      <div className="mt-3">
                        <span className="text-gray-500">Project Interest:</span>
                        <p className="font-medium text-gray-900">{lead.projectName}</p>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  {(lead.remark && lead.remark !== "N/A") && (
                    <div className="px-6 py-3">
                      <span className="text-sm text-gray-500">Remarks:</span>
                      <p className="text-sm text-gray-700 mt-1">{lead.remark}</p>
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 mr-1" />
                        Assigned {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1" />
                        {new Date(lead.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}