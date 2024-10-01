// import SalesInvoice from "@/components/Order/SalesInvoice";
"use client"
import SalesInvoice from "@/app/components/order/salesInvoice";
import { getData } from "@/lib/getData";
import React from "react";
export default async function page({params}) {
    const id = params.id;

    const order =await  getData(`orders/${id}`);
   console.log(order);
    //   <SalesInvoice  order ={order}/>
    return(
        <div>hello from order details
        {
            id
        }
        
       <SalesInvoice  order ={order}/>
        </div>
    )
}