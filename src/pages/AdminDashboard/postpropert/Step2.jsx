import React, { useState } from "react";
import { LocateFixed } from 'lucide-react';

export default function Step2({ onNext, onBack, defaultValues = {} }) {
  const [city, setCity] = useState(defaultValues?.location?.city || "");
  const [locality, setLocality] = useState(defaultValues?.location?.locality || "");
  const [subLocality, setSubLocality] = useState(defaultValues?.location?.subLocality || "");
  const [project, setProject] = useState(defaultValues?.location?.project || "");
  const [latitude, setLatitude] = useState(defaultValues?.location?.coordinates?.latitude || null);
  const [longitude, setLongitude] = useState(defaultValues?.location?.coordinates?.longitude || null);
  const [errors, setErrors] = useState({});
  

  // 📍 Pick location via GPS
  const handlePickLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        setLatitude(latitude);
        setLongitude(longitude);

        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=437e4d144da94ca2a78f586d45c09a78`
          );
          const data = await res.json();
          const components = data?.results?.[0]?.components || {};
          const foundCity =
            components.city || components.town || components.village || components.county;

          if (foundCity) {
            setCity(foundCity);
            setErrors((prev) => ({ ...prev, city: undefined }));
          } else {
            alert("Unable to detect city from location.");
          }
        } catch (error) {
          console.error("Location fetch error:", error);
          alert("Error fetching location. Please try again.");
        }
      },
      (err) => {
        alert("Location permission denied or unavailable.");
      }
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!city) newErrors.city = "City is required. Click on 'Pick my location'.";
    if (!locality.trim()) newErrors.locality = "Locality is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    onNext({
      location: {
        city,
        locality,
        subLocality,
        project,
        coordinates: {
          latitude,
          longitude,
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Where is your property located?</h2>
      <p className="text-gray-600 mb-4">An accurate location helps you connect with the right buyers.</p>

      {/* City Input */}
      <div className="relative mb-2">
        <input
          type="text"
          placeholder="City"
          value={city}
          readOnly
          className={`w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed outline-blue-500 ${
            errors.city ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={handlePickLocation}
          className="absolute right-2 top-2 text-blue-600 text-sm flex items-center gap-2"
        >
          <LocateFixed /> Pick my location
        </button>
      </div>
      {errors.city && <p className="text-red-500 text-sm mb-2">{errors.city}</p>}

      {/* Locality */}
      <input
        type="text"
        placeholder="Locality"
        value={locality}
        onChange={(e) => {
          setLocality(e.target.value);
          setErrors((prev) => ({ ...prev, locality: undefined }));
        }}
        className={`w-full border px-4 py-2 rounded mb-1 outline-blue-500 ${
          errors.locality ? "border-red-500" : ""
        }`}
      />
      {errors.locality && (
        <p className="text-red-500 text-sm mb-2">{errors.locality}</p>
      )}

      {/* Sub Locality */}
      <input
        type="text"
        placeholder="Sub Locality (Optional)"
        value={subLocality}
        onChange={(e) => setSubLocality(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-4 outline-blue-500"
      />

      {/* Project */}
      <input
        type="text"
        placeholder="Project (Optional)"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-6 outline-blue-500"
      />

      {/* Buttons */}
      <div className="flex justify-between">
        <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleContinue} className="bg-blue-600 text-white px-6 py-2 rounded">
          Continue
        </button>
      </div>
    </div>
  );
}