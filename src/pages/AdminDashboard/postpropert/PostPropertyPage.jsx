// components/PropertyStepper.jsx
import React from "react";

const steps = [
  "Basic Details",
  "Location Details",
  "Property Profile",
  "Photos, Videos",
  "Pricing & Others",
  "Amenities section",
  "Final Details"
];

export default function PropertyStepper({ currentStep }) {
  return (
    <div className="w-64 bg-gray-50 p-4 rounded shadow">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;

        return (
          <div key={index} className="relative flex items-start mb-6">
            {/* Left circle + line */}
            <div className="flex flex-col items-center mr-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center
                  ${isCompleted ? "bg-blue-600" : isActive ? "border-2 border-blue-600 bg-white" : "border-2 border-gray-400 bg-white"}`}
              >
                {isCompleted ? (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                ) : isActive ? (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                ) : null}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`h-10 w-px ${
                    currentStep > index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>

            {/* Text */}
            <div>
              <p
                className={`text-sm font-semibold ${
                  isCompleted || isActive ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {step}
              </p>
              <p className="text-xs text-gray-500">Step {index + 1}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}