import React, { useEffect, useState } from "react";

const LOCAL_KEY = "postPropertyStep6"; // LocalStorage key

const amenitiesList = [
  "Maintenance Staff", "Water Storage", "Security / Fire Alarm",
  "Visitor Parking", "Feng Shui / Vaastu Compliant", "Park",
  "Intercom Facility", "Lift(s)"
];

const propertyFeaturesList = [
  "High Ceiling Height", "False Ceiling Lighting", "Piped-gas",
  "Internet/wi-fi connectivity", "Centrally Air Conditioned",
  "Water purifier", "Recently Renovated", "Private Garden / Terrace",
  "Natural Light", "Airy Rooms", "Spacious Interiors"
];

const societyFeaturesList = [
  "Water softening plant", "Shopping Centre", "Fitness Centre / GYM",
  "Swimming Pool", "Club house / Community Center", "Security Personnel"
];

const additionalFeaturesList = [
  "Separate entry for servant room", "Waste Disposal",
  "No open drainage around", "Rain Water Harvesting",
  "Bank Attached Property", "Low Density Society"
];

const waterSourcesList = [
  "Municipal corporation", "Borewell/Tank", "24*7 Water"
];

const overlookingList = [
  "Pool", "Park/Garden", "Club", "Main Road", "Others"
];

const otherFeaturesList = [
  "In a gated society", "Corner Property", "Pet Friendly", "Wheelchair friendly"
];

const powerBackupOptions = ["None", "Partial", "Full"];

const propertyFacingOptions = [
  "North", "South", "East", "West", "North-East", "North-West",
  "South-East", "South-West"
];

const locationAdvantage = [
  "Close to Metro Station", "Close to School", "Close to Hospital", "Close to Market",
  "Close to Railway Station", "Close to Airport", "Close to Mall", "Close to Highway"
];

export default function Step6({ onBack, onNext }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedSocietyFeatures, setSelectedSocietyFeatures] = useState([]);
  const [selectedAdditionalFeatures, setSelectedAdditionalFeatures] = useState([]);
  const [selectedWaterSources, setSelectedWaterSources] = useState([]);
  const [selectedOverlooking, setSelectedOverlooking] = useState([]);
  const [otherFeatures, setOtherFeatures] = useState([]);
  const [locationAdvantage1, setlocationAdvantage1] = useState([]);
  const [powerBackup, setPowerBackup] = useState("None");
  const [propertyFacing, setPropertyFacing] = useState("");
  const [flooringType, setFlooringType] = useState("");
  const [roadWidth, setRoadWidth] = useState("");
  const [roadUnit, setRoadUnit] = useState("Feet");

  const [errors, setErrors] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved) {
      setSelectedAmenities(saved.selectedAmenities || []);
      setSelectedFeatures(saved.selectedFeatures || []);
      setSelectedSocietyFeatures(saved.selectedSocietyFeatures || []);
      setSelectedAdditionalFeatures(saved.selectedAdditionalFeatures || []);
      setSelectedWaterSources(saved.selectedWaterSources || []);
      setSelectedOverlooking(saved.selectedOverlooking || []);
      setOtherFeatures(saved.otherFeatures || []);
      setlocationAdvantage1(saved.locationAdvantage1 || []);
      setPowerBackup(saved.powerBackup || "None");
      setPropertyFacing(saved.propertyFacing || "");
      setFlooringType(saved.flooringType || "");
      setRoadWidth(saved.roadWidth || "");
      setRoadUnit(saved.roadUnit || "Feet");
    }
    setIsDataLoaded(true);
  }, []);

  // ✅ Save to localStorage on any change (after initial load)
  useEffect(() => {
    if (!isDataLoaded) return;
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        selectedAmenities,
        selectedFeatures,
        selectedSocietyFeatures,
        selectedAdditionalFeatures,
        selectedWaterSources,
        selectedOverlooking,
        otherFeatures,
        locationAdvantage1,
        powerBackup,
        propertyFacing,
        flooringType,
        roadWidth,
        roadUnit,
      })
    );
  }, [
    selectedAmenities,
    selectedFeatures,
    selectedSocietyFeatures,
    selectedAdditionalFeatures,
    selectedWaterSources,
    selectedOverlooking,
    otherFeatures,
    locationAdvantage1,
    powerBackup,
    propertyFacing,
    flooringType,
    roadWidth,
    roadUnit,
    isDataLoaded,
  ]);

  // ✅ Reusable toggler
  const toggleItem = (item, list, setList) => {
    setList(
      list.includes(item) ? list.filter(i => i !== item) : [...list, item]
    );
  };

  const renderToggleButtons = (list, selected, setSelected) => (
    <div className="flex flex-wrap gap-3 mb-6">
      {list.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => toggleItem(item, selected, setSelected)}
          className={`px-4 py-2 rounded-full border text-sm ${
            selected.includes(item)
              ? "bg-blue-100 text-blue-700 border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {selected.includes(item) ? "\u2713 " : "+ "}
          {item}
        </button>
      ))}
    </div>
  );

  const validateForm = () => {
    const newErrors = {};
    if (!flooringType) newErrors.flooringType = "Flooring type is required";
    if (!propertyFacing) newErrors.propertyFacing = "Select property facing direction";
    if (!roadWidth || isNaN(roadWidth) || Number(roadWidth) <= 0) {
      newErrors.roadWidth = "Enter valid road width";
    }
    if (!roadUnit || roadUnit === "Select") newErrors.roadUnit = "Select road unit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    onNext({
      selectedAmenities,
      selectedFeatures,
      selectedSocietyFeatures,
      selectedAdditionalFeatures,
      selectedWaterSources,
      selectedOverlooking,
      otherFeatures,
      powerBackup,
      propertyFacing,
      flooringType,
      roadWidth,
      roadUnit,
      locationAdvantage1,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-1">Add amenities/unique features</h2>
      <p className="text-sm text-gray-500 mb-6">All fields are optional unless required.</p>

      <h3 className="text-md font-medium mb-2">Amenities</h3>
      {renderToggleButtons(amenitiesList, selectedAmenities, setSelectedAmenities)}

      <h3 className="text-md font-medium mb-2">Property Features</h3>
      {renderToggleButtons(propertyFeaturesList, selectedFeatures, setSelectedFeatures)}

      <h3 className="text-md font-medium mb-2">Society/Building Features</h3>
      {renderToggleButtons(societyFeaturesList, selectedSocietyFeatures, setSelectedSocietyFeatures)}

      <h3 className="text-md font-medium mb-2">Additional Features</h3>
      {renderToggleButtons(additionalFeaturesList, selectedAdditionalFeatures, setSelectedAdditionalFeatures)}

      <h3 className="text-md font-medium mb-2">Water Source</h3>
      {renderToggleButtons(waterSourcesList, selectedWaterSources, setSelectedWaterSources)}

      <h3 className="text-md font-medium mb-2">Overlooking</h3>
      {renderToggleButtons(overlookingList, selectedOverlooking, setSelectedOverlooking)}

      <h3 className="text-md font-medium mb-2">Other Features</h3>
      <div className="flex flex-col gap-2 mb-6">
        {otherFeaturesList.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={otherFeatures.includes(item)}
              onChange={() => toggleItem(item, otherFeatures, setOtherFeatures)}
              className="accent-blue-600"
            />
            {item}
          </label>
        ))}
      </div>

      <h3 className="text-md font-medium mb-2">Power Backup</h3>
      <div className="flex gap-4 mb-6">
        {powerBackupOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setPowerBackup(opt)}
            className={`px-4 py-1.5 rounded-full border text-sm ${
              powerBackup === opt
                ? "bg-blue-100 text-blue-700 border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <h3 className="text-md font-medium mb-2">Property Facing</h3>
      <div className="flex flex-wrap gap-3 mb-1">
        {propertyFacingOptions.map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => setPropertyFacing(dir)}
            className={`px-4 py-1.5 rounded-full border text-sm ${
              propertyFacing === dir
                ? "bg-blue-100 text-blue-700 border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {dir}
          </button>
        ))}
      </div>
      {errors.propertyFacing && <div className="text-red-500 text-sm mt-1">{errors.propertyFacing}</div>}

      <h3 className="text-md font-medium mb-2 mt-6">Type of Flooring</h3>
      <select
        value={flooringType}
        onChange={(e) => setFlooringType(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-1"
      >
        <option value="">Select</option>
        <option>Marble</option>
        <option>Concrete</option>
        <option>Polished concrete</option>
        <option>Granite</option>
        <option>Ceramic</option>
        <option>Vitrified</option>
        <option>Wooden</option>
        <option>Mosaic</option>
      </select>
      {errors.flooringType && <div className="text-red-500 text-sm mt-1">{errors.flooringType}</div>}

      <h3 className="text-md font-medium mb-2 mt-6">Width of Facing Road</h3>
      <div className="flex gap-3 mb-1">
        <input
          type="number"
          min="0"
          value={roadWidth}
          onChange={(e) => setRoadWidth(e.target.value)}
          placeholder="Enter the width"
          className="border px-3 py-2 rounded w-full"
        />
        <select
          value={roadUnit}
          onChange={(e) => setRoadUnit(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option>Select</option>
          <option>Feet</option>
          <option>Meter</option>
        </select>
      </div>
      {errors.roadWidth && <div className="text-red-500 text-sm">{errors.roadWidth}</div>}
      {errors.roadUnit && <div className="text-red-500 text-sm">{errors.roadUnit}</div>}

      <h3 className="text-md font-medium mb-2 mt-6">Location Advantages</h3>
      {renderToggleButtons(locationAdvantage, locationAdvantage1, setlocationAdvantage1)}

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
          Continue
        </button>
      </div>
    </div>
  );
}