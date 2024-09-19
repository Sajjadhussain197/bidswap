import React from 'react'
import WeeklySalesChart from './WeeklySalesChart'
import BestSellingProducts from './BestSellingProducts'

export default function DashBoardCharts() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <WeeklySalesChart/>
      <BestSellingProducts/>
    </div>
  )
}
