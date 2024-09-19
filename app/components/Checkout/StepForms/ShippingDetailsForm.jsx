"use client"
import React, { useState } from 'react';
import TextInput from '../../formInputs/TextInput';
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { Truck, Circle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, updatecheckoutFormData } from '@/redux/slices/checkoutSlice';

export default function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const exitingformData = useSelector((store) => store.checkout.checkoutFormData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...exitingformData,
    },
  });

  const initialShippingCost = exitingformData.ShippingCost || "";
  const [ShippingCost, setShippingCost] = useState(initialShippingCost);

  console.log('Shipping Cost:', ShippingCost);

  async function processData(data) {
    data.ShippingCost = ShippingCost;
    console.log('Form Data:', data);
    dispatch(updatecheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>Shipping Details</h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="StreetAddress"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="City"
          name="City"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Country"
          name="Country"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="District"
          name="District"
          register={register}
          errors={errors}
          className='w-full'
        />
        <div className="col-span-full">
          <h3 className="mb-7 text-lg font-medium text-gray-900 dark:text-lime-400">
            Shipping Cost?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="8"
                className="hidden peer"
                onChange={(e) => setShippingCost(e.target.value)}
                required
              />
              <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div>
                    <p>UPS</p>
                    <p>Delivery Cost: $8</p>
                  </div>
                  <Circle className="w-5 h-5 ms-3" />
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="20"
                className="hidden peer"
                onChange={(e) => setShippingCost(e.target.value)}
                required
              />
              <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div>
                    <p>UPS</p>
                    <p>Delivery Cost: $20</p>
                  </div>
                  <Circle className="w-5 h-5 ms-3" />
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <NavButtons />
    </form>
  );
}
