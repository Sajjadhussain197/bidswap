"use client";
import CartBanner from "@/app/components/Checkout/CartBanner";
import StepForm from "@/app/components/Checkout/StepForm";
import Steps from "@/app/components/Checkout/Steps";
import { ChevronRight, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const steps = [
    {
      number: 1,
      title: "Personal Details",
    },
    {
      number: 2,
      title: "Shipping Details",
    },
    {
      number: 3,
      title: "Payment Method",
    },
    {
      number: 4,
      title: "Order Summary",
    },
  ];
 
  
  return (
   <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
        <div className="max-w-3xl my-6 mx-auto border border-lime-500 p-6">
          
          {/* Steps */}
          <Steps steps={steps} />
        <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg 
        shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Banner */}
         <CartBanner/>
           {/* Form */}
         <StepForm/>

        </div>

         
        </div>
   </div>
  );
}