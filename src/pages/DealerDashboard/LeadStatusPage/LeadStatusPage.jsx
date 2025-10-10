import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "https://backend-six-plum-52.vercel.app/";

const statusColor = {
  scheduled: "bg-amber-100 text-amber-700 border-amber-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-slate-100 text-slate-700 border-slate-200",
};

const DealerLeadStatusPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeadStatuses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return setLeads([]);

      const { data } = await axios.get(`${BACKEND}/api/users/lead-statuses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = (data.data || []).filter(
        (l) => (l.followups?.length || 0) > 0 || (l.visits?.length || 0) > 0
      );
      setLeads(filtered);
    } catch (e) {
      console.error(e);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadStatuses();
  }, []);

  const latest = (arr) =>
    arr?.length
      ? arr.reduce((a, b) => (new Date(b.date) > new Date(a.date) ? b : a)).status
      : "pending";

  const Badge = ({ children }) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor[children]}`}
    >
      {children}
    </span>
  );

  const Row = ({ lead }) => (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
        {lead.fullName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
        {lead.assignedTo?.fullName || <span className="text-slate-400">—</span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge>{latest(lead.followups)}</Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge>{latest(lead.visits)}</Badge>
      </td>
    </tr>
  );

  if (loading)
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
          <div className="h-96 grid place-content-center text-slate-500">
            <svg
              className="animate-spin h-8 w-8 mx-auto text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="mt-3 text-sm">Loading lead statuses…</p>
          </div>
        </div>
      </DashboardLayout>
    );

  if (!leads.length)
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-600">No leads with follow-ups or visits yet.</p>
            <button
              onClick={fetchLeadStatuses}
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Leads</h1>
            <p className="mt-1 text-sm text-slate-500">
              Status overview for leads with follow-ups or visits.
            </p>
          </div>
          <button
            onClick={fetchLeadStatuses}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                {["Lead Name", "Assigned Staff", "Latest Follow-up", "Latest Visit"].map(
                  (h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {leads.map((l) => (
                <Row key={l._id} lead={l} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DealerLeadStatusPage;