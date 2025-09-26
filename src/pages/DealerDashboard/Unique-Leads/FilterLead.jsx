// FilterLead.jsx  –  Premium Edition
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";
import { RotateCcw, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const StaffFilterLead = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("https://backend-six-indol-62.vercel.app/api/leads");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setLeads(data);
      setFilteredLeads(data);
    } catch {
      setLeads([]);
      setFilteredLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = leads.filter(l => {
      const d = new Date(l.createdOn || l.createdAt);
      return d >= start && d <= end;
    });
    setFilteredLeads(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredLeads(leads);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredLeads.slice(startIndex, startIndex + pageSize);

  const paginate = page => page >= 1 && page <= totalPages && setCurrentPage(page);

  const SkeletonRow = () => (
    <tr className="border-b border-slate-200">
      {[...Array(11)].map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen from-slate-50 via-slate-100 to-slate-50 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Hero Header */}
          <div className="bg-white/60 backdrop-blur-md shadow-lg p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Filter Leads</h1>
            <p className="text-slate-600 mt-1 text-sm md:text-base">
              Narrow down your leads by date range in a snap.
            </p>
          </div>

          {/* Filter Card */}
          <div className="bg-white/70 backdrop-blur-md  shadow-lg p-4 md:p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">From</span>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">To</span>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2 ml-auto mt-4 sm:mt-0">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-rose-600 border border-rose-300 rounded-lg hover:bg-rose-50 transition"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleFilter}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow"
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-700">
                <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                  <tr>
                    <th className="px-5 py-4"><input type="checkbox" className="rounded" /></th>
                    <th className="px-5 py-4">Sl</th>
                    <th className="px-5 py-4">Full Name</th>
                    <th className="px-5 py-4">Project</th>
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">Remark</th>
                    <th className="px-5 py-4">Created On</th>
                    <th className="px-5 py-4">Temp</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [...Array(pageSize)].map((_, i) => <SkeletonRow key={i} />)
                    : currentData.map((lead, i) => (
                        <tr
                          key={lead._id || i}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-5 py-4"><input type="checkbox" className="rounded" /></td>
                          <td className="px-5 py-4 font-medium">{startIndex + i + 1}</td>
                          <td className="px-5 py-4 font-semibold text-slate-900">{lead.fullName}</td>
                          <td className="px-5 py-4">{lead.projectName}</td>
                          <td className="px-5 py-4">{lead.leadSource}</td>
                          <td className="px-5 py-4 max-w-xs truncate" title={lead.remark}>{lead.remark || "-"}</td>
                          <td className="px-5 py-4">{new Date(lead.createdOn || lead.createdAt).toLocaleDateString()}</td>
                          <td className="px-5 py-4">{lead.status || "-"}</td>
                          <td className="px-5 py-4">
                            <button className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                          </td>
                        </tr>
                      ))}
                  {!loading && currentData.length === 0 && (
                    <tr>
                      <td colSpan="11" className="text-center py-12 text-slate-500">
                        No leads found for the selected range
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {!loading && filteredLeads.length > 0 && (
            <div className="bg-white/70 backdrop-blur-md shadow-lg px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-slate-600 mb-2 sm:mb-0">
                Showing {startIndex + 1}–{Math.min(startIndex + pageSize, filteredLeads.length)} of {filteredLeads.length} results
              </p>
              <div className="flex items-center space-x-2">
                <button onClick={() => paginate(1)} disabled={currentPage === 1} className="p-1 rounded-md border border-slate-300 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded-md border border-slate-300 disabled:opacity-50">Prev</button>
                <span className="px-3 text-sm font-medium">{currentPage} / {totalPages || 1}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md border border-slate-300 disabled:opacity-50">Next</button>
                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="p-1 rounded-md border border-slate-300 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
                <select
                  value={pageSize}
                  onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                  className="ml-2 border border-slate-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}/page</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffFilterLead;