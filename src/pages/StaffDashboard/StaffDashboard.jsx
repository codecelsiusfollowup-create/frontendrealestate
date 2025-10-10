import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useFCM } from "../../hooks/useFCM";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const StatCard = ({ label, value, icon, color = "indigo" }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-700`}>
      <Icon path={icon} />
    </div>
  </div>
);

const QuickAction = ({ label, icon, onClick, color = "indigo" }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow`}>
    <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-700`}>
      <Icon path={icon} />
    </div>
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </button>
);

export default function StaffDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayVisits: 0,
    pendingFollowups: 0,
    completedTasks: 0,
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!userData || userData.role.toLowerCase() !== "staff") {
      navigate("/login");
    }
  }, [userData, navigate]);

  const staffId = userData?._id;
  useFCM(staffId);

  /* ---------- fetch stats & recent activities ---------- */
  useEffect(() => {
    if (!staffId) return;
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const [statsRes, actRes] = await Promise.all([
          axios.get(`${BACKEND}/api/staff/dashboard-stats/${staffId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BACKEND}/api/staff/recent-activities/${staffId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStats(statsRes.data.data);
        setActivities(actRes.data.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [staffId]);

  if (!userData) return <p className="p-6">Please login to access the dashboard.</p>;

  /* ---------- handlers ---------- */
  const go = (path) => navigate(path);

  return (
    <DashboardLayout title="Staff Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome, {userData.username}
          </h1>
          <p className="mt-1 text-sm text-slate-500">Here's what's happening today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Leads" value={stats.totalLeads} icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          <StatCard label="Today Visits" value={stats.todayVisits} icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <StatCard label="Pending Follow-ups" value={stats.pendingFollowups} icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" color="rose" />
          <StatCard label="Completed Tasks" value={stats.completedTasks} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" color="green" />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <QuickAction label="Add Lead" icon="M12 4v16m8-8H4" onClick={() => go("/staff/add-lead")} />
            <QuickAction label="Schedule Visit" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" onClick={() => go("/staff/schedule-visit")} />
            <QuickAction label="Create Follow-up" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" onClick={() => go("/staff/create-followup")} />
            <QuickAction label="My Leads" icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" onClick={() => go("/staff/leads")} color="purple" />
            <QuickAction label="Reports" icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" onClick={() => go("/staff/reports")} color="gray" />
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <ul className="divide-y divide-slate-200">
              {activities.length ? (
                activities.map((act, i) => (
                  <li key={i} className="px-6 py-4 flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        act.type === "visit"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                      <Icon
                        path={
                          act.type === "visit"
                            ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="text-slate-900 font-medium">{act.leadName}</p>
                      <p className="text-slate-500">
                        {act.type === "visit" ? "Site visit" : "Follow-up"} on{" "}
                        {new Date(act.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        act.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : act.status === "scheduled"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}>
                      {act.status}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-6 py-12 text-center text-slate-500 text-sm">No recent activities</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}