import Link from 'next/link'
import React from 'react'
import CategoryCarousel from './CategoryCarousel'

export default function CategoryList({category}) {
  // console.log(category, "category to find servicetype")
  let updatedProducts;
  if( category.serviceType){
    if(category.expiresAt){
      
    updatedProducts = category.products.map(product => ({
      ...product, // Spread existing product properties
      expiresAt: category.expiresAt, // Add the expiresAt field from category
      serviceType: category.serviceType, // Add the expiresAt field from category
      saleprice: category.salePrice, // Add the expiresAt field from category
    }));
    }else{
      updatedProducts = category.products.map(product => ({
        ...product, // Spread existing product properties
        // expiresAt: category.expiresAt, // Add the expiresAt field from category
        serviceType: category.serviceType, // Add the expiresAt field from category
        saleprice: category.salePrice, // Add the expiresAt field from category
      }));

    }
  } 
  console.log(updatedProducts,"updated category data")
  return (
    <div className='bg-white border border-gray-300 rounded-lg
    dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden'>
         <div className="bg-slate-100 py-3 px-6 font-semibold border-b  border-gray-300
         dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-gray-600 
         flex justify-between items-center ">
        < h2>  {category.name} </h2>
        <Link href="/" className='bg-lime-600 text-slate-50
         rounded-md px-4 py-2 hover:bg-lime-700 duration:300 transition-all'>See All
         </Link>
         
        </div>
        <div className="bg-white  dark:bg-slate-700 p-4">
      {updatedProducts ?(
          <CategoryCarousel products={updatedProducts} /> 

      ):
      (

          <CategoryCarousel products={category.products} /> 
      )

      }
        </div>

      
    </div>
  )
}
