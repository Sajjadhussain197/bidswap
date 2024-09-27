"use client";
import React, { useState } from 'react';
import TextInput from '../../formInputs/TextInput';
import { useForm } from 'react-hook-form';
import ToggleInput from '../../formInputs/ToggleInput';
import axios from 'axios';
import NavButtons from './NavButtons';
import { Circle, CreditCard, HeartHandshake } from 'lucide-react'; // Corrected `Creditcard` to `CreditCard`
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, updatecheckoutFormData } from '@/redux/slices/checkoutSlice';
import { checkout } from '@/app/api/webhook/checkout';

export default function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep)
  const exitingformData = useSelector((store) => store.checkout.checkoutFormData);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        ...exitingformData,
      },
    });

  const initialPaymentMethod = exitingformData?.initialPaymentMethod || "";
  const [PaymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  console.log(exitingformData);

  async function processData(data) {
    data.PaymentMethod = PaymentMethod;
    console.log(data);
    // update the checkout data
    dispatch(updatecheckoutFormData(data));
    // update the current steps
    dispatch(setCurrentStep(currentStep + 1));
  } // Missing closing brace was added here
  const payWithCreditCard = async () => {
    console.log("Pay with Credit Card");
    console.log(exitingformData);
    try {
      const { data: { url } } = await axios.post("/api/payment", {
        name: exitingformData.selectedProduct?.title || '',
        price: exitingformData.selectedProduct?.price || 0
      })
      // console.log({ data });
      window.location.href = url;
      // redirect(url);

    } catch (error) {
      console.log(error.message);

    }

  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>
        Payment Method
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="col-span-full">
          <h3 className="mb-7 text-lg font-medium text-gray-900 dark:text-white">
            Which Payment method do you prefer?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="Cash on Delivery"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5
                text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer
                dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500
                peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 
                hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <HeartHandshake className="w-8 h-8 ms-3 flex-shrink-0" />
                  <p>Cash on Delivery</p>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="Credit Card"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5
                text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer
                dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500
                peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600
                hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <CreditCard className="w-8 h-8 ms-3 flex-shrink-0 text-green-400" />
                  <div onClick={async () => {
                    console.log("Pay with Credit Card data is here", exitingformData);
                    try {
                      const { data: { url } } = await axios.post("/api/payment", {
                        firstName: exitingformData.FirstName,
                        lastName: exitingformData.LastName,
                        email: exitingformData.Email,
                        phone: exitingformData.Phone,
                        userId: exitingformData.userId,
                        price: exitingformData.totalPrice,
                      })
                      console.log( url); 
                      dispatch(setCurrentStep(4));
                      window.location.href = url ;

                    } catch (error) {
                      console.log(error.message);

                    }
                  }}>
                    Pay with Credit Card
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
            </li>
          </ul>
        </div>
      </div>
      <NavButtons />
    </form>
  );
}
