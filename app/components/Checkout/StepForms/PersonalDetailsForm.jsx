"use client";
import React from 'react';
import TextInput from '../../formInputs/TextInput';
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, updatecheckoutFormData } from '@/redux/slices/checkoutSlice';
import { useSession } from 'next-auth/react';

export default function PersonalDetailsForm() {
  const { data:session , status}  =useSession()
  const userId =session?.user?.id;
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout?.currentStep);
  const exitingformData = useSelector((store) => store.checkout?.checkoutFormData);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...exitingformData,
    },
  });

  async function processData(data) {
    if (userId){
      data.userId =userId;
      console.log(data); // Debug form data
      dispatch(updatecheckoutFormData(data));
      dispatch(setCurrentStep(currentStep + 1));
    }
  }

  //if (typeof currentStep === 'undefined') {
    //return <div>Loading...</div>; // Or some fallback UI
 // }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>Personal Details</h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="First Name"
          name="FirstName"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Last Name"
          name="LastName"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Email Address"
          name="Email"
          type="Email"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Phone Number"
          name="Phone"
          register={register}
          errors={errors}
          className='w-full'
        />
      </div>
      <NavButtons />
    </form>
  );
}
