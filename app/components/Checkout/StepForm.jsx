"use client";
import React from 'react'
import PersonalDetailsForm from './StepForms/PersonalDetailsForm';
import ShippingDetailsForm from './StepForms/ShippingDetailsForm';
import PaymentMethodForm from './StepForms/PaymentMethodForm';
import OrderSummaryForm from './StepForms/OrderSummaryForm';
import { useSelector } from 'react-redux';

export default function StepForm() {
    const currentStep = useSelector((store) => store.checkout?.currentStep || 1);

    
    function renderFormByStep(step){
        if(step===1){
            return <PersonalDetailsForm/>
        }else if(step===2){
            return <ShippingDetailsForm/>
        }else if(step===3){
            return <PaymentMethodForm/>
        }else if(step===4){
            return <OrderSummaryForm/>
        }
    }
  return <div>
      {renderFormByStep(currentStep)}
    </div>
  
}
