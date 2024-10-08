import React from 'react'
import LargeCard from './LargeCard'

export default function LargeCards({
    data
}) {
    const orderStats = [
        {
        period : 'Todays Orders',
        sales: 180000,
        color: 'bg-green-600',
    },
    {
        period : 'Yesterday Orders',
        sales: 160000,
        color: 'bg-blue-600',
    },
    {
        period : 'This Month',
        sales: 240000,
        color: 'bg-orange-600',
    },
    {
        period : 'All-time Sales',
        sales: 1010000,
        color: 'bg-purple-600',
    },
];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-3 py-6'>
    {
        data.map((item,i) => (
            <LargeCard key={i} data={item}/>
        ))
    }
      {/* Large Card */}
    </div>
  )
}
