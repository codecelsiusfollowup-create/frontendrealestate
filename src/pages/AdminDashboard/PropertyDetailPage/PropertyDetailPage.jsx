// ✅ REPLACE your PropertyDetailPage.jsx with this final version

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../../components/DashboardLayout";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { furnishingIcons } from "./iconMap";
import { Layout, Sliders, IndianRupee, MapPin, Building, Compass, Hourglass, BatteryCharging, ParkingCircle, Sofa, BadgeCheck } from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("photos");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`https://backend-six-indol-62.vercel.app/api/property/${id}`);
        setProperty(res.data.property || res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Failed to fetch property", err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div className="p-6 text-center">Loading...</div>;

  const photos = property.photos || [];
  const videos = property.videos || [];
  const currentPhotoUrl = photos[currentImgIndex]?.url || "https://via.placeholder.com/600x400";

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-10">

        {/* Media Tabs */}
        <div className="bg-white rounded shadow">
          <div className="flex gap-6 px-6 pt-4 border-b">
            <button onClick={() => setActiveTab("photos")} className={`pb-2 text-sm font-medium ${activeTab === "photos" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}>Photos ({photos.length})</button>
            <button onClick={() => setActiveTab("videos")} className={`pb-2 text-sm font-medium ${activeTab === "videos" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}>Videos ({videos.length})</button>
          </div>

          <div className="relative p-4">
            {activeTab === "photos" && photos.length > 0 && (
              <div className="relative rounded overflow-hidden shadow">
                <img src={currentPhotoUrl} alt={`Property ${currentImgIndex + 1}`} className="w-full h-[400px] object-cover rounded" />
                {currentImgIndex > 0 && (
                  <button onClick={() => setCurrentImgIndex(currentImgIndex - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
                    <ChevronLeft />
                  </button>
                )}
                {currentImgIndex < photos.length - 1 && (
                  <button onClick={() => setCurrentImgIndex(currentImgIndex + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
                    <ChevronRight />
                  </button>
                )}
              </div>
            )}

            {activeTab === "videos" && videos.length > 0 && (
              <div className="grid gap-4">
                {videos.map((url, i) => (
                  <video key={i} controls className="w-full h-[400px] object-cover rounded">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Key Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 text-sm border border-gray-200">
            {/* Area & Configuration */}
            <div className="grid grid-cols-2 gap-4">
              {/* Area */}
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <Layout size={16} /> Area
                </div>
                <p className="text-gray-600">Carpet Area: {property.step3?.areaDetails?.carpet} {property.step3?.areaDetails?.carpetUnit}</p>
                <p className="text-gray-600">Built-up Area: {property.step3?.areaDetails?.builtUp} {property.step3?.areaDetails?.builtUpUnit}</p>
                <p className="text-gray-600">Super Built-up: {property.step3?.areaDetails?.superBuiltUp} {property.step3?.areaDetails?.superBuiltUpUnit}</p>
              </div>

              {/* Configuration */}
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <Sliders size={16} /> Configuration
                </div>
                <p className="text-gray-600">Total Rooms: {property.step3?.configuration?.totalRooms || "-"}</p>
                <p className="text-gray-600">Washrooms: {property.step3?.configuration?.washrooms || "-"}</p>
                <p className="text-gray-600">Balconies: {property.step3?.configuration?.balconies || "-"}</p>
              </div>
            </div>

            {/* Price & Address */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <IndianRupee size={16} /> Price
                </div>
                <p className="text-gray-600">₹{property.price?.toLocaleString() || "0"} @ ₹{property.pricePerSqFt || "0"}/sqft</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <MapPin size={16} /> Address
                </div>
                <p className="text-gray-600">City: {property.location?.city}</p>
                <p className="text-gray-600">Locality: {property.location?.locality}</p>
              </div>
            </div>

            {/* Floor & Facing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <Building size={16} /> Floor Info
                </div>
                <p className="text-gray-600">Floor No: {property.step3?.configuration?.floorNo}</p>
                <p className="text-gray-600">Total Floors: {property.step3?.configuration?.totalFloors}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <Compass size={16} /> Facing
                </div>
                <p className="text-gray-600">{property.propertyFacing}</p>
                <div className="flex items-center gap-2 mt-2 text-[15px] font-semibold text-gray-700">
                  <Hourglass size={16} /> Property Age
                </div>
                <p className="text-gray-600">{property.step3?.age || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 text-sm border border-gray-200">
            {/* Ownership & Furnishing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <BadgeCheck size={16} /> Ownership
                </div>
                <p className="text-gray-600">{property.ownership}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <Sofa size={16} /> Furnishing
                </div>
                <p className="text-gray-600">{property.step3?.configuration?.furnishing}</p>
              </div>
            </div>

            {/* Parking & Power Backup */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <ParkingCircle size={16} /> Parking
                </div>
                <p className="text-gray-600">Covered: {property.step3?.configuration?.coveredParking}</p>
                <p className="text-gray-600">Open: {property.step3?.configuration?.openParking}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 mb-1">
                  <BatteryCharging size={16} /> Power Backup
                </div>
                <p className="text-gray-600">{property.powerBackup}</p>
              </div>
            </div>
          </div>
        </div>


        {/* About */}
        <div className="bg-white p-6 rounded-2xl shadow-md grid gap-4">
          <h3 className="text-lg font-semibold text-gray-800">About Property</h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-medium text-gray-600">Address:</span>
            <p className="text-gray-800">{property.location?.city || "N/A"}</p>
          </div>

          {property.propertyDescription && (
            <p className="text-gray-700 leading-relaxed">
              {property.propertyDescription}
            </p>
          )}
        </div>


        {/* Furnishing */}
        <div className="bg-white p-6 rounded shadow text-sm">
          <h4 className="font-[500] text-[18px] mb-[5px]">{property.step3?.configuration?.furnishing}</h4>
          <p className="text-[16px] mb-[10px]">Furnishing Details</p>
          <div className="flex justify-between flex-wrap">
            {property?.step3?.configuration?.furnishingDetails?.map((item, index) => {
              const Icon = furnishingIcons[item];
              return (
                <li key={index} className="flex  gap-2 w-[15%] mb-4">
                  {Icon ? <Icon className="w-5 h-5 text-blue-500" /> : null}
                  <span>{item}</span>
                </li>
              );
            })}
          </div>


        </div>

        {/* Contact Details */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-3 text-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📞 Dealer Details</h3>

          <div className="text-gray-700">
            <span className="font-medium text-gray-600">Company Name: </span>
            {property.companyName || "-"}
          </div>

          <div className="text-gray-700">
            <span className="font-medium text-gray-600">Company URL: </span>
            {property.companyURL ? (
              <a
                href={property.companyURL}
                className="text-blue-600 underline break-all"
                target="_blank"
                rel="noreferrer"
              >
                {property.companyURL}
              </a>
            ) : (
              "-"
            )}
          </div>

          <div className="text-gray-700">
            <span className="font-medium text-gray-600">Mobile: </span>
            {property.mobile1 || "-"}
            {property.mobile2 && `, ${property.mobile2}`}
          </div>

          <div className="text-gray-700">
            <span className="font-medium text-gray-600">Address: </span>
            {property.address1 || "-"}
            {property.address2 && `, ${property.address2}`}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}