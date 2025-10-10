// frontend/src/pages/dealer/CreateLeadDealer.jsx
import React, { useState } from "react";
import Select from "react-select";
import DashboardLayout from "../../../components/DashboardLayout";
import axios from "axios";
import { cityOptions } from "../../../data/cities";
import { areaMap } from "../../../data/areas";

/* ---------- OPTIONS (unchanged) ---------- */
const leadSourceOptions = [
  { value: "campaign", label: "Campaign" },
  { value: "cold calling", label: "Cold calling" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "google", label: "Google" },
  { value: "import by excel", label: "Import By Excel" },
  { value: "instagram", label: "Instagram" },
  { value: "ivr", label: "IVR" },
  { value: "offline", label: "Offline" },
  { value: "others", label: "Others" },
  { value: "self", label: "Self" },
  { value: "website", label: "Website" },
  { value: "whatsapp", label: "WhatsApp" },
];

const propertyTypeOptions = {
  residential: [
    { value: "building floor", label: "Building Floor" },
    { value: "flat", label: "Flat" },
    { value: "independent floors", label: "Independent Floors" },
    { value: "low rise floors", label: "Low Rise Floors" },
    { value: "plot", label: "Plot" },
    { value: "villa", label: "Villa" },
  ],
  commercial: [
    { value: "land", label: "Land" },
    { value: "office space", label: "Office Space" },
    { value: "pre-leased", label: "Pre-Leased" },
    { value: "showroom", label: "Showroom" },
  ],
  other: [{ value: "other", label: "Other" }],
};

const typologyOptionsByPropertyType = {
  flat: [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "5 BHK", label: "5 BHK" },
  ],
  villa: [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
  ],
  plot: [
    { value: "120 - 160 Sq.Yd", label: "120 - 160 Sq.Yd" },
    { value: "250 Sq yard/sq meter", label: "250 Sq yard/sq meter" },
  ],
  "independent floors": [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
  ],
  "low rise floors": [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
  ],
  "building floor": [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
  ],
  shop: [
    { value: "Retail", label: "Retail" },
    { value: "Showroom", label: "Showroom" },
  ],
  office: [
    { value: "Cabin", label: "Cabin" },
    { value: "Hall", label: "Hall" },
  ],
  other: [],
};

const dropdownOptions = {
  property: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "other", label: "Other" },
  ],
  budget: [
    { value: "Price on Request", label: "Price on Request" },
    { value: "1L", label: "1L" },
    { value: "5L", label: "5L" },
    { value: "10L", label: "10L" },
    { value: "20L", label: "20L" },
    { value: "50L", label: "50L" },
    { value: "1Cr", label: "1Cr" },
    { value: "2Cr", label: "2Cr" },
    { value: "5Cr", label: "5Cr" },
    { value: "10Cr", label: "10Cr" },
    { value: "20Cr", label: "20Cr" },
    { value: "50Cr", label: "50Cr" },
    { value: "100Cr", label: "100Cr" },
  ],
  possessionType: [
    { value: "Ready", label: "Ready" },
    { value: "Under Construction", label: "Under Construction" },
  ],
  possessionTime: [{ value: "2025", label: "2025" }],
};

const leadStatusOptions = [
  { value: "Fresh Leads", label: "Fresh Leads" },
  { value: "Follow Up Leads", label: "Follow Up Leads" },
  { value: "Deal Won Leads", label: "Deal Won Leads" },
  { value: "Not Interested", label: "Not Interested" },
  { value: "Pending Follow Up", label: "Pending Follow Up" },
  { value: "Junk", label: "Junk" },
  { value: "SV Planned", label: "SV Planned" },
  { value: "SV Done", label: "SV Done" },
  { value: "Interested", label: "Interested" },
  { value: "Revisit", label: "Revisit" },
];

/* ---------- MAIN COMPONENT ---------- */
export default function CreateLeadDealer() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    leadSource: "",
    city: "",
    area: "",
    locality: "",
    property: "",
    propertyType: "",
    typology: "",
    budget: "",
    facing: "",
    possessionType: "",
    possessionTime: "",
    projectName: "",
    remark: "",
    amenities: "",
    isActive: true,
    leadStatus: "Fresh Leads",
  };

  const [formData, setFormData] = useState(initialForm);

  /* ---------- HANDLERS ---------- */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    const value = selectedOption ? selectedOption.value : "";

    let updated = { ...formData, [name]: value };

    if (name === "property") {
      updated.propertyType = "";
      updated.typology = "";
    }
    if (name === "propertyType") updated.typology = "";

    setFormData(updated);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea(null);
    setFormData((f) => ({ ...f, city: city?.value || "", area: "" }));
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    setFormData((f) => ({ ...f, area: area?.value || "" }));
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSelectedCity(null);
    setSelectedArea(null);
  };

  /* ---------- SUBMIT ---------- */
const handleSubmit = async (e) => {
  e.preventDefault();
  if (submitting) return;
  setSubmitting(true);

  // 1.  clean empty → null
  const payload = Object.fromEntries(
    Object.entries(formData).map(([k, v]) => [k, v === '' ? null : v])
  );

  // 2.  auth token
  const token = localStorage.getItem('token');
  if (!token) {
    alert('❌ No auth token found – please log in again');
    setSubmitting(false);
    return;
  }

  // 3.  dump what we send
  console.log('🚀 PAYLOAD ABOUT TO BE SENT', payload);
  console.log('🔑 Authorization', `Bearer ${token}`);

  try {
    const res = await axios.post(
      'https://backend-six-plum-52.vercel.app//api/leads',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ SERVER RESPONSE', res.data);
    alert('✅ Lead created successfully!');
    handleReset();
  } catch (err) {
    /* 4.  grab the real server message */
    const serverMsg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Network error';
    console.error('❌ SERVER 500 BODY', err.response?.data);
    alert(`❌ Server error: ${serverMsg}`);
  } finally {
    setSubmitting(false);
  }
};

  /* ---------- RENDER ---------- */
  return (
    <DashboardLayout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Basic Lead</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* simple inputs */}
          {["fullName", "email", "phone", "locality", "facing", "projectName"].map((name) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type={name === "email" ? "email" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                required={["fullName", "email", "phone"].includes(name)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          ))}

          {/* city / area */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Select
              options={cityOptions}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Select City"
              isClearable
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <Select
              options={selectedCity ? areaMap[selectedCity.value] : []}
              value={selectedArea}
              onChange={handleAreaChange}
              placeholder="Select Area"
              isClearable
              isDisabled={!selectedCity}
            />
          </div>

          {/* property selectors */}
          <div>
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <Select
              name="propertyType"
              options={propertyTypeOptions[formData.property] || []}
              value={(propertyTypeOptions[formData.property] || []).find(
                (o) => o.value === formData.propertyType
              )}
              onChange={handleSelectChange}
              placeholder="Select Property Type"
              isClearable
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Typology</label>
            <Select
              name="typology"
              options={typologyOptionsByPropertyType[formData.propertyType] || []}
              value={(typologyOptionsByPropertyType[formData.propertyType] || []).find(
                (o) => o.value === formData.typology
              )}
              onChange={handleSelectChange}
              placeholder="Select Typology"
              isClearable
            />
          </div>

          {/* dropdowns */}
          {["budget", "possessionType", "possessionTime"].map((name) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
              <Select
                name={name}
                options={dropdownOptions[name]}
                value={dropdownOptions[name].find((o) => o.value === formData[name])}
                onChange={handleSelectChange}
                placeholder={`Select ${name}`}
                isClearable
              />
            </div>
          ))}

          {/* lead status */}
          <div>
            <label className="block text-sm font-medium mb-1">Lead Status</label>
            <Select
              name="leadStatus"
              options={leadStatusOptions}
              value={leadStatusOptions.find((o) => o.value === formData.leadStatus)}
              onChange={handleSelectChange}
              placeholder="Select Lead Status"
              isClearable
            />
          </div>

          {/* textareas */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Remark</label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Amenities</label>
            <textarea
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* active toggle */}
          <div className="md:col-span-3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm">Is Active</span>
            </label>
          </div>

          {/* buttons */}
          <div className="md:col-span-3 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded text-white ${
                submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Creating..." : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}