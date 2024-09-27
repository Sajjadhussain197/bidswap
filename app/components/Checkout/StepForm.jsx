"use client";
import React, { useEffect } from 'react';
import PersonalDetailsForm from './StepForms/PersonalDetailsForm';
import ShippingDetailsForm from './StepForms/ShippingDetailsForm';
import PaymentMethodForm from './StepForms/PaymentMethodForm';
import OrderSummaryForm from './StepForms/OrderSummaryForm';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { setCurrentStep } from '@/redux/slices/checkoutSlice';

export default function StepForm() {
    const currentStep = useSelector((store) => store.checkout?.currentStep || 1);
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    // Effect to handle step initialization
    useEffect(() => {
        const step = searchParams.get('step');
        console.log(step, "step from url");
        if (step) {
            const parsedStep = parseInt(step);
            console.log(parsedStep, "parsedStep from url parsed");
            if (!isNaN(parsedStep)) {
                dispatch(setCurrentStep(parsedStep));
            }
        }
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

    return (
        <div>
            {renderFormByStep(currentStep)}
        </div>
    );
}