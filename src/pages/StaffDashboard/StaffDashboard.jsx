// frontend/src/pages/staff/StaffDashboard.jsx
import React, { useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useFCM } from "../../hooks/useFCM";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Redirect if not logged in or not staff
    if (!userData || userData.role.toLowerCase() !== "staff") {
      navigate("/login");
    }
  }, [userData, navigate]);

  const staffId = userData?._id;
  useFCM(staffId);

  if (!userData) return <p>Please login to access the dashboard.</p>;

  return (
    <DashboardLayout title="Staff Dashboard">
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome, {userData.username}</h1>
        <p>This is your staff dashboard.</p>
      </div>
    </DashboardLayout>
  );
}