"use client"
import { BaggageClaim } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice'
import toast from 'react-hot-toast'




export default function Product({product}) {
   console.log("final product", product)
    const dispatch = useDispatch();
    function handleAddToCart(){
        //Dispatch the reducer
        dispatch(addToCart(product));
        toast.success("Item added Successfully");

    }
    // console.log(product, "Product")
  return (
    <div className="rounded-lg mr-3 bg-white dark:bg-slate-900 
    overflow-hidden border shadow" >
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={556}
                  
                  height={556}
                  className="w-full h-48 object-cover"
                />
              </Link>
             {product.serviceType == "BIDDING" ? (
              <div className="px-4 ">
                <Link href={`/products/${product.slug}`} className='flex gap-2 justify-between items-center'>
                  <h2
                    className="text-center text-slate-800 my-2 
                      dark:text-slate-200 font-semibold"
                  >
                    {" "}
                    {product.name}
                  </h2>
                <p>Rs {product.saleprice}</p>
                </Link>
                

                <div
                  className="flex items-center justify-between gap-2
                  pb-3 dark:text-slate-200 text-slate-800"
                ><span>Till: {
                  new Date(product.expiresAt).
                  toLocaleString('en-US', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>


                  <button onClick={()=>handleAddToCart()}
                    className="flex items-center space-x-2 bg-lime-600 px-4
                     py-2 rounded-md text-white "
                  >
                    <BaggageClaim />
                    <span>Bid</span>
                  </button>
                </div>

              </div>

             )
             :(
              <div className="px-4">
                <Link href={`/products/${product.slug}`}>
                  <h2
                    className="text-center text-slate-800 my-2 
                      dark:text-slate-200 font-semibold"
                  >
                    {" "}
                    {product.name}
                  </h2>
                </Link>
                <div
                  className="flex items-center justify-between gap-2
                  pb-3 dark:text-slate-200 text-slate-800"
                >
                  <p>Rs {product.saleprice}</p>
                  <button onClick={()=>handleAddToCart()}
                    className="flex items-center space-x-2 bg-lime-600 px-4
                     py-2 rounded-md text-white "
                  >
                    <BaggageClaim />
                    <span>Add</span>
                  </button>
                </div>

              </div>
             )}
              
            </div>
         
  )
}
