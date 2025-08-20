import React, { useEffect, useState } from "react";

function convertToIndianWords(num) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  return formatter.format(num).replace("₹", "₹ ");
}

const LOCAL_KEY = "postPropertyStep5";

export default function Step5({ onBack, onNext }) {
  const [price, setPrice] = useState("");
  const [pricePerSqFt, setPricePerSqFt] = useState("");
  const [priceBasis, setPriceBasis] = useState("Plot Area");
  const [plotArea] = useState(231);
  const [carpetArea] = useState(181);
  const [taxExcluded, setTaxExcluded] = useState(true);
  const [negotiable, setNegotiable] = useState(true);
  const [showMorePricing, setShowMorePricing] = useState(false);

  const [maintenance, setMaintenance] = useState("");
  const [maintenanceType, setMaintenanceType] = useState("Monthly");
  const [expectedRental, setExpectedRental] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [annualDues, setAnnualDues] = useState("");

  const [ownership, setOwnership] = useState("Freehold");
  const ownershipOptions = ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"];

  const [propertyDescription, setPropertyDescription] = useState("");

  const [chargeBrokerage, setChargeBrokerage] = useState(null);
  const [brokerageType, setBrokerageType] = useState("Fixed");
  const [brokerageValue, setBrokerageValue] = useState("");
  const [brokerageNegotiable, setBrokerageNegotiable] = useState(false);

  const [errors, setErrors] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const currentArea = priceBasis === "Plot Area" ? plotArea : carpetArea;

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved) {
      setPrice(saved.price || "");
      setPricePerSqFt(saved.pricePerSqFt || "");
      setPriceBasis(saved.priceBasis || "Plot Area");
      setTaxExcluded(saved.taxExcluded ?? true);
      setNegotiable(saved.negotiable ?? true);
      setShowMorePricing(saved.showMorePricing || false);
      setMaintenance(saved.maintenance || "");
      setMaintenanceType(saved.maintenanceType || "Monthly");
      setExpectedRental(saved.expectedRental || "");
      setBookingAmount(saved.bookingAmount || "");
      setAnnualDues(saved.annualDues || "");
      setOwnership(saved.ownership || "Freehold");
      setChargeBrokerage(saved.chargeBrokerage || null);
      setBrokerageType(saved.brokerageType || "Fixed");
      setBrokerageValue(saved.brokerageValue || "");
      setBrokerageNegotiable(saved.brokerageNegotiable || false);
      setPropertyDescription(saved.propertyDescription || "");
    }
    setIsDataLoaded(true); // ✅ Mark data as loaded
  }, []);

  // ✅ Save to localStorage on every change
  useEffect(() => {
    if (!isDataLoaded) return;
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        price,
        pricePerSqFt,
        priceBasis,
        taxExcluded,
        negotiable,
        showMorePricing,
        maintenance,
        maintenanceType,
        expectedRental,
        bookingAmount,
        annualDues,
        ownership,
        chargeBrokerage,
        brokerageType,
        brokerageValue,
        brokerageNegotiable,
        propertyDescription,
      })
    );
  }, [
    price,
    pricePerSqFt,
    priceBasis,
    taxExcluded,
    negotiable,
    showMorePricing,
    maintenance,
    maintenanceType,
    expectedRental,
    bookingAmount,
    annualDues,
    ownership,
    chargeBrokerage,
    brokerageType,
    brokerageValue,
    brokerageNegotiable,
    propertyDescription,
    isDataLoaded,
  ]);

  // ✅ Update pricePerSqFt when price or priceBasis changes
  useEffect(() => {
    if (!isDataLoaded) return;
    if (price && currentArea) {
      const newRate = Math.round(Number(price) / currentArea);
      setPricePerSqFt(newRate || "");
    }
  }, [price, priceBasis, isDataLoaded]);

  const handlePriceChange = (value) => {
    setPrice(value);
    const numeric = parseFloat(value);
    if (!isNaN(numeric) && currentArea > 0) {
      setPricePerSqFt(Math.round(numeric / currentArea));
    }
  };

  const handlePricePerSqFtChange = (value) => {
    setPricePerSqFt(value);
    const numeric = parseFloat(value);
    if (!isNaN(numeric) && currentArea > 0) {
      setPrice(Math.round(numeric * currentArea));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!price || isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Expected price is required and must be greater than 0";
    }

    if (!pricePerSqFt || isNaN(pricePerSqFt) || Number(pricePerSqFt) <= 0) {
      newErrors.pricePerSqFt = "Price per sq.ft is required and must be valid";
    }

    if (chargeBrokerage === "Yes" && (!brokerageValue || Number(brokerageValue) <= 0)) {
      newErrors.brokerageValue = "Brokerage amount is required";
    }

    if (propertyDescription.trim().length < 30) {
      newErrors.propertyDescription = "Minimum 30 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({
        price,
        pricePerSqFt,
        priceBasis,
        taxExcluded,
        negotiable,
        maintenance,
        maintenanceType,
        expectedRental,
        bookingAmount,
        annualDues,
        ownership,
        chargeBrokerage,
        brokerageType,
        brokerageValue,
        brokerageNegotiable,
        propertyDescription,
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Price Details</h2>

      {/* Ownership */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Ownership</label>
        <div className="flex flex-wrap gap-3">
          {ownershipOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setOwnership(option)}
              className={`px-4 py-2 rounded-full border ${
                ownership === option
                  ? "bg-blue-100 border-blue-600 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label className="text-sm font-medium">₹ Expected Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter total price"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          {price && (
            <div className="mt-2 text-gray-700 text-sm">
              ₹ {convertToIndianWords(price)} (₹ {pricePerSqFt} per sq.ft.)
            </div>
          )}
        </div>

        {/* Price per sqft */}
        <div>
          <label className="text-sm font-medium">₹ Price per sq.ft.</label>
          <input
            type="number"
            value={pricePerSqFt}
            onChange={(e) => handlePricePerSqFtChange(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter price per sq.ft."
          />
          {errors.pricePerSqFt && <p className="text-red-500 text-sm">{errors.pricePerSqFt}</p>}
          <div className="mt-2 text-sm text-gray-600">
            Based on{" "}
            <select
              value={priceBasis}
              onChange={(e) => setPriceBasis(e.target.value)}
              className="underline text-blue-600 bg-transparent"
            >
              <option>Plot Area</option>
              <option>Carpet Area</option>
            </select>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mt-4 flex gap-6 flex-wrap">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={taxExcluded} onChange={() => setTaxExcluded(!taxExcluded)} />
          <span className="text-sm">All inclusive price</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={negotiable} onChange={() => setNegotiable(!negotiable)} />
          <span className="text-sm">Price Negotiable</span>
        </label>
      </div>

      {/* Add more pricing */}
      <p
        onClick={() => setShowMorePricing(!showMorePricing)}
        className="text-blue-600 text-sm mt-4 cursor-pointer hover:underline"
      >
        {showMorePricing ? "˄ Hide extra pricing" : "+ Add more pricing details"}
      </p>

      {showMorePricing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
          <div>
            <label className="text-sm block mb-1">Maintenance</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
                placeholder="Amount"
                className="flex-1 border px-3 py-2 rounded"
              />
              <select
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value)}
                className="border px-2 py-2 rounded text-sm"
              >
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm block mb-1">Expected rental</label>
            <input
              type="number"
              value={expectedRental}
              onChange={(e) => setExpectedRental(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter expected rent"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Booking Amount</label>
            <input
              type="number"
              value={bookingAmount}
              onChange={(e) => setBookingAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter booking amount"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Annual dues payable</label>
            <input
              type="number"
              value={annualDues}
              onChange={(e) => setAnnualDues(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter annual dues"
            />
          </div>
        </div>
      )}

      {/* Brokerage Section */}
      <div className="mt-6">
        <label className="text-sm font-medium mb-2 block">Do you charge brokerage?</label>
        <div className="flex gap-4 mb-3">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="brokerage"
                value={option}
                checked={chargeBrokerage === option}
                onChange={() => setChargeBrokerage(option)}
              />
              {option}
            </label>
          ))}
        </div>

        {chargeBrokerage === "Yes" && (
          <div className="ml-1">
            <div className="flex gap-2 mb-3">
              {["Fixed", "Percentage of Price"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBrokerageType(type)}
                  className={`px-4 py-1 rounded-full border text-sm ${
                    brokerageType === type
                      ? "bg-blue-100 border-blue-600 text-blue-700"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <input
              type="number"
              value={brokerageValue}
              onChange={(e) => setBrokerageValue(e.target.value)}
              placeholder="Enter brokerage here"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            {errors.brokerageValue && (
              <p className="text-red-500 text-sm">{errors.brokerageValue}</p>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={brokerageNegotiable}
                onChange={() => setBrokerageNegotiable(!brokerageNegotiable)}
              />
              Brokerage Negotiable
            </label>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="text-sm font-medium">What makes your property unique</label>
        <p className="text-xs text-gray-500 mb-1">
          Adding description will increase your listing visibility
        </p>
        <textarea
          rows={4}
          className="w-full border px-3 py-2 rounded"
          placeholder="Share details about spacious rooms, well-maintained facilities, etc."
          value={propertyDescription}
          onChange={(e) => setPropertyDescription(e.target.value)}
        />
        <div className="text-xs text-gray-500 mt-1">
          Minimum 30 characters required &nbsp; {propertyDescription.length}/5000
        </div>
        {errors.propertyDescription && (
          <p className="text-red-500 text-sm">{errors.propertyDescription}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Continue
        </button>
      </div>
    </div>
  );
}
