import React, { useState } from "react";

export default function PostPropertyStep1({ onNext, defaultValues = {} }) {
  const [listingType, setListingType] = useState(defaultValues.listingType || "Sell");
  const [propertyUse, setPropertyUse] = useState(defaultValues.propertyUse || "Residential");
  const [propertyType, setPropertyType] = useState(defaultValues.propertyType || "");
  const [subType, setSubType] = useState(defaultValues.subType || "");
  const [extraInfo, setExtraInfo] = useState(defaultValues.extraInfo || "");
  const [shopLocation, setShopLocation] = useState(defaultValues.shopLocation || "");
  const [errors, setErrors] = useState({});

  const residentialOptions = {
    Sell: [
      "Flat/Apartment", "Independent House / Villa", "Independent / Builder Floor", "Plot / Land",
      "1 RK/ Studio Apartment", "Serviced Apartment", "Farmhouse", "Other",
    ],
    "Rent / Lease": [
      "Flat/Apartment", "Independent House / Villa", "Independent / Builder Floor",
      "1 RK/ Studio Apartment", "Serviced Apartment", "Farmhouse", "Other",
    ],
    PG: [
      "Flat/Apartment", "Independent House / Villa", "Independent / Builder Floor",
      "1 RK/ Studio Apartment", "Serviced Apartment",
    ],
  };

  const commercialTypes = [
    "Office", "Retail", "Plot / Land", "Storage", "Industry", "Hospitality", "Other",
  ];

  const commercialSubTypes = {
    Office: ["Ready to move office space", "Bare shell office space", "Co-working office space"],
    Retail: ["Commercial Shops", "Commercial Showrooms"],
    "Plot / Land": ["Commercial Land/Inst. Land", "Agricultural/Farm Land", "Industrial Lands/Plots"],
    Storage: ["Ware House", "Cold Storage"],
    Industry: ["Factory", "Manufacturing"],
    Hospitality: ["Hotel/Resorts", "Guest-House/Banquet-Halls"],
  };

  const shopInsideOptions = [
    "Mall", "Commercial Project", "Residential Project", "Retail Complex/Building", "Market / High Street", "Others",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!propertyType) newErrors.propertyType = "Please select property type";
    if (propertyUse === "Commercial" && commercialSubTypes[propertyType] && !subType) {
      newErrors.subType = `Please select a subtype for ${propertyType}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const data = {
      listingType,
      propertyUse,
      propertyType,
      subType: subType || null,
      extraInfo: extraInfo || null,
      shopLocation: shopLocation || null,
    };
    onNext(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome back Khalid,</h1>
      <p className="text-gray-700 mb-6">Fill out basic details</p>

      {/* Listing Type */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">I'm looking to</label>
        <div className="flex gap-4 flex-wrap">
          {["Sell", "Rent / Lease", ...(propertyUse === "Residential" ? ["PG"] : [])].map((option) => (
            <button
              key={option}
              onClick={() => {
                setListingType(option);
                setPropertyType("");
                setSubType("");
                setExtraInfo("");
                setErrors({});
              }}
              className={`px-4 py-2 border rounded-full ${
                listingType === option
                  ? "bg-blue-100 border-blue-600 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Property Use */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">What kind of property do you have?</label>
        <div className="flex gap-6 mb-4">
          {["Residential", "Commercial"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="propertyUse"
                value={option}
                checked={propertyUse === option}
                onChange={() => {
                  setPropertyUse(option);
                  setPropertyType("");
                  setSubType("");
                  setExtraInfo("");
                  setErrors({});
                }}
              />
              {option}
            </label>
          ))}
        </div>

        {/* Property Type */}
        <div className="flex flex-wrap gap-3">
          {(propertyUse === "Residential"
            ? residentialOptions[listingType] || []
            : commercialTypes).map((type) => (
            <button
              key={type}
              onClick={() => {
                setPropertyType(type);
                setSubType("");
                setExtraInfo("");
                setErrors((prev) => ({ ...prev, propertyType: undefined }));
              }}
              className={`px-4 py-2 border rounded-full ${
                propertyType === type
                  ? "bg-blue-100 border-blue-600 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.propertyType && <p className="text-red-500 mt-2">{errors.propertyType}</p>}
      </div>

      {/* Subtype (if needed) */}
      {propertyUse === "Commercial" && commercialSubTypes[propertyType] && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            What kind of {propertyType.toLowerCase()} is it?
          </label>
          <div className="flex flex-wrap gap-3">
            {commercialSubTypes[propertyType].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSubType(type);
                  setExtraInfo("");
                  setErrors((prev) => ({ ...prev, subType: undefined }));
                }}
                className={`px-4 py-2 border rounded-full ${
                  subType === type
                    ? "bg-blue-100 border-blue-600 text-blue-700"
                    : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.subType && <p className="text-red-500 mt-2">{errors.subType}</p>}
        </div>
      )}

      {/* Shop Location (optional) */}
      {propertyUse === "Commercial" &&
        (subType === "Commercial Shops" || subType === "Commercial Showrooms") && (
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Your shop is located inside <span className="text-gray-400 text-sm">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {shopInsideOptions.map((location) => (
                <button
                  key={location}
                  onClick={() => setShopLocation(location)}
                  className={`px-4 py-2 border rounded-full ${
                    shopLocation === location
                      ? "bg-blue-100 border-blue-600 text-blue-700"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Submit */}
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
}
