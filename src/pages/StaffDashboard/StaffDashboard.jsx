// pages/StaffDashboard/StaffDashboard.jsx
import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function StaffDashboard() {
  return (
    <DashboardLayout title="Staff Dashboard">
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome, Staff</h1>
        <p>This is your staff dashboard.</p>
      </div>
    </DashboardLayout>
  );
}