"use client"
import BreadCrumb from "../../components/frontend/BreadCrumb";
import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/app/components/frontend/CartProduct";
import CartItem from "@/app/components/frontend/CartItem";
import CartSubTotalCard from "@/app/components/frontend/CartSubTotalCard";
import EmptyCart from "@/app/components/frontend/EmptyCart";

export default function Cart() {

  const cartItems = useSelector((store)=>store.cart);
  console.log(cartItems);
  const subTotal =cartItems.reduce((acc,currentItem)=>{
   return acc + (currentItem.saleprice * currentItem.qty)
  },0) ?? 0 ;
  console.log(subTotal);
  return (
    <div>
      <BreadCrumb />
       {cartItems.length>0?(
         <div className=" grid grid-cols-12 gap-6 md:gap-14">
          <CartItem cartItems={cartItems}/>
          <CartSubTotalCard subTotal={subTotal}/>
       </div>):(
        <EmptyCart/>
       )}
    </div>
  );
}
