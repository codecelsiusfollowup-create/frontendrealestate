import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import PropertyStepper from "./PostPropertyPage";

import Step1 from "./PostPropertyStep1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

export default function PostPropertyPage() {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep !== null ? parseInt(savedStep) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const savedForm = localStorage.getItem("formData");
    return savedForm ? JSON.parse(savedForm) : {};
  });

  // 💾 Save step & data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);

  const updateData = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    goNext();
  };

  const handleSubmitFinal = async (step7Data) => {
    const fullData = { ...formData, ...step7Data };
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://a-new-vercel.onrender.com/api/properties/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fullData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Property submitted successfully!");
        console.log("Response:", result);
        setCurrentStep(0);
        setFormData({});
        localStorage.removeItem("currentStep");
        localStorage.removeItem("formData");
      } else {
        alert("❌ Failed to submit property.");
        console.error(result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Server error occurred!");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex gap-6 p-6">
        <PropertyStepper currentStep={currentStep} />
        <div className="flex-1 bg-white rounded shadow p-6">
          {currentStep === 0 && (
            <Step1 onNext={updateData} defaultValues={formData} />
          )}
          {currentStep === 1 && (
            <Step2 onNext={updateData} onBack={goBack} defaultValues={formData} />
          )}
          {currentStep === 2 && (
            <Step3 onNext={updateData} onBack={goBack} defaultValues={formData} />
          )}
          {currentStep === 3 && (
            <Step4 onNext={updateData} onBack={goBack} defaultValues={formData} />
          )}
          {currentStep === 4 && (
            <Step5 onNext={updateData} onBack={goBack} defaultValues={formData} />
          )}
          {currentStep === 5 && (
            <Step6 onNext={updateData} onBack={goBack} defaultValues={formData} />
          )}
          {currentStep === 6 && (
            <Step7 onSubmit={handleSubmitFinal} onBack={goBack} defaultValues={formData} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
