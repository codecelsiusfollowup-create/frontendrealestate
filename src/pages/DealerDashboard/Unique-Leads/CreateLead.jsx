

import React, { useState } from "react";
import Select from "react-select";
import DashboardLayout from "../../../components/DashboardLayout";
import axios from "axios";
import { cityOptions } from "../../../data/cities";
import { areaMap } from "../../../data/areas";

// Options
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
    { value: "2 BR", label: "2 BR" },
    { value: "1 LDK", label: "1 LDK" },
    { value: "1.5 BHK", label: "1.5 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "2 BR", label: "2 BR" },
    { value: "2 LDK", label: "2 LDK" },
    { value: "2.5 BHK", label: "2.5 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "3 BR", label: "3 BR" },
    { value: "3 LDK", label: "3 LDK" },
    { value: "3.5 BHK", label: "3.5 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "4 BR", label: "4 BR" },
    { value: "4.5 BHK", label: "4.5 BHK" },
    { value: "5 BHK", label: "5 BHK" },
    { value: "5 BHK+", label: "5 BHK+" },
    { value: "6 BHK", label: "6 BHK" },
    { value: "7 BHK", label: "7 BHK" },
    { value: "8 BHK", label: "8 BHK" },
    { value: "Apartment", label: "Apartment" },
    { value: "Duplex", label: "Duplex" },
    { value: "Penthouse", label: "Penthouse" },
  ],
  villa: [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "5 BHK", label: "5 BHK" },
    { value: "6 BHK", label: "6 BHK" },
    { value: "7 BHK", label: "7 BHK" },
  ],
  plot: [
    { value: "120 - 160 Sq.Yd", label: "120 - 160 Sq.Yd" },
    { value: "166 Sq.Yd", label: "166 Sq.Yd" },
    { value: "180 Sq yard/sq meter", label: "180 Sq yard/sq meter" },
    { value: "250 Sq yard/sq meter", label: "250 Sq yard/sq meter" },
    { value: "2BHK", label: "2BHK" },
    { value: "4BHK", label: "4BHK" },
    { value: "500 Sq yard/sq meter", label: "500 Sq yard/sq meter" },
    { value: "5BHK", label: "5BHK" },
    { value: "All Sizes Available", label: "4BHK" },
  ],
  "independent floors": [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "5 BHK", label: "5 BHK" },
  ],
  "low rise floors": [
    { value: "1 BHK", label: "1 BHK" },
    { value: "1.5 BHK", label: "1.5 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "2.5 BHK", label: "2.5 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "3.5 BHK", label: "3.5 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "4.5 BHK", label: "4.5 BHK" },
    { value: "5 BHK", label: "5 BHK" },
    { value: "5 BHK+", label: "5 BHK+" },
    { value: "5 BHK+STUDY", label: "5 BHK+STUDY" },
    { value: "6 BHK", label: "6 BHK" },
    { value: "7 BHK", label: "7 BHK" },
  ],
  "building floor": [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
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
    { value: "2L", label: "2L" },
    { value: "3L", label: "3L" },
    { value: "4L", label: "4L" },
    { value: "5L", label: "5L" },
    { value: "6L", label: "6L" },
    { value: "7L", label: "7L" },
    { value: "8L", label: "8L" },
    { value: "9L", label: "9L" },
    { value: "10L", label: "10L" },
    { value: "11L", label: "11L" },
    { value: "12L", label: "12L" },
    { value: "13L", label: "13L" },
    { value: "14L", label: "14L" },
    { value: "15L", label: "15L" },
    { value: "16L", label: "16L" },
    { value: "17L", label: "17L" },
    { value: "18L", label: "18L" },
    { value: "19L", label: "19L" },
    { value: "20L", label: "20L" },
    { value: "21L", label: "21L" },
    { value: "22L", label: "22L" },
    { value: "23L", label: "23L" },
    { value: "24L", label: "24L" },
    { value: "25L", label: "25L" },
    { value: "26L", label: "26L" },
    { value: "27L", label: "27L" },
    { value: "28L", label: "28L" },
    { value: "29L", label: "29L" },
    { value: "30L", label: "30L" },
    { value: "31L", label: "31L" },
    { value: "32L", label: "32L" },
    { value: "33L", label: "33L" },
    { value: "34L", label: "34L" },
    { value: "35L", label: "35L" },
    { value: "36L", label: "36L" },
    { value: "37L", label: "37L" },
    { value: "38L", label: "38L" },
    { value: "39L", label: "39L" },
    { value: "40L", label: "40L" },
    { value: "41L", label: "41L" },
    { value: "42L", label: "42L" },
    { value: "43L", label: "43L" },
    { value: "44L", label: "44L" },
    { value: "45L", label: "45L" },
    { value: "46L", label: "46L" },
    { value: "47L", label: "47L" },
    { value: "48L", label: "48L" },
    { value: "49L", label: "49L" },
    { value: "50L", label: "50L" },

    // ✅ Ab Crore start
    { value: "1Cr", label: "1Cr" },
    { value: "2Cr", label: "2Cr" },
    { value: "3Cr", label: "3Cr" },
    { value: "4Cr", label: "4Cr" },
    { value: "5Cr", label: "5Cr" },
    { value: "6Cr", label: "6Cr" },
    { value: "7Cr", label: "7Cr" },
    { value: "8Cr", label: "8Cr" },
    { value: "9Cr", label: "9Cr" },
    { value: "10Cr", label: "10Cr" },
    { value: "11Cr", label: "11Cr" },
    { value: "12Cr", label: "12Cr" },
    { value: "13Cr", label: "13Cr" },
    { value: "14Cr", label: "14Cr" },
    { value: "15Cr", label: "15Cr" },
    { value: "16Cr", label: "16Cr" },
    { value: "17Cr", label: "17Cr" },
    { value: "18Cr", label: "18Cr" },
    { value: "19Cr", label: "19Cr" },
    { value: "20Cr", label: "20Cr" },
    { value: "21Cr", label: "21Cr" },
    { value: "22Cr", label: "22Cr" },
    { value: "23Cr", label: "23Cr" },
    { value: "24Cr", label: "24Cr" },
    { value: "25Cr", label: "25Cr" },
    { value: "26Cr", label: "26Cr" },
    { value: "27Cr", label: "27Cr" },
    { value: "28Cr", label: "28Cr" },
    { value: "29Cr", label: "29Cr" },
    { value: "30Cr", label: "30Cr" },
    { value: "35Cr", label: "35Cr" },
    { value: "40Cr", label: "40Cr" },
    { value: "45Cr", label: "45Cr" },
    { value: "50Cr", label: "50Cr" },
    { value: "55Cr", label: "55Cr" },
    { value: "60Cr", label: "60Cr" },
    { value: "65Cr", label: "65Cr" },
    { value: "70Cr", label: "70Cr" },
    { value: "75Cr", label: "75Cr" },
    { value: "80Cr", label: "80Cr" },
    { value: "85Cr", label: "85Cr" },
    { value: "90Cr", label: "90Cr" },
    { value: "95Cr", label: "95Cr" },
    { value: "100Cr", label: "100Cr" },
    { value: "110Cr", label: "110Cr" },
    { value: "120Cr", label: "120Cr" },
    { value: "130Cr", label: "130Cr" },
    { value: "140Cr", label: "140Cr" },
    { value: "150Cr", label: "150Cr" },
    { value: "160Cr", label: "160Cr" },
  ],
  possessionType: [
    { value: "Ready", label: "Ready" },
    { value: "Under Construction", label: "Under Construction" },
  ],
  possessionTime: [{ value: "2025", label: "2025" }],
};

// Lead Status Options
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

export default function CreateLeadDealer() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
    leadStatus: "Fresh Leads"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    const value = selectedOption ? selectedOption.value : "";

    let updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (name === "property") {
      updatedFormData.propertyType = "";
      updatedFormData.typology = "";
    }

    if (name === "propertyType") {
      updatedFormData.typology = "";
    }

    setFormData(updatedFormData);
  };

  const handleReset = () => {
    setFormData({
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // agar already submitting hai to kuch mat karo
    setSubmitting(true);

    try {
      const res = await axios.post("https://backend-six-plum-52.vercel.app/api/leads", formData);
      if (res.data.success) {
        alert("✅ Lead created successfully!");
        handleReset();
      } else {
        alert("❌ Failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };


    const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea(null); // reset area
    setFormData({ ...formData, city: city?.value, area: null });
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    setFormData({ ...formData, area: area?.value });
  };
  return (
    <DashboardLayout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Basic Lead</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "fullName",
              "email",
              "phone",
              "locality",
              "facing",
              "projectName",
            ].map((name, index) => (
              <div key={`${name}-${index}`}>
                <label className="block text-sm font-medium mb-1">
                  {name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={name === "email" ? "email" : "text"}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  required={["fullName", "email", "phone"].includes(name)}
                />
              </div>
            ))}

             
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

      {/* Area */}
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
   

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <Select
                name="propertyType"
                options={propertyTypeOptions[formData.property] || []}
                value={(propertyTypeOptions[formData.property] || []).find(
                  (opt) => opt.value === formData.propertyType
                )}
                onChange={handleSelectChange}
                placeholder="Select Property Type"
                isClearable
                isSearchable
              />
            </div>

            {/* Typology */}
            <div>
              <label className="block text-sm font-medium mb-1">Typology</label>
              <Select
                name="typology"
                options={typologyOptionsByPropertyType[formData.propertyType] || []}
                value={(typologyOptionsByPropertyType[formData.propertyType] || []).find(
                  (opt) => opt.value === formData.typology
                )}
                onChange={handleSelectChange}
                placeholder="Select Typology"
                isClearable
                isSearchable
              />
            </div>

            {["budget", "possessionType", "possessionTime"].map((name, index) => (
              <div key={`${name}-${index}`}>
                <label className="block text-sm font-medium mb-1">
                  {name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <Select
                  name={name}
                  options={dropdownOptions[name]}
                  value={dropdownOptions[name].find(
                    (opt) => opt.value === formData[name]
                  )}
                  onChange={handleSelectChange}
                  placeholder={`Select ${name}`}
                  isClearable
                  isSearchable
                />
              </div>
            ))}

             {/* Lead Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Lead Status</label>
              <Select
                name="leadStatus"
                options={leadStatusOptions}
                value={leadStatusOptions.find((opt) => opt.value === formData.leadStatus)}
                onChange={handleSelectChange}
                placeholder="Select Lead Status"
                isClearable
                isSearchable
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Remark</label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Amenities</label>
              <textarea
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div className="md:col-span-3">
              <label className="inline-flex items-center mt-2">
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
          </div>

          <div className="mt-6 flex justify-end gap-4">
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
              className={`px-4 py-2 rounded text-white ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
