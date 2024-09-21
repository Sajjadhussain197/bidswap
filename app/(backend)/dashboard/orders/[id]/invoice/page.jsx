import SalesInvoice from "@/app/components/order/salesInvoice";
import { getData } from "@/lib/getData";
import React from "react";

export default async function Page({ params: { id } }) {
  const order = await getData(`orders/${id}`);
  
  return (
    <SalesInvoice order={order} />
  );
}