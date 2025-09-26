import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";

export default function StaffAssign() {
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyLeads = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const res = await axios.get("https://a-new-vercel.vercel.app/api/assignlead", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setMyLeads(res.data.data || []);
        } else {
          setError(res.data.message || "Failed to fetch leads");
        }
      } catch (err) {
        console.error("Error fetching leads:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLeads();
  }, []);

  return (
    <DashboardLayout title="Staff Dashboard">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          My Assigned Leads
        </h2>

        {loading && (
          <p className="text-blue-500 font-medium">Loading leads...</p>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4 border border-red-300">
            {error}
          </div>
        )}

        {!loading && !error && myLeads.length === 0 && (
          <div className="p-6 bg-gray-100 text-gray-600 rounded-lg text-center shadow-sm">
            No leads assigned to you.
          </div>
        )}

        {!loading && !error && myLeads.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myLeads.map((lead) => (
              <div
                key={lead._id}
                className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {lead.fullName}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {lead.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Phone:</strong> {lead.phone}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Lead Source:</strong> {lead.leadSource || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>City:</strong> {lead.city || "N/A"} |{" "}
                  <strong>Area:</strong> {lead.area || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Property:</strong> {lead.property || "N/A"} (
                  {lead.propertyType || "N/A"})
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Budget:</strong> {lead.budget || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Status:</strong> {lead.status || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Remark:</strong> {lead.remark || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Assigned On:</strong>{" "}
                  {new Date(lead.createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full ${
                    lead.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {lead.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}