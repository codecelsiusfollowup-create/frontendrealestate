// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Eye, Pencil, Trash2, Search } from "lucide-react";
// import DashboardLayout from "../../../components/DashboardLayout";
// import { useNavigate } from "react-router-dom";
// import FilterBar from "./FilterBar";

// export default function PropertyList({ onSearchResults }) {
//     const [properties, setProperties] = useState([]);
//     const [filteredProperties, setFilteredProperties] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();


//     // ✅ Global fetch function
//     const fetchProperties = async () => {
//         try {
//             const res = await axios.get("https://a-new-vercel.onrender.com/api/properties");

//             // res.data = { properties: [...], total: 1 }

//             setProperties(res.data.properties); // ✅ Correct: this is the array
//             setFilteredProperties(res.data.properties); // ✅ Still correct
//             setTimeout(() => setLoading(false), 1000); // Simulate delay
//         } catch (err) {
//             console.error("Failed to fetch properties", err);
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         fetchProperties();
//     }, []);

//     // ✅ Delete handler
//     const handleDelete = async (propertyId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this property?");
//         if (!confirmDelete) return;

//         try {
//             await axios.delete(`https://a-new-vercel.onrender.com/api/properties/${propertyId}`);
//             alert("Property deleted successfully");
//             fetchProperties(); // Refresh after delete
//         } catch (err) {
//             console.error("Delete failed:", err);
//             alert("Failed to delete property");
//         }
//     };



//     const SkeletonRow = () => (
//         <tr className="animate-pulse border-t">
//             {Array(9)
//                 .fill()
//                 .map((_, idx) => (
//                     <td key={idx} className="p-3">
//                         <div className="h-4 bg-gray-200 rounded w-full"></div>
//                     </td>
//                 ))}
//         </tr>
//     );



//     return (
//         <DashboardLayout title="Admin Dashboard">
//             <div>
//                 {/* 🔍 Search bar */}
//                 <FilterBar onSearchResults={setFilteredProperties} />


//                 {/* 🧾 Property table */}
//                 <table className="min-w-full border-collapse bg-white text-sm shadow-md">
//                     <thead>
//                         <tr className=" text-left text-white bg-blue-500 font-semibold">
//                             <th className="p-3">#</th>
//                             <th className="p-3">Property Name</th>
//                             <th className="p-3">Address</th>
//                             <th className="p-3">Beds</th>
//                             <th className="p-3">Property Type</th>
//                             <th className="p-3">Sqft</th>
//                             <th className="p-3">Dealer</th>
//                             <th className="p-3">Price</th>
//                             <th className="p-3">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? (
//                             Array(5)
//                                 .fill()
//                                 .map((_, i) => <SkeletonRow key={i} />)
//                         ) : Array.isArray(filteredProperties) && filteredProperties.length > 0 ? (
//                             filteredProperties.map((property, index) => (
//                                 <tr key={property._id} className="border-t hover:bg-gray-50 transition-colors">
//                                     <td className="p-3"><input type="checkbox" /></td>
//                                     <td className="p-3 text-blue-600 font-medium">
//                                         #{property._id.slice(-5)}
//                                     </td>
//                                     <td className="p-3">{property.city}</td>
//                                     <td className="p-3">{property.selectedFeatures?.length || 0}</td>
//                                     <td className="p-3">{property.propertyType}</td>
//                                     <td className="p-3">{property.pricePerSqFt || "-"}</td>
//                                     <td className="p-3">{property.companyName}</td>
//                                     <td className="p-3">₹{property.price?.toLocaleString?.() || "N/A"}</td>
//                                     <td className="p-3 flex gap-2">
//                                         <button
//                                             className="bg-blue-100 p-1.5 rounded hover:bg-blue-200"
//                                             onClick={() => navigate(`/admin/property/${property._id}`)}
//                                         >
//                                             <Eye size={16} className="text-blue-600" />
//                                         </button>
//                                         <button className="bg-gray-100 p-1.5 rounded hover:bg-gray-200">
//                                             <Pencil size={16} className="text-gray-600" />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(property._id)}
//                                             className="bg-red-100 p-1.5 rounded hover:bg-red-200"
//                                         >
//                                             <Trash2 size={16} className="text-red-600" />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" className="text-center p-4 text-gray-500">
//                                     No properties found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>



//                 </table>
//             </div>
//         </DashboardLayout>
//     );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";

export default function PropertyList({ onSearchResults }) {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Fetch Properties
    const fetchProperties = async () => {
        try {
            const res = await axios.get("https://a-new-vercel.onrender.com/api/properties");
            setProperties(res.data || []); // safe fallback
            setFilteredProperties(res.data || []);
            console.log(res.data)
            setTimeout(() => setLoading(false), 1000); // simulate delay
        } catch (err) {
            console.error("Failed to fetch properties", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // ✅ Delete handler
    const handleDelete = async (propertyId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://a-new-vercel.onrender.com/api/properties/${propertyId}`);
            alert("Property deleted successfully");
            fetchProperties(); // Refresh list
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete property");
        }
    };

    // 🕳️ Skeleton while loading
    const SkeletonRow = () => (
        <tr className="animate-pulse border-t">
            {Array(9).fill().map((_, idx) => (
                <td key={idx} className="p-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
            ))}
        </tr>
    );

    return (
        <DashboardLayout title="Admin Dashboard">
            <div>
                {/* 🔍 Filter/Search Bar */}
                <FilterBar onSearchResults={setFilteredProperties} />

                {/* 📋 Property Table */}
                <table className="min-w-full border-collapse bg-white text-sm shadow-md">
                    <thead>
                        <tr className="text-left text-white bg-blue-500 font-semibold">
                            <th className="p-3">#</th>
                            <th className="p-3">Property Name</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Beds</th>
                            <th className="p-3">Property Type</th>
                            <th className="p-3">Sqft</th>
                            <th className="p-3">Dealer</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array(5).fill().map((_, i) => <SkeletonRow key={i} />)
                        ) : Array.isArray(filteredProperties) && filteredProperties.length > 0 ? (
                            filteredProperties.map((property, index) => (
                                <tr key={property._id} className="border-t hover:bg-gray-50 transition-colors">
                                    <td className="p-3"><input type="checkbox" /></td>
                                    <td className="p-3 text-blue-600 font-medium">
                                        #{property._id?.slice(-5)}
                                    </td>
                                    <td className="p-3">{property.city || "-"}</td>
                                    <td className="p-3">{property.selectedFeatures?.length || 0}</td>
                                    <td className="p-3">{property.propertyType || "-"}</td>
                                    <td className="p-3">{property.pricePerSqFt || "-"}</td>
                                    <td className="p-3">{property.companyName || "-"}</td>
                                    <td className="p-3">₹{property.price?.toLocaleString?.() || "N/A"}</td>
                                    <td className="p-3 flex gap-2">
                                        <button
                                            className="bg-blue-100 p-1.5 rounded hover:bg-blue-200"
                                            onClick={() => navigate(`/admin/property/${property._id}`)}
                                        >
                                            <Eye size={16} className="text-blue-600" />
                                        </button>
                                        <button className="bg-gray-100 p-1.5 rounded hover:bg-gray-200">
                                            <Pencil size={16} className="text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property._id)}
                                            className="bg-red-100 p-1.5 rounded hover:bg-red-200"
                                        >
                                            <Trash2 size={16} className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4 text-gray-500">
                                    No properties found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
