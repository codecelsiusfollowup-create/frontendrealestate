// import React, { useState } from "react";
// import Select from "react-select";
// import DashboardLayout from "../../../components/DashboardLayout";

// // Options
// const leadSourceOptions = [
//   { value: "campaign", label: "Campaign" },
//   { value: "cold calling", label: "Cold calling" },
//   { value: "linkedin", label: "LinkedIn" },
//   { value: "facebook", label: "Facebook" },
//   { value: "google", label: "Google" },
//   { value: "import by excel", label: "Import By Excel" },
//   { value: "instagram", label: "Instagram" },
//   { value: "ivr", label: "IVR" },
//   { value: "offline", label: "Offline" },
//   { value: "others", label: "Others" },
//   { value: "self", label: "Self" },
//   { value: "website", label: "Website" },
//   { value: "whatsapp", label: "WhatsApp" },
// ];

// const cityOptions = [
//   { value: "Pune", label: "Pune" },
//   { value: "Mumbai", label: "Mumbai" },
// ];

// const areaOptions = [
//   { value: "Baner", label: "Baner" },
//   { value: "Wakad", label: "Wakad" },
// ];

// const propertyTypeOptions = {
//   residential: [
//     { value: "building floor", label: "Building Floor" },
//     { value: "flat", label: "Flat" },
//     { value: "independent floors", label: "Independent Floors" },
//     { value: "low rise floors", label: "Low Rise Floors" },
//     { value: "plot", label: "Plot" },
//     { value: "villa", label: "Villa" },
//   ],
//   commercial: [
//     { value: "office", label: "Office" },
//     { value: "pre-leased", label: "Pre-Leased" },
//     { value: "shop", label: "Shop" },
//   ],
//   other: [{ value: "other", label: "Other" }],
// };

// const typologyOptionsByPropertyType = {
//   flat: [
//     { value: "1 BHK", label: "1 BHK" },
//     { value: "2 BHK", label: "2 BHK" },
//     { value: "3 BHK", label: "3 BHK" },
//   ],
//   villa: [
//     { value: "3 BHK", label: "3 BHK" },
//     { value: "4 BHK", label: "4 BHK" },
//   ],
//   plot: [],
//   office: [
//     { value: "Cabin", label: "Cabin" },
//     { value: "Hall", label: "Hall" },
//   ],
//   "independent floors": [
//     { value: "2 BHK", label: "2 BHK" },
//     { value: "3 BHK", label: "3 BHK" },
//   ],
//   "building floor": [
//     { value: "2 BHK", label: "2 BHK" },
//     { value: "3 BHK", label: "3 BHK" },
//     { value: "4 BHK", label: "4 BHK" },
//   ],
//   shop: [
//     { value: "Retail", label: "Retail" },
//     { value: "Showroom", label: "Showroom" },
//   ],
//   other: [],
// };

// const dropdownOptions = {
//   property: [
//     { value: "residential", label: "Residential" },
//     { value: "commercial", label: "Commercial" },
//     { value: "other", label: "Other" },
//   ],
//   budget: [{ value: "30L-50L", label: "30L-50L" }],
//   possessionType: [
//     { value: "Ready", label: "Ready" },
//     { value: "Under Construction", label: "Under Construction" },
//   ],
//   possessionTime: [{ value: "2025", label: "2025" }],
// };

// export default function Addlead() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     leadSource: "",
//     city: "",
//     area: "",
//     locality: "",
//     property: "",
//     propertyType: "",
//     typology: "",
//     budget: "",
//     facing: "",
//     possessionType: "",
//     possessionTime: "",
//     projectName: "",
//     remark: "",
//     amenities: "",
//     isActive: true,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSelectChange = (selectedOption, { name }) => {
//     const value = selectedOption ? selectedOption.value : "";

//     let updatedFormData = {
//       ...formData,
//       [name]: value,
//     };

//     if (name === "property") {
//       updatedFormData.propertyType = "";
//       updatedFormData.typology = "";
//     }

//     if (name === "propertyType") {
//       updatedFormData.typology = "";
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting:", formData);
//   };

//   const handleReset = () => {
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       leadSource: "",
//       city: "",
//       area: "",
//       locality: "",
//       property: "",
//       propertyType: "",
//       typology: "",
//       budget: "",
//       facing: "",
//       possessionType: "",
//       possessionTime: "",
//       projectName: "",
//       remark: "",
//       amenities: "",
//       isActive: true,
//     });
//   };

  
//   return (
//     <DashboardLayout>
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Basic Lead</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {["fullName", "email", "phone", "locality", "facing", "projectName"].map((name , index) => (
//               <div key={name.id || index}>
//                 <label className="block text-sm font-medium mb-1">
//                   {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 <input
//                   type={name === "email" ? "email" : "text"}
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleInputChange}
//                   className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
//                   required={["fullName", "email", "phone"].includes(name)}
//                 />
//               </div>
//             ))}

//             {[{ name: "leadSource", options: leadSourceOptions },
//               { name: "city", options: cityOptions },
//               { name: "area", options: areaOptions },
//               { name: "property", options: dropdownOptions.property }].map(({ name, options }) => (
//               <div key={name}>
//                 <label className="block text-sm font-medium mb-1">
//                   {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 <Select
//                   name={name}
//                   options={options}
//                   value={options.find((opt) => opt.value === formData[name])}
//                   onChange={handleSelectChange}
//                   placeholder={`Select ${name}`}
//                   isClearable
//                   isSearchable
//                 />
//               </div>
//             ))}

//             {/* Property Type */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Property Type</label>
//               <Select
//                 name="propertyType"
//                 options={propertyTypeOptions[formData.property] || []}
//                 value={(propertyTypeOptions[formData.property] || []).find(
//                   (opt) => opt.value === formData.propertyType
//                 )}
//                 onChange={handleSelectChange}
//                 placeholder="Select Property Type"
//                 isClearable
//                 isSearchable
//               />
//             </div>

//             {/* Typology */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Typology</label>
//               <Select
//                 name="typology"
//                 options={typologyOptionsByPropertyType[formData.propertyType] || []}
//                 value={(typologyOptionsByPropertyType[formData.propertyType] || []).find(
//                   (opt) => opt.value === formData.typology
//                 )}
//                 onChange={handleSelectChange}
//                 placeholder="Select Typology"
//                 isClearable
//                 isSearchable
//               />
//             </div>

//             {["budget", "possessionType", "possessionTime"].map((name , index) => (
//               <div key={`${name}-${index}`}>
//                 <label className="block text-sm font-medium mb-1">
//                   {name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
//                 </label>
//                 <Select
//                   name={name}
//                   options={dropdownOptions[name]}
//                   value={dropdownOptions[name].find((opt) => opt.value === formData[name])}
//                   onChange={handleSelectChange}
//                   placeholder={`Select ${name}`}
//                   isClearable
//                   isSearchable
//                 />
//               </div>
//             ))}

//             <div className="md:col-span-3">
//               <label className="block text-sm font-medium mb-1">Remark</label>
//               <textarea
//                 name="remark"
//                 value={formData.remark}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
//               />
//             </div>

//             <div className="md:col-span-3">
//               <label className="block text-sm font-medium mb-1">Amenities</label>
//               <textarea
//                 name="amenities"
//                 value={formData.amenities}
//                 onChange={handleInputChange}
//                 rows={3}
//                 className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
//               />
//             </div>

//             <div className="md:col-span-3">
//               <label className="inline-flex items-center mt-2">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={formData.isActive}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-blue-600"
//                 />
//                 <span className="ml-2 text-sm">Is Active</span>
//               </label>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={handleReset}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Create Lead
//             </button>
//           </div>
//         </form>
//       </div>
//     </DashboardLayout>
//   );
// }


import React, { useState } from "react";
import Select from "react-select";
import DashboardLayout from "../../../components/DashboardLayout";
import axios from "axios";

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

const cityOptions = [
  { value: "Pune", label: "Pune" },
  { value: "Mumbai", label: "Mumbai" },
];

const areaOptions = [
  { value: "Baner", label: "Baner" },
  { value: "Wakad", label: "Wakad" },
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
    { value: "office", label: "Office" },
    { value: "pre-leased", label: "Pre-Leased" },
    { value: "shop", label: "Shop" },
  ],
  other: [{ value: "other", label: "Other" }],
};

const typologyOptionsByPropertyType = {
  flat: [
    { value: "1 BHK", label: "1 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
  ],
  villa: [
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
  ],
  plot: [],
  office: [
    { value: "Cabin", label: "Cabin" },
    { value: "Hall", label: "Hall" },
  ],
  "independent floors": [
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
  ],
  "building floor": [
    { value: "2 BHK", label: "2 BHK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "4 BHK", label: "4 BHK" },
  ],
  shop: [
    { value: "Retail", label: "Retail" },
    { value: "Showroom", label: "Showroom" },
  ],
  other: [],
};

const dropdownOptions = {
  property: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "other", label: "Other" },
  ],
  budget: [{ value: "30L-50L", label: "30L-50L" }],
  possessionType: [
    { value: "Ready", label: "Ready" },
    { value: "Under Construction", label: "Under Construction" },
  ],
  possessionTime: [{ value: "2025", label: "2025" }],
};

export default function CreateLead() {
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://a-new-vercel.onrender.com/api/leads", formData);
      if (res.data.success) {
        alert("✅ Lead created successfully!");
        handleReset();
      } else {
        alert("❌ Failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong!");
    }
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

            {[
              { name: "leadSource", options: leadSourceOptions },
              { name: "city", options: cityOptions },
              { name: "area", options: areaOptions },
              { name: "property", options: dropdownOptions.property },
            ].map(({ name, options }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">
                  {name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <Select
                  name={name}
                  options={options}
                  value={options.find((opt) => opt.value === formData[name])}
                  onChange={handleSelectChange}
                  placeholder={`Select ${name}`}
                  isClearable
                  isSearchable
                />
              </div>
            ))}

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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
