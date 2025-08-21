import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";
import { CSVLink } from "react-csv";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewLeads() {
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


  const handleStatusChange = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    setEditingStatusId(null);

    // 🔹 API call yaha karna ho toh
    // axios.put(`/api/leads/${leadId}`, { status: newStatus });
  };

  const handleActionChange = (leadId, newAction) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead._id === leadId ? { ...lead, action: newAction } : lead
      )
    );
    setEditingActionId(null);

    // 🔹 API call yaha karna ho toh
    // axios.put(`/api/leads/${leadId}`, { action: newAction });
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("https://a-new-vercel.vercel.app/api/leads");
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

  // 🔹 Tabs list
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

  // 🔹 Tabs Filter
  const filteredByTab =
    activeTab === "All"
      ? leads
      : leads.filter((lead) => lead.leadStatus === activeTab);

  // 🔹 Search Filter
  const filteredBySearch = filteredByTab.filter((lead) =>
    Object.values(lead).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // 🔹 Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBySearch.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredBySearch.length / rowsPerPage);

  // 🔹 Reset Filters
  const handleReset = () => {
    setActiveTab("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // 🔹 CSV Headers
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

  // 🔹 Format CSV Data
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

  // 🔹 Scroll functions for Tabs
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <DashboardLayout>
      <div className="p-4 bg-white rounded-lg shadow-md">
        {/* 🔹 Tabs Slider */}
        <div className="relative flex items-center mb-4">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2 -ml-3"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar mx-8 border-b pb-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600 pb-2"
                  : "text-gray-600 hover:text-gray-800 pb-2"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2 -mr-3"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 🔹 Action Buttons + Search */}
        <div className="flex items-center justify-between mb-4 flex-wrap">
          <div className="flex space-x-4 mb-2 sm:mb-0">
            <CSVLink
              data={csvData}
              headers={headers}
              filename={`leads_${activeTab}_${new Date().toISOString()}.csv`}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Export CSV
            </CSVLink>

            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className={`px-4 py-2 rounded ${selectedLeads.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-400 text-white"
                }`}
              disabled={selectedLeads.length === 0}
            >
              Assign Lead
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Decrypt Mobile No
            </button>
          </div>

          <div className="flex items-center border rounded px-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search here"
              className="outline-none px-2 py-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-2 text-gray-500"
              >
                ✖
              </button>
            )}
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              🔍
            </button>
          </div>
        </div>

        {/* 🔹 Table */}
        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-sm">
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2">
                    <input type="checkbox" />
                  </th>
                  <th className="px-3 py-2">Sl No</th>
                  <th className="px-3 py-2">Full Name</th>
                  <th className="px-3 py-2">Project Name</th>
                  <th className="px-3 py-2">Lead Source</th>
                  <th className="px-3 py-2">Follow Up By</th>
                  <th className="px-3 py-2">Lead Status</th>
                  <th className="px-3 py-2">Remark</th>
                  <th className="px-3 py-2">Created On</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((lead, index) => (
                    <React.Fragment key={lead._id}>
                      <tr className="text-sm border-b hover:bg-gray-100">
                        <td
                          className="px-3 py-2 text-blue-600 cursor-pointer"
                          onClick={() =>
                            setExpandedRow(
                              expandedRow === lead._id ? null : lead._id
                            )
                          }
                        >
                          {expandedRow === lead._id ? "▼" : "▶"}
                        </td>
                        {/* Checkbox inside row */}
                        <td className="px-3 py-2">
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
                          />
                        </td>

                        <td className="px-3 py-2">{indexOfFirstRow + index + 1}</td>
                        <td className="px-3 py-2">{lead.fullName}</td>
                        <td className="px-3 py-2">{lead.projectName}</td>
                        <td className="px-3 py-2">{lead.leadSource}</td>
                        <td className="px-3 py-2">{lead.followUpBy || "N/A"}</td>
                        <td className="px-3 py-2">{lead.leadStatus || "N/A"}</td>
                        <td className="px-3 py-2">{lead.remark}</td>
                        <td className="px-3 py-2">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleString()
                            : "N/A"}
                        </td>

                        {/* 🔹 Status Badge */}
                        {/* 🔹 Status Inline Editable Badge */}
                        <td className="px-3 py-2">
                          {lead._id === editingStatusId ? (
                            <select
                              ref={(el) => {
                                if (el) {
                                  // select render होते ही open हो जाए
                                  setTimeout(() => {
                                    el.focus();
                                    el.click();
                                  }, 0);
                                }
                              }}
                              value={lead.status || "Cold"}
                              onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                              onBlur={() => setEditingStatusId(null)}
                              className="border rounded px-2 py-1 text-sm focus:outline-none"
                            >
                              <option value="Hot">Hot</option>
                              <option value="Warm">Warm</option>
                              <option value="Cold">Cold</option>
                            </select>
                          ) : (
                            <div
                              className="flex items-center space-x-1 cursor-pointer"
                              onClick={() => setEditingStatusId(lead._id)}
                            >
                              {lead.status === "Hot" && (
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
                                  Hot
                                </span>
                              )}
                              {lead.status === "Warm" && (
                                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                                  Warm
                                </span>
                              )}
                              {(!lead.status || lead.status === "Cold") && (
                                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                                  Cold
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* 🔹 Action Inline Editable Dropdown */}
                        <td className="px-3 py-2">
                          {lead._id === editingActionId ? (
                            <select
                              ref={(el) => {
                                if (el) {
                                  // select render होते ही open हो जाए
                                  setTimeout(() => {
                                    el.focus();
                                    el.click();
                                  }, 0);
                                }
                              }}
                              value={lead.action || ""}
                              onChange={(e) => handleActionChange(lead._id, e.target.value)}
                              onBlur={() => setEditingActionId(null)}
                              className="border rounded px-2 py-1 text-sm focus:outline-none"
                            >
                              <option value="">Select Action</option>
                              <option value="Crosscall">Crosscall</option>
                              <option value="Immediate Action">Immediate Action</option>
                              <option value="Re-Assign">Re-Assign</option>
                            </select>
                          ) : (
                            <div
                              className="flex items-center space-x-1 cursor-pointer"
                              onClick={() => setEditingActionId(lead._id)}
                            >
                              {lead.action ? (
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                                  {lead.action}
                                </span>
                              ) : (
                                <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs">
                                  Select Action
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>

                      {expandedRow === lead._id && (
                        <tr className="bg-gray-50 border-b">
                          <td colSpan="12" className="px-6 py-4 text-sm">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <p><strong>History:</strong> ...</p>
                              <p><strong>Edit Lead:</strong> ✏️</p>
                              <p><strong>Property Type:</strong> {lead.propertyType || "N/A"}</p>
                              <p><strong>City:</strong> {lead.city || "N/A"}</p>
                              <p><strong>Budget:</strong> {lead.budget || "N/A"}</p>
                              <p><strong>Role Name:</strong> {lead.roleName || "N/A"}</p>
                              <p><strong>Mobile:</strong> {lead.mobile || "N/A"}</p>
                              <p><strong>Created By:</strong> {lead.createdBy || "N/A"}</p>
                              <p>
                                <strong>Last Updated:</strong>{" "}
                                {lead.updatedAt
                                  ? new Date(lead.updatedAt).toLocaleString()
                                  : "N/A"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-4 text-gray-500">
                      No leads found for {activeTab}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 🔹 Pagination */}
        <div className="flex justify-between items-center mt-4 flex-wrap">
          <div className="flex space-x-2 mb-2 sm:mb-0">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 border rounded"
            >
              «
            </button>
            <span className="px-3 py-1 border rounded bg-blue-600 text-white">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 border rounded"
            >
              »
            </button>
          </div>
          <select
            className="border rounded px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {isAssignModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#0000002b] bg-opacity-10 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 relative">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setIsAssignModalOpen(false)}
              >
                ✖
              </button>

              <h2 className="text-xl font-semibold mb-4">Assign Leads</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Assign To User:</label>
                  <select className="w-full border rounded px-2 py-2">
                    <option>Select User</option>
                    <option>Khalid</option>
                    <option>John</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Lead Status:</label>
                  <select className="w-full border rounded px-2 py-2">
                    <option>Select Lead Status</option>
                    <option>Hot</option>
                    <option>Warm</option>
                    <option>Cold</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Remark:</label>
                <textarea className="w-full border rounded px-2 py-2" rows="3" />
              </div>

              <div className="mt-4 flex items-center">
                <input type="checkbox" id="isActive" className="mr-2" />
                <label htmlFor="isActive">isActive</label>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    // ✅ Assign API call यहाँ कर सकते हो
                    console.log("Assigning leads:", selectedLeads);
                    setIsAssignModalOpen(false);
                    setSelectedLeads([]); // reset
                  }}
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