"use client";

import React, { useEffect, useState } from 'react';
import PersonalDetailsForm from './StepForms/PersonalDetailsForm';
import ShippingDetailsForm from './StepForms/ShippingDetailsForm';
import PaymentMethodForm from './StepForms/PaymentMethodForm';
import OrderSummaryForm from './StepForms/OrderSummaryForm';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { setCurrentStep, updateCheckoutFormData } from './StepForms/checkoutSlice';

export default function StepForm() {
    const currentStep = useSelector((store) => store.checkout?.currentStep || 1);
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [storedStep, setStoredStep] = useState(1); // State to keep track of the stored step


  useEffect(() => {
    const step = parseInt(searchParams.get('currentStep')) || 1;
    const data = {};

    // Assume the form data has keys like 'name', 'email', etc.
    searchParams.forEach((value, key) => {
      if (key !== 'currentStep') {
        data[key] = value;
      }
    });

    dispatch(setCurrentStep(step));
    // dispatch(updateCheckoutFormData(data));
  }, [searchParams, dispatch]);
    // Function to render forms based on current step
    function renderFormByStep(step) {
        switch (step) {
            case 1:
                return <PersonalDetailsForm />;
            case 2:
                return <ShippingDetailsForm />;
            case 3:
                return <PaymentMethodForm />;
            case 4:
                return <OrderSummaryForm />;
            default:
                return <PersonalDetailsForm />; // Fallback to step 1
        }
    }

    // Effect to handle step transition after Stripe redirect
    useEffect(() => {
        // Assuming there's a way to detect if the user has been redirected back from Stripe
        // This could be done by checking for a specific query parameter or cookie set by Stripe
        if (storedStep === 3 || storedStep === 4) {
            dispatch(setCurrentStep(storedStep));
        }
    }, [storedStep, dispatch]);

    return (
        <div>
            {renderFormByStep(currentStep)}
        </div>
    );
}