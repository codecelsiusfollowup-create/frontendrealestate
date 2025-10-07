import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const dealerId = user?._id || user?.id;

      if (!user || user.role !== "dealer" || !dealerId) {
        console.error("Dealer ID missing or user not dealer.");
        return;
      }

      try {
        const res = await axios.get(`https://backend-six-plum-52.vercel.app/api/users/staff/${dealerId}`);
        setStaffList(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    try {
      await axios.delete(`https://backend-six-plum-52.vercel.app/api/users/staff/${id}`);
      setStaffList(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete staff");
    }
  };

  return (
    <DashboardLayout title="Manage Staff">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Staff</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Password</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id} className="border-t">
                  <td className="p-3">{staff.username}</td>
                  <td className="p-3">{staff.email}</td>
                  <td className="p-3">********</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleDelete(staff._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {staffList.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No staff created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}