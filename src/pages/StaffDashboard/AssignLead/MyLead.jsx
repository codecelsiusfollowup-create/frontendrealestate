// frontend/src/pages/staff/StaffAssign.jsx
import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  FiStar,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiX
} from "react-icons/fi";

/* ---------- Re-usable modals (unchanged) ---------- */
const FollowUpModal = memo(({ isOpen, onClose, followUpData, onSubmit, onInputChange }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Schedule Follow-up</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Method</label>
            <select
              value={followUpData.type}
              onChange={(e) => onInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="call">Phone Call</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={followUpData.date}
                onChange={(e) => onInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={followUpData.time}
                onChange={(e) => onInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={followUpData.notes}
              onChange={(e) => onInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Add notes about this follow-up..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onSubmit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Follow-up
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const VisitModal = memo(({ isOpen, onClose, visitData, onSubmit, onInputChange }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Schedule Visit</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={visitData.date}
                onChange={(e) => onInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={visitData.time}
                onChange={(e) => onInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={visitData.duration}
              onChange={(e) => onInputChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={visitData.location}
              onChange={(e) => onInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Visit location..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={visitData.notes}
              onChange={(e) => onInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Add notes about this visit..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onSubmit}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Schedule Visit
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ---------- Main Component ---------- */
export default function StaffAssign() {
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("uncontacted");
  const [sortBy, setSortBy] = useState("createdAt");

  const [followUpModal, setFollowUpModal] = useState(false);
  const [visitModal, setVisitModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [followUpData, setFollowUpData] = useState({
    type: 'call',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: '',
    status: 'scheduled',
    reminder: true
  });

  const [visitData, setVisitData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    duration: '30',
    location: '',
    notes: '',
    status: 'scheduled',
    outcome: ''
  });

  const API_BASE_URL = "https://backend-six-plum-52.vercel.app";

  // ---------- Helpers ----------
  const toastError = (msg) => toast.error(msg, { position: "top-right" });
  const toastSuccess = (msg) => toast.success(msg, { position: "top-right" });
  const toastInfo = (msg) => toast.info(msg, { position: "top-right" });

  // ---------- Optimized input handlers ----------
  const handleFollowUpInputChange = useCallback((field, value) => {
    setFollowUpData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleVisitInputChange = useCallback((field, value) => {
    setVisitData(prev => ({ ...prev, [field]: value }));
  }, []);

  // ---------- Fetch My Leads ----------
  const fetchMyLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const res = await axios.get(
        `${API_BASE_URL}/api/assignlead`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMyLeads(res.data.data || []);
        if (!res.data.data?.length) toastInfo("No leads assigned to you yet.");
      } else {
        setError(res.data.message || "Failed to fetch leads");
        toastError(res.data.message || "Failed to fetch leads");
      }
    } catch (err) {
      console.error("Error fetching leads:", err.response?.data || err.message);
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      toastError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Add Follow-up ----------
const addFollowUp = async () => {
  if (!selectedLead) return toastError("Select a lead first!");

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Missing auth token");

    // Auto-schedule: if user didn’t pick date/time, default to +2 minutes ahead
    let payload = { ...followUpData };
    if (!payload.date || !payload.time) {
      payload.minutesAhead = 2;
    } else {
      payload.date = new Date(`${payload.date}T${payload.time}:00`).toISOString();
    }

    const res = await axios.post(
      `https://backend-six-plum-52.vercel.app/api/leads/${selectedLead._id}/followup`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      fetchMyLeads();
      setFollowUpModal(false);
      resetFollowUpForm();
      toastSuccess(res.data.message || "Follow-up scheduled successfully!");
    }

  } catch (err) {
    console.error("Error adding follow-up:", err.response?.data || err.message);
    toastError(err.response?.data?.message || "Failed to add follow-up");
  }
};

  // ---------- Add Visit ----------
  const addVisit = async () => {
    if (!selectedLead) return toastError("Select a lead first!");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/api/leads/${selectedLead._id}/visit`,
        visitData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        fetchMyLeads();
        setVisitModal(false);
        resetVisitForm();
        toastSuccess("Visit scheduled successfully!");
      }
    } catch (err) {
      console.error("Error adding visit:", err.response?.data || err.message);
      const msg = err.response?.data?.message || "Failed to add visit";
      setError(msg);
      toastError(msg);
    }
  };

  // ---------- Reset Forms ----------
  const resetFollowUpForm = () => {
    setFollowUpData({
      type: 'call',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      notes: '',
      status: 'scheduled',
      reminder: true
    });
  };

  const resetVisitForm = () => {
    setVisitData({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      duration: '30',
      location: '',
      notes: '',
      status: 'scheduled',
      outcome: ''
    });
  };

  // ---------- Utility ----------
  const getUpcomingActivities = (lead) => {
    const now = new Date();
    const activities = [];

    lead.followups?.forEach(followUp => {
      const followUpDate = new Date(followUp.date);
      if (followUpDate >= now && followUp.status === 'scheduled') {
        activities.push({ type: 'follow-up', data: followUp, date: followUpDate });
      }
    });

    lead.visits?.forEach(visit => {
      const visitDate = new Date(visit.date);
      if (visitDate >= now && visit.status === 'scheduled') {
        activities.push({ type: 'visit', data: visit, date: visitDate });
      }
    });

    return activities.sort((a, b) => a.date - b.date);
  };

  const hasAnyActivity = (lead) => {
    const hasFollowUps = lead.followUps && lead.followUps.length > 0;
    const hasVisits = lead.visits && lead.visits.length > 0;
    return hasFollowUps || hasVisits;
  };

  // ---------- Initial Fetch ----------
  useEffect(() => {
    fetchMyLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Lead Score ----------
  const getLeadScore = (lead) => {
    let score = 0;
    if (lead.budget && lead.budget !== "N/A") score += 25;
    if (lead.propertyType && lead.propertyType !== "N/A") score += 20;
    if (lead.phone && lead.email) score += 15;
    if (lead.projectName && lead.projectName !== "N/A") score += 20;
    if (lead.remark && lead.remark !== "N/A") score += 20;
    if (lead.followUps && lead.followUps.length > 0) score += 10;
    if (lead.visits && lead.visits.length > 0) score += 15;
    return Math.min(score, 100);
  };

  // ---------- Lead Status ----------
  const getLeadStatus = (lead) => {
    const daysSinceCreated = Math.floor(
      (new Date() - new Date(lead.createdAt)) / (1000 * 60 * 60 * 24)
    );
    const activities = getUpcomingActivities(lead);
    const recentActivity = activities.length > 0;

    if (recentActivity) return "active";
    if (daysSinceCreated <= 1) return "new";
    if (daysSinceCreated <= 7) return "warm";
    if (daysSinceCreated <= 30) return "nurture";
    return "cold";
  };

  // ---------- Filtering & Sorting ----------
  const filteredAndSortedLeads = myLeads
    .filter(lead => {
      const leadHasActivity = hasAnyActivity(lead);
      if (filter === "uncontacted") return !leadHasActivity;
      if (filter === "all") return true;
      if (filter === "active") return getLeadStatus(lead) === "active";
      if (filter === "new") return getLeadStatus(lead) === "new";
      if (filter === "hot") return getLeadScore(lead) >= 70;
      if (filter === "followup") return getUpcomingActivities(lead).length > 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "score") return getLeadScore(b) - getLeadScore(a);
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "nextActivity") {
        const aActivities = getUpcomingActivities(a);
        const bActivities = getUpcomingActivities(b);
        if (aActivities.length === 0) return 1;
        if (bActivities.length === 0) return -1;
        return aActivities[0].date - bActivities[0].date;
      }
      return 0;
    });

  // ---------- UI Colors ----------
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "new": return "bg-green-100 text-green-800";
      case "warm": return "bg-yellow-100 text-yellow-800";
      case "nurture": return "bg-purple-100 text-purple-800";
      case "cold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  /* ---------- Render ---------- */
  return (
    <DashboardLayout title="Lead Management Dashboard">
      <ToastContainer autoClose={3000} hideProgressBar={false} closeOnClick />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {filter === "uncontacted" ? "Fresh Leads - Uncontacted" : "My Assigned Leads"}
          </h2>
          <p className="text-gray-600">
            {filter === "uncontacted" 
              ? "Manage newly assigned leads that haven't been contacted yet"
              : "Manage your assigned leads and track their progress"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fresh Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myLeads.filter(lead => !hasAnyActivity(lead)).length}
                </p>
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
                  {myLeads.filter(lead => !hasAnyActivity(lead) && getLeadStatus(lead) === "new").length}
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
                <p className="text-sm font-medium text-gray-600">Hot Fresh Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myLeads.filter(lead => !hasAnyActivity(lead) && getLeadScore(lead) >= 70).length}
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
                <p className="text-sm font-medium text-gray-600">Contacted Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myLeads.filter(lead => hasAnyActivity(lead)).length}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Leads</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="uncontacted">Uncontacted Leads</option>
                <option value="all">All Assigned Leads</option>
                <option value="new">New Leads</option>
                <option value="hot">Hot Leads (High Score)</option>
                <option value="followup">Upcoming Follow-ups</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt">Newest First</option>
                <option value="score">Lead Score</option>
                <option value="name">Name A-Z</option>
                <option value="nextActivity">Next Activity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading leads...</span>
          </div>
        )}

        {/* Error */}
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

        {/* Empty States */}
        {!loading && !error && filteredAndSortedLeads.length === 0 && filter === "uncontacted" && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Great job!</h3>
            <p className="text-gray-500">
              All assigned leads have been contacted. Switch to "All Assigned Leads" to view your complete lead list.
            </p>
          </div>
        )}

        {!loading && !error && filteredAndSortedLeads.length === 0 && filter !== "uncontacted" && (
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
                  {/* Priority Badge for Fresh Leads */}
                  {!hasAnyActivity(lead) && (
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <FiStar className="w-4 h-4" />
                        Fresh Lead - Contact Soon!
                      </div>
                    </div>
                  )}

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

                  {/* Quick Action for Fresh Leads */}
                  {!hasAnyActivity(lead) && (
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setFollowUpData({...followUpData, type: 'call'});
                            setFollowUpModal(true);
                          }}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <FiPhone className="w-4 h-4" />
                          Follow Up
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setVisitData({...visitData, location: lead.projectName || lead.city || ''});
                            setVisitModal(true);
                          }}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FiHome className="w-4 h-4" />
                          Schedule Visit
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons for Contacted Leads */}
                  {hasAnyActivity(lead) && (
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setFollowUpModal(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <FiPhone className="w-4 h-4" />
                          Add Follow-up
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setVisitModal(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FiHome className="w-4 h-4" />
                          Add Visit
                        </button>
                      </div>
                    </div>
                  )}

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

        {/* Modals */}
        <FollowUpModal 
          isOpen={followUpModal}
          onClose={() => setFollowUpModal(false)}
          followUpData={followUpData}
          onSubmit={addFollowUp}
          onInputChange={handleFollowUpInputChange}
        />
        <VisitModal 
          isOpen={visitModal}
          onClose={() => setVisitModal(false)}
          visitData={visitData}
          onSubmit={addVisit}
          onInputChange={handleVisitInputChange}
        />
      </div>
    </DashboardLayout>
  );
}