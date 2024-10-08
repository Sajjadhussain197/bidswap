'use client'
import React from 'react'
import LineChart from './LineChart'

export default function WeeklySalesChart() {
  return (
    <div className='lg:p-8 rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer sm:p-2'>
      <h2 className='text-xl font-bold'>
      Weekly Sales Chart
      <LineChart/>
      </h2>
    </div>
  )
}
