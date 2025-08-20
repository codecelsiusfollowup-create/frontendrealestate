import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ManageDealers from "./dealerlist";

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div>
        <ManageDealers/>
      </div>
    </DashboardLayout>
  );
}