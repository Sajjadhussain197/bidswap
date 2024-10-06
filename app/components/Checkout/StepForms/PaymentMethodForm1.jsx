"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import NavButtons from './NavButtons';
import { Circle, CreditCard, HeartHandshake } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, updatecheckoutFormData } from '@/redux/slices/checkoutSlice';
import Jazzcash from 'jazzcash-checkout';
import JazzCashPaymentForm from '../payment/jazzCashPaymentForm';
const stripePromise = loadStripe("pk_test_51PSFuDHHaGHgPzUC3lmTE46I1T3GeXbf3uwVdiUblvr5NYbdx2mZXQgGogwjA8w5QTFQ3KjJrIF1Ho3Dwb2ayOIF006aBSIELT");
 

function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const exitingformData = useSelector((store) => store.checkout.checkoutFormData);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { ...exitingformData },
  });

  const initialPaymentMethod = exitingformData?.PaymentMethod || "";
  const [PaymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (exitingformData.totalPrice > 0) {
          try {
              const response = await axios.post('/api/payment', {
                  amount: exitingformData.totalPrice * 100, // amount in cents
              });
              console.log('Payment Intent Response:', response.data); // Log response
              setClientSecret(response.data.clientSecret);
          } catch (error) {
              console.error('Error creating PaymentIntent:', error);
          }
      }
  };
  createPaymentIntent();
  }, [exitingformData.totalPrice]);

  const stripe = useStripe();
  const elements = useElements();

  const processData = (data) => {
    data.PaymentMethod = PaymentMethod;
    dispatch(updatecheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  const payWithCreditCard = async () => {
    
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log(cardElement)
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment error:', error.message);
      setPaymentStatus('Card Payment Failed');
    } else {
      console.log('Payment successful:', paymentIntent);
      setPaymentStatus('Card Payment succeeded');
    }
  };
  const JazzcashPaymentMethod =()=>{
    return(
      <>
        
    <JazzCashPaymentForm/>
    
      </>
    )
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
          <li 
          >
              <input
                type="radio"
                id="jazzcash"
                name="payment"
                value="Cash on Delivery"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
              onClick={JazzcashPaymentMethod}
                htmlFor="jazzcash"
                className="inline-flex items-center justify-between w-full p-5
                text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer
                dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
                peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:bg-gray-800"
              >
                <div className="flex gap-2 items-center">
                  <HeartHandshake className="w-8 h-8 ms-3 flex-shrink-0" />
                  <p>Jazz Cash</p>
                </div>
                <Circle className="w-5 h-5 ms-3" />
              </label>
           </li>
            <li>
              <input
                type="radio"
                id="cod"
                name="payment"
                value="Cash on Delivery"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="cod"
                className="inline-flex items-center justify-between w-full p-5
                text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer
                dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
                peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:bg-gray-800"
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
                id="credit-card"
                name="payment"
                value="Credit Card"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="credit-card"
                className="inline-flex items-center justify-between w-full p-5
                text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer
                dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
                peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:bg-gray-800"
              >
                <div className="flex gap-2 items-center ">
                  <CreditCard className="w-8 h-8 ms-3 flex-shrink-0 text-green-400" />
                  <p>Pay with Credit Card</p>
                </div>
                <Circle className="w-5 h-5 ms-3" />

              </label>
              <CardElement className='py-3 border mt-2 rounded-md w-full'/>
              <div className="mt-5 flex flex-col gap-2 items-end">
          
                  <button type="button" onClick={payWithCreditCard} className="bg-green-500 h-12 px-5 rounded-md  w-25">
                    Pay Now
                  </button>
              </div>
                  {paymentStatus && <p>{paymentStatus}</p>}
            </li>
          </ul>
        
        </div>
      </div>
      <NavButtons />
    </form>
  );
}

export default function StripeCheckoutWrapper() {
  
  //  console.log(stripePromise,"here is promise ")
  return (
    <Elements stripe={stripePromise}>
      <ShippingDetailsForm />
    </Elements>
  );
}

