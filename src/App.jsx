import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import DealerDashboard from "./pages/DealerDashboard/DealerDashboard";
import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateStaff from "./pages/DealerDashboard/CreateStaff";
import ManageStaff from "./pages/DealerDashboard/ManageStaff";
import PostPropertyPage from "./pages/AdminDashboard/postpropert/mainpost";
import PropertyDetailPage from "./pages/AdminDashboard/PropertyDetailPage/PropertyDetailPage";
import Addlead from "./pages/AdminDashboard/addLead/addlead";
import PropertyList from "./pages/AdminDashboard/property-list/PropertyList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/postproperty" element={<PostPropertyPage/>} />
        <Route path="/admin/property-list" element={<PropertyList/>} />
        <Route path="/admin/property/:id" element={<PropertyDetailPage/>} />
        <Route path="/admin/addlead" element={<Addlead/>} />


        <Route path="/dealer" element={<ProtectedRoute><DealerDashboard /></ProtectedRoute>} />
        <Route path="/dealer/create-staff" element={<CreateStaff/>} />
        <Route path="/dealer/manage-staff" element={<ManageStaff/>} />


        <Route path="/staff" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
       
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;