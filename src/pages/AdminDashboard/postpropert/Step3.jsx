import React, { useState } from "react";

export default function Step3({ onNext, onBack, defaultValues = {} }) {
  const [totalRooms, setTotalRooms] = useState(defaultValues.totalRooms || "");
  const [washrooms, setWashrooms] = useState(defaultValues.washrooms || "");
  const [balconies, setBalconies] = useState(defaultValues.balconies || "");
  const [areaDetails, setAreaDetails] = useState(defaultValues.areaDetails || {
    carpet: "",
    carpetUnit: "sq.ft.",
    builtUp: "",
    builtUpUnit: "sq.ft.",
    superBuiltUp: "",
    superBuiltUpUnit: "sq.ft.",
  });

  const [showBuiltUp, setShowBuiltUp] = useState(!!defaultValues?.areaDetails?.builtUp);
  const [showSuperBuiltUp, setShowSuperBuiltUp] = useState(!!defaultValues?.areaDetails?.superBuiltUp);
  const [furnishing, setFurnishing] = useState(defaultValues.furnishing || "");
  const [furnishingDetails, setFurnishingDetails] = useState(defaultValues.furnishingDetails || {});
  const [availability, setAvailability] = useState(defaultValues.availability || "");
  const [possessionBy, setPossessionBy] = useState(defaultValues.possessionBy || "");
  const [age, setAge] = useState(defaultValues.age || "");


  const [showBedroomInput, setShowBedroomInput] = useState(false);
  const [customBedroom, setCustomBedroom] = useState("");
  const [showBathroomInput, setShowBathroomInput] = useState(false);
  const [customBathroom, setCustomBathroom] = useState("");

  const [selectedRooms, setSelectedRooms] = useState(defaultValues.otherRooms || []);
  const [coveredParking, setCoveredParking] = useState(defaultValues.coveredParking || 0);
  const [openParking, setOpenParking] = useState(defaultValues.openParking || 0);
  const [totalFloors, setTotalFloors] = useState(defaultValues.totalFloors || "");
  const [propertyOnFloor, setPropertyOnFloor] = useState(defaultValues.propertyOnFloor || "");

  const [formErrors, setFormErrors] = useState({});

  const areaUnits = ["sq.ft.", "sq.yards", "sq.m.", "acres", "marla", "cents", "bigha", "kottah", "kanal", "ground", "ares", "biswa", "guntha", "aankadam", "hectares", "rood", "chataks", "perch"];

  const toggleRoom = (room) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const handleQtyChange = (item, delta) => {
    setFurnishingDetails((prev) => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) + delta),
    }));
  };

  const handleCheckboxChange = (item) => {
    setFurnishingDetails((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleSubmit = () => {
    const errors = {};
    if (!totalRooms) errors.totalRooms = "Please select number of bedrooms.";
    if (!washrooms) errors.washrooms = "Please select number of bathrooms.";
    if (!balconies) errors.balconies = "Please select number of balconies.";
    if (!areaDetails.carpet) errors.carpet = "Carpet area is required.";
    if (!availability) errors.availability = "Availability must be selected.";
    if (availability === "Under construction" && !possessionBy)
      errors.possessionBy = "Possession year is required.";
    if (availability === "Ready to move" && !age)
      errors.age = "Property age is required.";

    const furnishingCount = Object.values(furnishingDetails).reduce(
      (acc, val) => acc + (typeof val === "number" ? (val > 0 ? 1 : 0) : val ? 1 : 0),
      0
    );

    if (furnishing === "Furnished" && furnishingCount < 3)
      errors.furnishing = "Minimum 3 furnishings required for Furnished.";
    if (furnishing === "Semi-furnished" && furnishingCount < 1)
      errors.furnishing = "At least 1 furnishing required for Semi-furnished.";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const selectedFurnishings = Object.keys(furnishingDetails).filter(
      (key) => furnishingDetails[key]
    );
    const data = {
      step3: {
        configuration: {
          totalRooms: Number(totalRooms),
          washrooms: Number(washrooms),
          balconies: Number(balconies),
          floorNo: propertyOnFloor,
          totalFloors: Number(totalFloors),
          furnishing,
          furnishingDetails: selectedFurnishings,// array of strings (e.g. ['Fan', 'Light'])
          otherRooms: selectedRooms, // array of strings (e.g. ['Pooja Room'])
          coveredParking: Number(coveredParking),
          openParking: Number(openParking),
        },
        areaDetails: {
          carpet: Number(areaDetails.carpet),
          carpetUnit: areaDetails.carpetUnit,
          builtUp: areaDetails.builtUp ? Number(areaDetails.builtUp) : null,
          builtUpUnit: areaDetails.builtUpUnit || null,
          superBuiltUp: areaDetails.superBuiltUp ? Number(areaDetails.superBuiltUp) : null,
          superBuiltUpUnit: areaDetails.superBuiltUpUnit || null,
        },
        availability,
        possessionBy: availability === "Under construction" ? possessionBy : null,
        age: availability === "Ready to move" ? age : null,
      },
    };

    onNext(data);
    console.log(data)

  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tell us about your property</h2>

      {/* Bedrooms */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">No. of Bedrooms</label>
        {formErrors.totalRooms && (
          <p className="text-red-600 text-sm mt-1">{formErrors.totalRooms}</p>
        )}
        <div className="flex flex-wrap gap-3 mb-2">
          {["1", "2", "3", "4"].map((opt) => (
            <button
              key={opt}
              onClick={() => setTotalRooms(opt)}
              className={`px-4 py-2 border rounded-full ${totalRooms === opt ? "bg-blue-100 border-blue-600 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {!showBedroomInput && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => setShowBedroomInput(true)}
          >
            + Add other
          </button>
        )}
        {showBedroomInput && (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              placeholder="Enter number"
              value={customBedroom}
              onChange={(e) => setCustomBedroom(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={() => {
                setTotalRooms(customBedroom);
                setShowBedroomInput(false);
                setCustomBedroom("");
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Bathrooms */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">No. of Bathrooms</label>
        {formErrors.washrooms && (
          <p className="text-red-600 text-sm mt-1">{formErrors.washrooms}</p>
        )}
        <div className="flex flex-wrap gap-3 mb-2">
          {["1", "2", "3", "4"].map((opt) => (
            <button
              key={opt}
              onClick={() => setWashrooms(opt)}
              className={`px-4 py-2 border rounded-full ${washrooms === opt ? "bg-blue-100 border-blue-600 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {!showBathroomInput && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => setShowBathroomInput(true)}
          >
            + Add other
          </button>
        )}
        {showBathroomInput && (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              placeholder="Enter number"
              value={customBathroom}
              onChange={(e) => setCustomBathroom(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={() => {
                setWashrooms(customBathroom);
                setShowBathroomInput(false);
                setCustomBathroom("");
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Balconies */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">No. of Balconies</label>
        {formErrors.balconies && (
          <p className="text-red-600 text-sm mt-1">{formErrors.balconies}</p>
        )}
        <div className="flex flex-wrap gap-3">
          {["0", "1", "2", "3", "More than 3"].map((opt) => (
            <button
              key={opt}
              onClick={() => setBalconies(opt)}
              className={`px-4 py-2 border rounded-full ${balconies === opt ? "bg-blue-100 border-blue-600 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Area Details */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Add Area Details <span className="text-gray-400 cursor-help" title="Enter area in square feet">&#9432;</span>
        </label>

        {formErrors.carpet && (
          <p className="text-red-600 text-sm mt-1">{formErrors.carpet}</p>
        )}
        <p className="text-sm text-gray-500 mb-2">At least one area type is mandatory</p>

        {/* Carpet Area */}
        <div className="mb-3">
          <label className="text-blue-700 text-sm font-medium">Carpet Area</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={areaDetails.carpet}
              onChange={(e) =>
                setAreaDetails({ ...areaDetails, carpet: e.target.value })
              }
              placeholder="Enter value"
              className="flex-1 border rounded px-2 py-1 outline-none"
            />
            <select
              value={areaDetails.carpetUnit}
              onChange={(e) =>
                setAreaDetails({ ...areaDetails, carpetUnit: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {areaUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Built-up Area */}
        {showBuiltUp ? (
          <div className="mb-3">
            <label className="text-blue-700 text-sm font-medium">Built-up Area</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={areaDetails.builtUp}
                onChange={(e) =>
                  setAreaDetails({ ...areaDetails, builtUp: e.target.value })
                }
                placeholder="Enter value"
                className="flex-1 border rounded px-2 py-1 outline-none"
              />
              <select
                value={areaDetails.builtUpUnit}
                onChange={(e) =>
                  setAreaDetails({ ...areaDetails, builtUpUnit: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {areaUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <button
            className="text-blue-600 text-sm mr-4"
            onClick={() => setShowBuiltUp(true)}
          >
            + Add Built-up Area
          </button>
        )}

        {/* Super Built-up Area */}
        {showSuperBuiltUp ? (
          <div className="mb-3">
            <label className="text-blue-700 text-sm font-medium">Super Built-up Area</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={areaDetails.superBuiltUp}
                onChange={(e) =>
                  setAreaDetails({ ...areaDetails, superBuiltUp: e.target.value })
                }
                placeholder="Enter value"
                className="flex-1 border rounded px-2 py-1 outline-none"
              />
              <select
                value={areaDetails.superBuiltUpUnit}
                onChange={(e) =>
                  setAreaDetails({ ...areaDetails, superBuiltUpUnit: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {areaUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <button
            className="text-blue-600 text-sm"
            onClick={() => setShowSuperBuiltUp(true)}
          >
            + Add Super Built-up Area
          </button>
        )}
      </div>


      {/* Other Rooms */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Other rooms <span className="text-sm font-normal text-gray-500">(Optional)</span>
        </label>

        <div className="flex flex-wrap gap-3 mt-2">
          {["Pooja Room", "Study Room", "Servant Room", "Store Room"].map((room) => {
            const isSelected = selectedRooms.includes(room);
            return (
              <button
                key={room}
                onClick={() => toggleRoom(room)}
                className={`flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm transition-all
            ${isSelected
                    ? "text-blue-900 bg-blue-50 border-blue-500"
                    : "text-blue-900 bg-white border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {isSelected && <span className="text-blue-600 font-bold text-lg">✓</span>}
                {!isSelected && <span className="text-blue-700 font-bold text-lg">+</span>}
                {room}
              </button>
            );
          })}
        </div>
      </div>



      {/* Furnishing */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Furnishing</label>
        {formErrors.furnishing && <p className="text-red-600">{formErrors.furnishing}</p>}
        <div className="flex gap-3 mb-3">
          {["Furnished", "Semi-furnished", "Un-furnished"].map((opt) => (
            <button
              key={opt}
              onClick={() => setFurnishing(opt)}
              className={`px-4 py-2 border rounded-full ${furnishing === opt ? "bg-blue-100 border-blue-600 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {(furnishing === "Furnished" || furnishing === "Semi-furnished") && (
          <div className="border p-4 rounded bg-gray-50 space-y-3">
            <p className="text-sm text-gray-700">
              {furnishing === "Furnished"
                ? "At least three furnishings are mandatory for furnished"
                : "At least one furnishing is mandatory for semi-furnished"}
            </p>

            {[["Light", "Fans"], ["AC", "TV"], ["Beds", "Wardrobe"], ["Geyser"]].map((row, idx) => (
              <div key={idx} className="flex gap-6">
                {row.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <button onClick={() => handleQtyChange(item, -1)} className="px-2 border border-[#ccc] rounded-full w-[25px] h-[25px] flex items-center justify-center text-[36px] pb-[9px]">-</button>
                    <span className="min-w-[24px] text-center">{furnishingDetails[item] || 0}</span>
                    <button onClick={() => handleQtyChange(item, 1)} className="px-2 border border-[#ccc] rounded-full w-[25px] h-[25px] flex items-center justify-center text-[22px] pb-[5px]">+</button>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {[
                "Sofa", "WashingMachine", "Stove", "WaterPurifier", "Fridge", "Microwave",
                "ModularKitchen", "Chimney", "DinningTable", "Curtains", "ExhaustFan"
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!furnishingDetails[item]}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  <span>{item.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reserved Parking */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Reserved Parking <span className="text-sm font-normal text-gray-500">(Optional)</span>
        </label>

        <div className="flex items-center gap-6 mt-2 flex-wrap">
          {/* Covered Parking */}
          <div className="flex items-center gap-2">
            <span className="text-gray-800">Covered Parking</span>
            <button
              onClick={() => setCoveredParking(Math.max(0, coveredParking - 1))}
              className="w-8 h-8 flex items-center justify-center border rounded-full text-lg text-gray-600"
            >
              −
            </button>
            <span className="min-w-[20px] text-center">{coveredParking}</span>
            <button
              onClick={() => setCoveredParking(coveredParking + 1)}
              className="w-8 h-8 flex items-center justify-center border rounded-full text-lg text-gray-600"
            >
              +
            </button>
          </div>

          {/* Open Parking */}
          <div className="flex items-center gap-2">
            <span className="text-gray-800">Open Parking</span>
            <button
              onClick={() => setOpenParking(Math.max(0, openParking - 1))}
              className="w-8 h-8 flex items-center justify-center border rounded-full text-lg text-gray-600"
            >
              −
            </button>
            <span className="min-w-[20px] text-center">{openParking}</span>
            <button
              onClick={() => setOpenParking(openParking + 1)}
              className="w-8 h-8 flex items-center justify-center border rounded-full text-lg text-gray-600"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Floor Details */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Floor Details</label>
        <p className="text-sm text-gray-500 mb-2">Total no of floors and your floor details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Floors */}
          <input
            type="number"
            placeholder="Total Floors"
            value={totalFloors}
            onChange={(e) => setTotalFloors(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />

          {/* Property on Floor Dropdown */}
          <select
            value={propertyOnFloor}
            onChange={(e) => setPropertyOnFloor(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          >
            <option value="">Property on Floor</option>
            <option value="Basement">Basement</option>
            <option value="Lower Ground">Lower Ground</option>
            <option value="Ground">Ground</option>
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>



      {/* Availability */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Availability Status</label>
        {formErrors.availability && <p className="text-red-600">{formErrors.availability}</p>}
        <div className="flex flex-wrap gap-3">
          {["Ready to move", "Under construction"].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setAvailability(opt);
                setAge("");
                setPossessionBy("");
              }}
              className={`px-4 py-2 border rounded-full ${availability === opt ? "bg-blue-100 border-blue-600 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Possession By */}
      {availability === "Under construction" && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">Possession By</label>
          {formErrors.possessionBy && <p className="text-red-600">{formErrors.possessionBy}</p>}
          <select
            value={possessionBy}
            onChange={(e) => setPossessionBy(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Expected by</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
          </select>
        </div>
      )}

      {/* Age */}
      {availability === "Ready to move" && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">Age of property</label>
          {formErrors.age && <p className="text-red-600">{formErrors.age}</p>}
          <div className="flex flex-wrap gap-3">
            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((opt) => (
              <button
                key={opt}
                onClick={() => setAge(opt)}
                className={`px-4 py-2 border rounded-full ${age === opt ? "bg-blue-100 border-blue-600 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}


      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}