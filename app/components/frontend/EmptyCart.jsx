import Link from 'next/link'
import React from 'react'

export default function EmptyCart() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <p className='md:text-2xl'>Your Cart is empty {" "}
            <Link href="/" 
            className='dark:text-lime-500 text-slate-800'>
        Start Shopping</Link></p>
      
    </div>
  )
}
