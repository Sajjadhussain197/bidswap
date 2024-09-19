import Link from 'next/link'
import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import TrainingCarousel from './TrainingCarousel'
import { getData } from '@/lib/getData'

export default async function CommunityTrainings() {
  const trainings = await getData("trainings");
  return (
    <div className='bg-white border border-gray-300 rounded-lg
    dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden'>
         <div className="bg-slate-100 py-3 px-6 font-semibold border-b  border-gray-300
         dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-gray-600 
         flex justify-between items-center ">
        < h2>  BidSwap360 Community </h2>
        <Link href="/" className='bg-lime-600 text-slate-50
         rounded-md px-4 py-2 hover:bg-lime-700 duration:300 transition-all'>See All
         </Link>
         
        </div>
        <div className="bg-white p-4 dark:bg-slate-700">
          <TrainingCarousel trainings={trainings} />
         </div>

      
    </div>
  )
}
