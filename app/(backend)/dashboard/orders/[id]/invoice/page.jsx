// import SalesInvoice from "@/components/Order/SalesInvoice";
import SalesInvoice from "@/app/components/order/salesInvoice";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({params:{id}}) {
    const order =await  getData(`orders/${id}`);
   // console.log(order);
      <SalesInvoice  order ={order}/>
}