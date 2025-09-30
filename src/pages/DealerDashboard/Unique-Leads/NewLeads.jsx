import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";
import { CSVLink } from "react-csv";
import { ChevronLeft, ChevronRight, Download, RotateCcw, Users, Phone } from "lucide-react";
import { io } from "socket.io-client";

export default function StaffNewLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [expandedRow, setExpandedRow] = useState(null);
  const scrollRef = useRef(null);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [editingActionId, setEditingActionId] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [isActive, setIsActive] = useState(false);
  const socketRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  // ------------------ SOCKET.IO ------------------
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?._id) return;

  // connect socket
  socketRef.current = io("https://backend-six-indol-62.vercel.app");

  // join room
  socketRef.current.emit("join-room", user._id);

  // listen for new leads
  socketRef.current.on("new-leads", (newLeads) => {
    console.log("🔔 New leads received via socket:", newLeads);
    setLeads((prev) => [...newLeads, ...prev]);
  });

  return () => {
    socketRef.current.disconnect();
  };
}, []);


  const handleAssignLeads = async () => {
    if (!selectedLeads.length || !selectedUser) return alert("Select at least one lead and a staff member");

    const payload = { leadIds: selectedLeads, userId: selectedUser, status: leadStatus || "New", remark, isActive };
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://backend-six-indol-62.vercel.app/api/leads/assign", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("Leads assigned successfully!");
        setSelectedLeads([]);
        setSelectedUser("");
        setRemark("");
        setLeadStatus("");
        setIsAssignModalOpen(false);
        // ✅ Optional: already handled via socket
      } else {
        alert(`Assignment failed: ${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error assigning leads");
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const dealerId = user?._id || user?.id;

      if (!user || user.role !== "dealer" || !dealerId) {
        console.error("Dealer ID missing or user not dealer.");
        return;
      }

      try {
        const res = await axios.get(`https://backend-six-indol-62.vercel.app/api/users/staff/${dealerId}`);
        setStaffList(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
  }, []);


  const handleStatusChange = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    setEditingStatusId(null);
  };

  const handleActionChange = (leadId, newAction) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === leadId ? { ...lead, action: newAction } : lead
      )
    );
    setEditingActionId(null);
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("https://backend-six-indol-62.vercel.app/api/leads");
        if (Array.isArray(res.data)) {
          setLeads(res.data);
        } else if (Array.isArray(res.data.data)) {
          setLeads(res.data.data);
        } else {
          setLeads([]);
        }
      } catch (err) {
        console.error("Error fetching leads", err);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const tabs = [
    "All",
    "Fresh Leads",
    "Follow Up Leads",
    "Deal Won Leads",
    "Not Interested",
    "Pending Follow Up",
    "Junk",
    "SV Planned",
    "SV Done",
    "Interested",
    "Revisit",
  ];

  // 🔹 Filter by Tab
  const filteredByTab =
    activeTab === "All"
      ? leads
      : leads.filter(
        (lead) =>
          lead.leadStatus?.toLowerCase().trim() ===
          activeTab.toLowerCase().trim()
      );


  const filteredBySearch = filteredByTab.filter((lead) =>
    Object.values(lead).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBySearch.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredBySearch.length / rowsPerPage);

  const handleReset = () => {
    setActiveTab("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const headers = [
    { label: "Sl No", key: "slNo" },
    { label: "Full Name", key: "fullName" },
    { label: "Project Name", key: "projectName" },
    { label: "Lead Source", key: "leadSource" },
    { label: "Follow Up By", key: "followUpBy" },
    { label: "Lead Status", key: "leadStatus" },
    { label: "Remark", key: "remark" },
    { label: "Created On", key: "createdAt" },
    { label: "Status", key: "status" },
    { label: "Property Type", key: "propertyType" },
    { label: "City", key: "city" },
    { label: "Budget", key: "budget" },
    { label: "Role Name", key: "roleName" },
    { label: "Mobile", key: "mobile" },
    { label: "Created By", key: "createdBy" },
    { label: "Last Updated", key: "lastUpdated" },
  ];

  const csvData = filteredBySearch.map((lead, index) => ({
    slNo: index + 1,
    fullName: lead.fullName,
    projectName: lead.projectName,
    leadSource: lead.leadSource,
    followUpBy: lead.followUpBy || "N/A",
    leadStatus: lead.leadStatus || "N/A",
    remark: lead.remark || "",
    createdAt: lead.createdAt
      ? new Date(lead.createdAt).toLocaleString()
      : "N/A",
    status: lead.status || "Cold",
    propertyType: lead.propertyType || "N/A",
    city: lead.city || "N/A",
    budget: lead.budget || "N/A",
    roleName: lead.roleName || "N/A",
    mobile: lead.mobile || "N/A",
    createdBy: lead.createdBy || "N/A",
    lastUpdated: lead.updatedAt
      ? new Date(lead.updatedAt).toLocaleString()
      : "N/A",
  }));

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <DashboardLayout>
      <div className=" min-h-screen">
        <div className="bg-white  shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Lead Management</h1>
            <p className="text-blue-100 mt-1">Manage and track all your leads efficiently</p>
          </div>

          {/* Tabs Section */}
          <div className="border-b border-gray-200">
            <div className="relative">
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-white to-transparent pl-2 pr-4 flex items-center"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <div
                ref={scrollRef}
                className="flex space-x-1 overflow-x-auto mx-12 py-3 px-2 scrollbar-hide"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === tab
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-white to-transparent pr-2 pl-4 flex items-center"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <CSVLink
                  data={csvData}
                  headers={headers}
                  filename={`leads_${activeTab}_${new Date().toISOString()}.csv`}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </CSVLink>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filters
                </button>

                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  disabled={selectedLeads.length === 0}
                  className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors shadow-sm ${selectedLeads.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Assign Lead ({selectedLeads.length})
                </button>

                <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Decrypt Mobile
                </button>
              </div>

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search leads..."
                  className="w-full sm:w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    ✖
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remark</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRows.length > 0 ? (
                    currentRows.map((lead, index) => (
                      <React.Fragment key={lead._id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                setExpandedRow(
                                  expandedRow === lead._id ? null : lead._id
                                )
                              }
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {expandedRow === lead._id ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLeads([...selectedLeads, lead._id]);
                                } else {
                                  setSelectedLeads(selectedLeads.filter((id) => id !== lead._id));
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {indexOfFirstRow + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {lead.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {lead.projectName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.leadSource}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {lead.remark}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.createdAt
                              ? new Date(lead.createdAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lead._id === editingStatusId ? (
                              <select
                                value={lead.status || "Cold"}
                                onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                onBlur={() => setEditingStatusId(null)}
                                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Hot">Hot</option>
                                <option value="Warm">Warm</option>
                                <option value="Cold">Cold</option>
                              </select>
                            ) : (
                              <button
                                onClick={() => setEditingStatusId(lead._id)}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${lead.status === "Hot"
                                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                                    : lead.status === "Warm"
                                      ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                  }`}
                              >
                                {lead.status || "Cold"}
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lead._id === editingActionId ? (
                              <select
                                value={lead.action || ""}
                                onChange={(e) => handleActionChange(lead._id, e.target.value)}
                                onBlur={() => setEditingActionId(null)}
                                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select</option>
                                <option value="Crosscall">Crosscall</option>
                                <option value="Immediate Action">Immediate</option>
                                <option value="Re-Assign">Re-Assign</option>
                              </select>
                            ) : (
                              <button
                                onClick={() => setEditingActionId(lead._id)}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${lead.action
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                              >
                                {lead.action || "Select"}
                              </button>
                            )}
                          </td>
                        </tr>

                        {expandedRow === lead._id && (
                          <tr>
                            <td colSpan="12" className="px-6 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                  <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                                  <dl className="space-y-2">
                                    <div>
                                      <dt className="text-sm text-gray-500">Property Type</dt>
                                      <dd className="text-sm font-medium text-gray-900">{lead.propertyType || "N/A"}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-sm text-gray-500">City</dt>
                                      <dd className="text-sm font-medium text-gray-900">{lead.city || "N/A"}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-sm text-gray-500">Budget</dt>
                                      <dd className="text-sm font-medium text-gray-900">{lead.budget || "N/A"}</dd>
                                    </div>
                                  </dl>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                  <h4 className="font-medium text-gray-900 mb-2">Contact Info</h4>
                                  <dl className="space-y-2">
                                    <div>
                                      <dt className="text-sm text-gray-500">Mobile</dt>
                                      <dd className="text-sm font-medium text-gray-900">{lead.mobile || "N/A"}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-sm text-gray-500">Role</dt>
                                      <dd className="text-sm font-medium text-gray-900">{lead.roleName || "N/A"}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-sm text-gray-500">Created By</dt>
                                      <dd className="text-sm font-medium text-gray-900">{lead.createdBy || "N/A"}</dd>
                                    </div>
                                  </dl>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                  <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                                  <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit Lead ✏️</button>
                                    <button className="text-green-600 hover:text-green-800 text-sm">View History 📋</button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.695 0-5.056-1.54-6.337-3.766" />
                          </svg>
                          <p className="mt-2 text-lg font-medium text-gray-900">No leads found</p>
                          <p className="text-gray-500">Try adjusting your filters or search query</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstRow + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastRow, filteredBySearch.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredBySearch.length}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                  <option value={100}>100 per page</option>
                </select>

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Modal */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Assign Leads</h3>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Assign To User */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To User
                  </label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select User</option>
                    {staffList.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lead Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Status
                  </label>
                  <select
                    value={leadStatus}
                    onChange={(e) => setLeadStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>

                {/* Remark */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remark
                  </label>
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Add any notes..."
                  />
                </div>

                {/* Active checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Set as active
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignLeads}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Assign Leads
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}