// pages/DealerDashboard/DealerDashboard.jsx
import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function DealerDashboard() {
  return (
    <DashboardLayout title="Dealer Dashboard">
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome, Dealer</h1>
        <p>This is your dealer dashboard.</p>
      </div>
    </DashboardLayout>
  );
}
