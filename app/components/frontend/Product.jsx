"use client"
import { BaggageClaim, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice'
import toast from 'react-hot-toast'

export default function Product({ product }) {
  console.log(product,"end product details")
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const currentDate = new Date();

  function handleAddToCart() {
    dispatch(addToCart(product));
    toast.success("Item added Successfully");
  }

  const handleBid = async () => {
    if (!bidAmount || bidAmount <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }

    try {
      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          amount: parseFloat(bidAmount),
        }),
      });

      if (response.ok) {
        setSuccess('Bid placed successfully!');
        setError('');
        setBidAmount(''); // Clear input after success
      } else {
        const errorData = await response.json();
        setError(`Error placing bid: ${errorData.message}`);
      }
    } catch (err) {
      setError('An error occurred while placing the bid.');
    }
  }
  const handleContact = ()=>{
    const contact = '+923328764561'; // Replace with the full phone number in international format
    // const contact = '+923349582197'; // Replace with the full phone number in international format
    window.open(`https://wa.me/${contact}`, '_blank');
  }

  return (
    <div className="rounded-lg mr-3 bg-white dark:bg-slate-900 
    overflow-hidden border shadow" >
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={556}
          height={556}
          className="w-full h-48 object-cover"
        />
      </Link>

      {product.serviceType === "BIDDING" ? 
      (<div className="px-4">
            <Link href={`/products/${product.id}`} className='flex gap-2 justify-between items-center'>
              <h2 className="text-center text-slate-800 my-2 dark:text-slate-200 font-semibold whitespace-nowrap">
              {product.name}
            </h2>
            <p className='whitespace-nowrap'>Rs {product.saleprice}</p>
          </Link>

          <div className='flex justify-between items-center py-2'>
            <p>
              Till: <span className='text-red-500 font-bold'>{new Date(product.expiresAt).toLocaleString('en-US', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
            </p>
            {/* <p>
              Remaining: {new Date(product.expiresAt - new Date().getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p> */}
          </div>

          <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200 text-slate-800">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="max-w-[55%] py-2 border rounded-sm"
              placeholder="Enter bid amount"
            />
            <button onClick={handleBid} className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md text-white">
              <BaggageClaim />
              <span>Bid</span>
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      ) :
      (
        <> {product.serviceType === "BARTING" ? 
          (
        <div className="px-4 flex flex-col gap-2">
          <Link href={`/products/${product.id}`}>
            <h2 className="text-center text-slate-800 my-2 dark:text-slate-200 font-semibold">
              {product.name}
            </h2>
            <p>Exchange: <span className='text-red-500 font-bold'>{product.productExchange}</span></p>
          </Link>

          <div className=" pb-3 dark:text-slate-200 text-slate-800">
            
            <button 
            onClick={handleContact} 
            className="flex items-center justify-between w-full space-x-2 bg-lime-600 px-4 py-2 rounded-md text-white">
            <Phone />
              <span>Contact sellar</span>
            </button>
          </div>
        </div>
      )

        :
          (
        <div className="px-4">
          <Link href={`/products/${product.id}`}>
            <h2 className="text-center text-slate-800 my-2 dark:text-slate-200 font-semibold">
              {product.name}
            </h2>
          </Link>

          <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200 text-slate-800">
            <p>Rs {product.saleprice}</p>
            <button onClick={handleAddToCart} className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md text-white">
              <BaggageClaim />
              <span>Add</span>
            </button>
          </div>
        </div>
      )}
      
          
        </>
      )
      }
    </div>
  )
}
