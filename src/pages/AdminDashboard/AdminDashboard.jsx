import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ManageDealers from "./dealerlist";
import DashboardStats from "./DashboardStats";
import DashboardOverview from "./DashboardOverview";
import DashboardNew from "./DashboardNew";

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div>
        <DashboardNew/>
        <DashboardStats/>
        <DashboardOverview/>
        <ManageDealers/>
      </div>
    </DashboardLayout>
  );
}