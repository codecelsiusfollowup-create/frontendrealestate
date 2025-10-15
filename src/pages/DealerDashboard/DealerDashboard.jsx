// pages/DealerDashboard/DealerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  PhoneIncoming,
  Calendar,
  FileText,
  Plus,
  Eye,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "https://backend-six-plum-52.vercel.app/";

/* ---------- tiny helpers ---------- */
const currency = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const Icon = ({ children, className = "" }) => (
  <div className={`p-3 rounded-xl ${className}`}>{children}</div>
);

const StatCard = ({ label, value, icon, color = "indigo" }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
    <Icon className={`bg-${color}-100 text-${color}-700`}>{icon}</Icon>
  </div>
);

const QuickAction = ({ label, icon, onClick, color = "indigo" }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
  >
    <div className={`p-3 rounded-xl bg-${color}-100 text-${color}-700`}>{icon}</div>
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </button>
);

const statusColor = {
  scheduled: "bg-amber-100 text-amber-700 border-amber-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-slate-100 text-slate-700 border-slate-200",
};

/* ---------------------------------------------------- */
export default function DealerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStaff: 0,
    totalLeads: 0,
    newLeadsToday: 0,
    visitsToday: 0,
    pendingFollowUps: 0,
    dealsWon: 0,
    totalRevenue: 0,
  });
  const [recents, setRecents] = useState({ visits: [], followUps: [] });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const dealerId = user?._id || user?.id;

  useEffect(() => {
    if (!user || user.role !== "dealer") navigate("/login");
  }, [user, navigate]);

  /* ---------- fetch dashboard data ---------- */
  // useEffect(() => {
  //   if (!dealerId) return;
  //   (async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const [statRes, actRes] = await Promise.all([
  //         axios.get(`${BACKEND}/api/dealer/dashboard-stats/${dealerId}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }),
  //         axios.get(`${BACKEND}/api/dealer/recent-activities/${dealerId}`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }),
  //       ]);
  //       setStats(statRes.data.data);
  //       setRecents(actRes.data.data);
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [dealerId]);

  /* ---------- handlers ---------- */
  const go = (path) => navigate(path);
  const refresh = () => window.location.reload();

  if (loading)
    return (
      <DashboardLayout title="Dealer Dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 grid place-content-center text-slate-500">
          <svg className="animate-spin h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="mt-3">Loading dashboard…</p>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout title="Dealer Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, {user?.username}</h1>
          <p className="mt-1 text-sm text-slate-500">Here's your business at a glance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Staff" value={stats.totalStaff} icon={<Users size={20} />} color="indigo" />
          <StatCard label="Total Leads" value={stats.totalLeads} icon={<FileText size={20} />} color="blue" />
          <StatCard label="New Leads Today" value={stats.newLeadsToday} icon={<Plus size={20} />} color="green" />
          <StatCard label="Visits Today" value={stats.visitsToday} icon={<Calendar size={20} />} color="purple" />
          <StatCard label="Pending Follow-ups" value={stats.pendingFollowUps} icon={<PhoneIncoming size={20} />} color="rose" />
          <StatCard label="Deals Won" value={stats.dealsWon} icon={<UserCheck size={20} />} color="emerald" />
          <StatCard label="Total Revenue" value={currency(stats.totalRevenue)} icon={<TrendingUp size={20} />} color="amber" />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <QuickAction label="Create Lead" icon={<Plus size={18} />} onClick={() => go("/dealer/create-lead")} />
            <QuickAction label="Manage Staff" icon={<Users size={18} />} onClick={() => go("/dealer/manage-staff")} />
            <QuickAction label="New Leads" icon={<FileText size={18} />} onClick={() => go("/dealer/new-leads")} color="blue" />
            <QuickAction label="Filter Leads" icon={<Eye size={18} />} onClick={() => go("/dealer/filter-leads")} color="purple" />
            <QuickAction label="Lead Status" icon={<TrendingUp size={18} />} onClick={() => go("/dealer/lead-status")} color="green" />
            <QuickAction label="Refresh" icon={<RotateCcw size={18} />} onClick={refresh} color="gray" />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Visits */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Recent Visits</h3>
            <ul className="space-y-3">
              {recents.visits?.length ? (
                recents.visits.map((v, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-slate-900">{v.leadName}</p>
                      <p className="text-slate-500">{new Date(v.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColor[v.status]}`}>{v.status}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 text-sm">No visits yet</li>
              )}
            </ul>
          </div>

          {/* Follow-ups */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Recent Follow-ups</h3>
            <ul className="space-y-3">
              {recents.followUps?.length ? (
                recents.followUps.map((f, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-slate-900">{f.leadName}</p>
                      <p className="text-slate-500">{new Date(f.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColor[f.status]}`}>{f.status}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 text-sm">No follow-ups yet</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}