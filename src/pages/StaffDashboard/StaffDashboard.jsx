import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useFCM } from "../../hooks/useFCM";

export default function StaffDashboard() {
  const staffData = JSON.parse(localStorage.getItem("staff"));
  const staffId = staffData?._id;

  useFCM(staffId);

  if (!staffData) return <p>Please login to access the dashboard.</p>;

  return (
    <DashboardLayout title="Staff Dashboard">
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome, {staffData.username}</h1>
        <p>This is your staff dashboard.</p>
      </div>
    </DashboardLayout>
  );
}