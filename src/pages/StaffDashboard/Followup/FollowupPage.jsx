import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "https://backend-six-plum-52.vercel.app";

const STATUS_COLORS = {
  scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const FollowupPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchFollowups = async () => {
    setLoading(true);
    try {
      const qs = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : "";
      const { data } = await axios.get(`${BACKEND}/api/leads/followups${qs}`);
      setLeads(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      console.error(e);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowups();
  }, [statusFilter]);

  const handleStatusChange = async (leadId, idx, newStatus) => {
    try {
      setUpdating(true);
      await axios.patch(`${BACKEND}/api/leads/update-followup-status/${leadId}/${idx}`, {
        status: newStatus,
      });
      await fetchFollowups();
    } catch (e) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const Badge = ({ status }) => (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${STATUS_COLORS[status]}`}
    >
      {status}
    </span>
  );

  const TableRow = ({ lead }) => (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
      <td className="px-5 py-4 text-sm font-medium text-slate-900">{lead.fullName}</td>
      <td className="px-5 py-4 text-sm text-slate-600">{lead.email}</td>
      <td className="px-5 py-4 text-sm text-slate-600">{lead.phone}</td>
      <td className="px-5 py-4">
        <div className="space-y-2">
          {lead.followups.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                <span className="font-medium text-slate-700">{f.type.toUpperCase()}</span> •{" "}
                {new Date(f.date).toLocaleDateString()} {f.time && `@ ${f.time}`}
              </div>
            </div>
          ))}
        </div>
      </td>
      <td className="px-5 py-4">
        <Badge status={lead.followups.at(-1)?.status || "pending"} />
      </td>
      <td className="px-5 py-4">
        <div className="space-y-2">
          {lead.followups.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <select
                value={f.status}
                onChange={(e) => handleStatusChange(lead._id, i, e.target.value)}
                disabled={updating}
                className="text-xs border-slate-300 rounded px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );

  if (loading)
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 grid place-content-center text-slate-500">
          <Icon path="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" className="w-8 h-8 animate-spin" />
          <p className="mt-3">Loading follow-ups…</p>
        </div>
      </DashboardLayout>
    );

  if (!leads.length)
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-600">No follow-up leads found.</p>
            <button
              onClick={fetchFollowups}
              className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Refresh →
            </button>
          </div>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Follow-up Leads</h1>
            <p className="mt-1 text-sm text-slate-500">Track and update every follow-up interaction.</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <button
              onClick={fetchFollowups}
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Icon path="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" className="mr-2" />
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                {["Lead Name", "Email", "Phone", "Follow-ups", "Latest Status", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {leads.map((l) => (
                <TableRow key={l._id} lead={l} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FollowupPage;