import React from 'react'
import MarketsCarousel from './MarketsCarousel'
import { getData } from '@/lib/getData'

export default async function MarketList() {
  const markets = await getData("markets");
  return (
    <div className='text-white py-16'>
      
      <div className="bg-slate-50 rounded-lg p-4 dark:bg-lime-900">
       <h2 className='py-2 text-center text-2xl text-slate-900
       dark:text-slate-50 mb-4'>Shop By Market</h2>
        <MarketsCarousel markets={markets}/>
      </div>
    </div>
  )
}
