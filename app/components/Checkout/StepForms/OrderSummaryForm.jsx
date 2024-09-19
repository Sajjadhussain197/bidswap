"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setCurrentStep } from '@/redux/slices/checkoutSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OrderSummaryForm() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // Correctly call useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();
  const userId = session?.user?.id; // Assuming the userId is available in the session

  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart);
  const checkoutFormData = useSelector((store) => store.checkout.checkoutFormData);
  const subTotal = cartItems.reduce((acc, currentItem) => {
    return acc + (currentItem.saleprice * currentItem.qty);
  }, 0) ?? 0;

  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  async function submitData() {
    const data = {
      orderItems: cartItems.map(item => ({
        id: item.id,
        qty: item.qty,
        saleprice: item.saleprice
      })),
      checkoutFormData,
      userId
    };
    //orderItems =cartItems;
   // console.log("Sending Data:", data); // Verify the data being sent
//console.log(data.orderItems);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response
        setLoading(false);
        toast.success("Order Created Successfully");

        // Redirect to the order confirmation page with the new order's ID
        router.push(`/order-confirmation/${responseData.id}`);
      } else {
        setLoading(false);
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error occurred, please try again.");
    }
  }

  if (!mounted) return null; // Render nothing until the component is mounted

  return (
    <div className="my-6">
      <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>
        Order Summary
      </h2>

      {cartItems.map((cartItem, i) => {
        return (
          <div key={i} className="flex items-center justify-between border-b
           border-slate-400 pb-3 font-semibold text-sm mb-4">
            <div className="flex items-center gap-3">
              <Image
                src={cartItem.image}
                alt={cartItem.name}
                width={231}
                height={231}
                className="w-14 h-14 rounded-xl"
              />
              <div className="flex flex-col ">
                <h2>{cartItem.name}</h2>
              </div>
            </div>

            <div className="rounded-xl border border-gray-400 flex items-center gap-3">
              <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
            </div>

            <div className="flex items-center gap-2">
              <h4>Rs {cartItem.saleprice}</h4>
            </div>
          </div>
        );
      })}

      <div className="mt-4 flex items-center justify-between">
        <button 
          onClick={handlePrevious}
          type="button"
          className='inline-flex items-center px-6 py-3 mt-4 sm:mt-6
          text-sm font-medium text-center text-white  bg-slate-900 rounded-lg focus:ring-4
          focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 
          dark:hover:bg-lime-400'>
          <ChevronLeft className='w-5 h-5 mr-2'/>
          <span>Previous</span>
        </button>
        {
          loading ? (
            <button disabled className='inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center
            text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900
            hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-400'>
              Processing Please wait....
            </button>
          ) : (
            <button onClick={submitData} className='inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center
            text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900
            hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-400'>
              <span>Proceed to Payment</span>
              <ChevronRight className='w-5 h-5 ml-2' />
            </button>
          )
        }
      </div>
    </div>
  );
}
