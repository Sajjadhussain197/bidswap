import React from 'react'
import CartProduct from './CartProduct'
import { TextInput } from 'flowbite-react'
import EmptyCart from './EmptyCart'


export default function CartItem({cartItems}) {
  return (
    <>
    <div className="md:col-span-8 col-span-full">
    {cartItems.length > 0 && (
      <>
        <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
        <div
          className="flex  items-center justify-between
          border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4"
        >
          <h2 className="uppercase">Poduct</h2>
          <h2 className="uppercase">Quantity</h2>
          <h2 className="uppercase">Price</h2>
        </div>
        </>
    )}
  
    <div className="">
     {/* <CartProduct/> */}
     {cartItems.length > 0 ?(
       cartItems.map((item, i) => {
        return <CartProduct cartItem={item} key={i} />
      })
    ):(
      <EmptyCart/>
    )
     }
    </div>
     {/* COUPON FORM */}
     <div className="flex items-center gap-2 py-8">
     <TextInput
        className="w-1/2"
        id="email3"
        type="email"
        placeholder="Enter coupon code"
        required
        
         />
      <button className="py-2.5 px-4 rounded-lg bg-lime-600 shrink-0">Apply Coupon</button>

     </div>

  </div>
    </>
  )
}
