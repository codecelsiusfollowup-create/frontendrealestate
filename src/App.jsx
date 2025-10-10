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
import CreateLead from "./pages/AdminDashboard/Unique-Leads/CreateLead";
import PropertyList from "./pages/AdminDashboard/property-list/PropertyList";
import NewLeads from "./pages/AdminDashboard/Unique-Leads/NewLeads";
import FilterLead from "./pages/AdminDashboard/Unique-Leads/FilterLead";
import StaffNewLeads from "./pages/DealerDashboard/Unique-Leads/NewLeads";
import StaffFilterLead from "./pages/DealerDashboard/Unique-Leads/FilterLead";
import StaffAssign from "./pages/StaffDashboard/AssignLead/MyLead";
import CreateLeadDealer from "./pages/DealerDashboard/Unique-Leads/CreateLead";
import FollowupPage from "./pages/StaffDashboard/Followup/FollowupPage";
import VisitedPage from "./pages/StaffDashboard/Visited/VisitedPage";
import DealerLeadStatusPage from "./pages/DealerDashboard/LeadStatusPage/LeadStatusPage";


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
        <Route path="/admin/addlead" element={<CreateLead/>} />
        <Route path="/admin/leadall" element={<NewLeads/>}/>
        <Route path="/admin/leadfilter" element={<FilterLead/>}/>


        <Route path="/dealer" element={<ProtectedRoute><DealerDashboard /></ProtectedRoute>} />
        <Route path="/dealer/create-staff" element={<CreateStaff/>} />
        <Route path="/dealer/manage-staff" element={<ManageStaff/>} />
        <Route path="/dealer/staffleadall" element={<StaffNewLeads/>}/>
        <Route path="/dealer/staffleadfilter" element={<StaffFilterLead/>}/>
        <Route path="/dealer/addlead" element={<CreateLeadDealer/>} />
        <Route path="/dealer/leadstatus" element={<DealerLeadStatusPage/>} />

        <Route path="/staff" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
        <Route path="/staff/assignlead" element={<StaffAssign/>}/>
        <Route path="/staff/followup" element={<FollowupPage/>}/>
        <Route path="/staff/visited" element={<VisitedPage/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;