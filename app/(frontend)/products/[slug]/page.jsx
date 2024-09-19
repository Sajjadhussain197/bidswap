
import CategoryCarousel from '@/app/components/frontend/CategoryCarousel'
import { BaggageClaim, Minus, Plus, Send, Share2, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import { Label, Select } from "flowbite-react";
import BreadCrumb from '@/app/components/frontend/BreadCrumb';
import { getData } from '@/lib/getData';

export default async function ProductDetailPage({params:{slug}}) {
   const product = await getData(`products/product/${slug}`)
  return (
    <div>
        <BreadCrumb/>
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
                <Image 
                src={product.image} 
                alt={product.name}
                width={556}
                 height={556} 
                 className='w-full'/>
            </div>
            <div className="col-span-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className='text-xl lg:text-3xl font-semibold'>
                    {product.name}
                  </h2>
                  <button>
                    <Share2/>
                  </button>

                </div>
                <div className="border-b border-gray-500">
                    <p className='py-2 '>{product.description}</p>
                    <div className="flex items-center gap-8  mb-4">
                      <p>{product.sku}</p>
                      <p className='bg-lime-200 py-1.5 px-4 rounded-full 
                       text-slate-900'><b>Stock:</b>{product.qty}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 justify-between pt-4
                 border-b border-gray-500 pb-4">
                    <div className="flex  items-center gap-4">
                        <h4 className='text-2xl'>${product.saleprice}</h4>
                        <del className='text-slate-500 text-sm'>${product.saleprice}</del>
                    </div>
                    <p className='flex items-center '>
                        <Tag className='w-5 h-5 text-slate-400 me-2'/>
                        <span>Save 50% right now</span>
                    </p>
                </div>
                <div className="flex justify-between items-center py-6">
                    <div className="rounded-xl 
                    border border-gray-400 flex items-center gap-3">
                        <button className='border-r border-gray-400 py-2 px-4'>
                            <Minus/>
                        </button>
                        <p className='flex-grow py-2 px-4'> 1</p>
                        <button className='border-l border-gray-400 py-2 px-4'>
                            <Plus/>
                        </button>

                    </div>
                    <button className='flex items-center space-x-2 bg-lime-600 px-4
                     py-2 rounded-md text-white'>
                        <BaggageClaim/>
                        <span>Add to Cart</span>

                    </button>
                
                </div>
            </div>
            
            <div className=" col-span-3 sm:block bg-white border border-gray-300 rounded-lg
              dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden">
             <h2 className="bg-slate-100 py-3 px-6 font-semibold border-b  border-gray-300
              dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-gray-600  ">
               DELIVERY & RETURNS
             </h2>
             <div className="p-4">
             <div className="flex rounded-lg py-2 px-4
               bg-orange-400 text-slate-50 items-center gap-3">
                <span>BidSwap360 Express</span>
                <Send/>
             </div>
             <div className='py-3 text-slate-100 border-b border-gray-500'>
              Eligible for Free Delivery.
              <Link href="/">View Details</Link>
             </div>
             <h2 className='text-slate-200 py-2'>Choose your Location</h2>
          <div className="border-b border-gray-500 pb-3">
            <div className="max-w-md ">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="" />
              </div>
              <Select id="countries" required>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>
          </div>
          <div className="border-b border-gray-500 pb-3">
            <div className="max-w-md ">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="" />
              </div>
              <Select id="countries" required>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>
          </div>
          <div className="pb-3">
            <div className="max-w-md ">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="" />
              </div>
              <Select id="countries" required>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>
          </div>
            

          </div>

        </div>
        </div>

        <div className="bg-white dark:bg-slate-700 my-8 rounded p-4">
            <h2 className='mb-4 text-xl font-semibold text-slate-400 ml-3'>Similar Products</h2>
            <CategoryCarousel/>
          {/* <CategoryCarousel products={category.products}/> */}
        </div>
      
    </div>
  )
}
