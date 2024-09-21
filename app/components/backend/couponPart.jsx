"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import Heading from "@/app/components/backend/Heading";
import generateSlug from '../../../lib/generateSlug';
import { UploadButton } from "../../../lib/uploadThing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makePostRequest } from "@/lib/apiRequest";
import { useRouter } from 'next/router';
import Update from "../formInputs/Update";
import { useSession } from "next-auth/react";


export default function CouponPart({ heading, href, linktitle }) {
  const {data:session, status} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { reset, register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  
  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  const vendorId = session?.user?.id;
  // const expiryNormalDate = convertIsoDateToNormal(UpdateData.expiryDate);

  function redirect() {
    router.push('dashboard/coupons');
  }

  async function onSubmit(data) {
    data.vendorId = vendorId;
    const slug = generateSlug(data.name);
    data.slug = slug;
    console.log(data);
    makePostRequest('api/coupons', data, 'coupon', reset, redirect);
  }

  return (
    <div>
     <ToastContainer />
      <div className="border-b border-slate-600">
        <Heading title={heading} />
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none
             focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
          >
            <Plus />
            <span>{linktitle}</span>
          </button>

          {isOpen && (
            <div
              id="crud-modal"
              tabIndex="-1"
              
              className="fixed top-0 right-0 left-0 z-50 shadow justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
            >
              <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add New Coupon
                    </h3>
                    <button
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
  <div className="grid gap-4 mb-4 grid-cols-2">
    <div className="col-span-2">
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Coupon Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        {...register("name", { required: true })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Type Coupon name"
      />
      {errors.name && <p className="text-red-600">Coupon name is required</p>}
    </div>

   

    <div className="col-span-2">
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Coupon Code
      </label>
      <input
        id="code"
        {...register("code", { required: true })}
       
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Coupon Code"
      />
      {errors.description && <p className="text-red-600">Coupon description is required</p>}
    </div>
    <div className="col-span-2">
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Coupon Validity
      </label>
      <input
      type="date"
        {...register("date", { required: true })}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Coupon Code"
      />
      {errors.description && <p className="text-red-600">Coupon description is required</p>}
    </div>

   

    
  </div>
  <button onClick={() =>   toast.success("New Coupon Added")} className="relative shadow inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Add New Coupon
    </span>
  </button>
</form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
