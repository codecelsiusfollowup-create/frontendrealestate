import React, { useState, useEffect } from "react";
import Select from "react-select";
import { cityOptions } from "../../../data/cities";

const LOCAL_KEY = "postPropertyStep7";

export default function Step7({ onBack, onSubmit }) {
  const [reraStatus, setReraStatus] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [mobile3, setMobile3] = useState("");
  const [landline1, setLandline1] = useState("");
  const [landline2, setLandline2] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const [errors, setErrors] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved) {
      setReraStatus(saved.reraStatus || "");
      setLicenseType(saved.licenseType || "");
      setCompanyName(saved.companyName || "");
      setCompanyURL(saved.companyURL || "");
      setAddress1(saved.address1 || "");
      setAddress2(saved.address2 || "");
      setCity(saved.city || "");
      setDescription(saved.description || "");
      setMobile1(saved.mobile1 || "");
      setMobile2(saved.mobile2 || "");
      setMobile3(saved.mobile3 || "");
      setLandline1(saved.landline1 || "");
      setLandline2(saved.landline2 || "");
      setWhatsappOptIn(saved.whatsappOptIn || false);
    }
    setIsDataLoaded(true);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    if (!isDataLoaded) return;
    const data = {
      reraStatus, licenseType, companyName, companyURL,
      address1, address2, city, description,
      mobile1, mobile2, mobile3, landline1, landline2,
      whatsappOptIn,
    };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }, [
    reraStatus, licenseType, companyName, companyURL,
    address1, address2, city, description,
    mobile1, mobile2, mobile3, landline1, landline2,
    whatsappOptIn, isDataLoaded
  ]);

  const validate = () => {
    const newErrors = {};
    if (!reraStatus) newErrors.reraStatus = "Please select your RERA registration status.";
    if (!licenseType) newErrors.licenseType = "Please select license type.";
    if (!companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!address1.trim()) newErrors.address1 = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!mobile1 || !/^[6-9]\d{9}$/.test(mobile1)) newErrors.mobile1 = "Enter a valid 10-digit mobile number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        reraStatus, licenseType, companyName, companyURL,
        address1, address2, city, description,
        mobile1, mobile2, mobile3, landline1, landline2,
        whatsappOptIn,
      });
    }
  };

   const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea(null); 
    setFormData({ ...formData, city: city?.value, area: null });
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Before you post... Let buyers know who you are</h2>

      <label className="block text-sm font-medium mb-2">Are you RERA registered?</label>
      <div className="flex gap-4 mb-2">
        {["Yes", "I have applied", "Not Applicable"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setReraStatus(option)}
            className={`px-4 py-2 rounded-full border text-sm ${
              reraStatus === option
                ? "bg-blue-100 border-blue-600 text-blue-700"
                : "bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {errors.reraStatus && <p className="text-red-500 text-sm mb-4">{errors.reraStatus}</p>}

      {reraStatus === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input className="border px-3 py-2 rounded" placeholder="RERA Registration Number" />
          <input className="border px-3 py-2 rounded" placeholder="State" />
          <input className="border px-3 py-2 rounded" placeholder="Expiry Date" type="date" />
        </div>
      )}

      <label className="block text-sm font-medium mb-2">License Type</label>
      <div className="flex gap-4 mb-2">
        {["Individual", "Firm"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setLicenseType(type)}
            className={`px-4 py-2 rounded-full border text-sm ${
              licenseType === type
                ? "bg-blue-100 border-blue-600 text-blue-700"
                : "bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      {errors.licenseType && <p className="text-red-500 text-sm mb-4">{errors.licenseType}</p>}

      <label className="block text-sm font-medium mb-2">Company Details</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>

        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Company URL (Optional)"
          value={companyURL}
          onChange={(e) => setCompanyURL(e.target.value)}
        />

        <div>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Company Address 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
          {errors.address1 && <p className="text-red-500 text-sm">{errors.address1}</p>}
        </div>

        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Company Address 2 (Optional)"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />

        <div className="col-span-2">
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
          
        </div>
      </div>

      <label className="block text-sm font-medium mb-2">Describe your company</label>
      <textarea
        className="border px-3 py-2 rounded w-full mb-6"
        rows={3}
        placeholder="Write a short profile about your company"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="block text-sm font-medium mb-2">Contact Details</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center border rounded overflow-hidden">
            <span className="px-2 bg-gray-200 text-sm border-r">+91 IND</span>
            <input
              type="tel"
              className="px-3 py-2 w-full focus:outline-none"
              placeholder="Enter mobile number 1"
              value={mobile1}
              onChange={(e) => setMobile1(e.target.value)}
            />
          </div>
          {errors.mobile1 && <p className="text-red-500 text-sm">{errors.mobile1}</p>}
        </div>

        <input
          type="tel"
          className="border px-3 py-2 rounded"
          placeholder="Enter mobile number 2 (Optional)"
          value={mobile2}
          onChange={(e) => setMobile2(e.target.value)}
        />
        <input
          type="tel"
          className="border px-3 py-2 rounded"
          placeholder="Enter mobile number 3 (Optional)"
          value={mobile3}
          onChange={(e) => setMobile3(e.target.value)}
        />
        <input
          type="tel"
          className="border px-3 py-2 rounded"
          placeholder="Enter landline number 1 (Optional)"
          value={landline1}
          onChange={(e) => setLandline1(e.target.value)}
        />
        <input
          type="tel"
          className="border px-3 py-2 rounded"
          placeholder="Enter landline number 2 (Optional)"
          value={landline2}
          onChange={(e) => setLandline2(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={whatsappOptIn}
          onChange={() => setWhatsappOptIn(!whatsappOptIn)}
        />
        <span className="text-sm">Get updates via WhatsApp</span>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Property
        </button>
      </div>
    </div>
  );
}