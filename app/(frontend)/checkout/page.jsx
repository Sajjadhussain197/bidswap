"use client";
import CartBanner from "@/app/components/Checkout/CartBanner";
import StepForm from "@/app/components/Checkout/StepForm";
import Steps from "@/app/components/Checkout/Steps";
import { useSearchParams } from "next/navigation"; // Hook to read query params
import React, { useEffect, useState } from "react";

export default function CheckoutPage() {
  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Shipping Details" },
    { number: 3, title: "Payment Method" },
    { number: 4, title: "Order Summary" },
  ];

  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1); // Default step is 1

  // Check if there's a step parameter in the query and update the current step
  useEffect(() => {
    const stepFromQuery = searchParams.get("step");
    if (stepFromQuery) {
      setCurrentStep(parseInt(stepFromQuery, 10)); // Convert query param to number
    }
  }, [searchParams]);

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto border border-lime-500 p-6">
        {/* Steps */}
        <Steps steps={steps} currentStep={currentStep} />

        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Banner */}
          <CartBanner />

          {/* Form */}
          <StepForm currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
}
