// FilterLead.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";

const FilterLead = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("https://a-new-vercel.vercel.app/api/leads");
      if (Array.isArray(res.data)) {
        setLeads(res.data);
        setFilteredLeads(res.data);
      } else if (Array.isArray(res.data.data)) {
        setLeads(res.data.data);
        setFilteredLeads(res.data.data);
      } else {
        setLeads([]);
        setFilteredLeads([]);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      setLeads([]);
      setFilteredLeads([]);
    }
  };

  const handleFilter = () => {
    let data = leads;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      data = data.filter((lead) => {
        const createdDate = new Date(lead.createdOn);
        return createdDate >= start && createdDate <= end;
      });
    }

    setFilteredLeads(data);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredLeads(leads);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredLeads.slice(startIndex, startIndex + pageSize);

  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DashboardLayout>

    
    <div className="p-6">
      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={resetFilters}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset Filters
        </button>
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-2">Sl No</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Lead Source</th>
              <th className="px-4 py-2">Follow Up By</th>
              <th className="px-4 py-2">Lead Status</th>
              <th className="px-4 py-2">Remark</th>
              <th className="px-4 py-2">Created On</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((lead, index) => (
                <tr key={lead.id || index} className="border-t">
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2">{startIndex + index + 1}</td>
                  <td className="px-4 py-2">{lead.fullName}</td>
                  <td className="px-4 py-2">{lead.projectName}</td>
                  <td className="px-4 py-2">{lead.leadSource}</td>
                  <td className="px-4 py-2">{lead.followUpBy}</td>
                  <td className="px-4 py-2">{lead.leadStatus}</td>
                  <td className="px-4 py-2">{lead.remark}</td>
                  <td className="px-4 py-2">{lead.createdOn}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="text-center text-gray-500 py-4"
                >
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {">>"}
        </button>

        {/* Page size dropdown */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default FilterLead;