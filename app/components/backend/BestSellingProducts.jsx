'use client'
import React from 'react'
import ChartComponent from './ChartComponent'


export default function BestSellingProducts() {
  return (
    <div className='rounded-lg lg:p-8 sm:p-2 transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer'>
      <h2 className='text-xl font-bold'>
      Monthly Sales & Expenses
      <ChartComponent/>
      </h2>
    </div>
  )
}
