import OrderCard from '@/app/components/order/OrderCard'
import OrderRefundForm from '@/app/components/RefundForm';
import SellerRefundManagement from '@/app/components/RefundManager';
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData'
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'

export default async function Order() {
  
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session?.user?.id;
  const Role = session?.user?.role;
  let orders;
  let userOrders;
  if(Role == "SELLER"){
    console.log("role and id ", Role, userId)
     orders = await getData(`refund//${userId}`);
     console.log(orders, "order manager data")
  }
//   } else{
//  // Fetch orders data
//   orders = await getData("orders");
//  // console.log(orders)
//  console.log(session);
//  if (!orders || !Array.isArray(orders) || orders.length === 0) {
//    return (
//      <p>No Orders yet</p>
//    );
//  }
//   userOrders = orders.filter((order) => order.userId === userId);
 
// //  console.log('Orders:', userOrders);

//   }
 
  return (
    <div>
      <section className="py-2sm:py-16 lg:py-20">
        <div className="sm:px-6 lg:px-8 max-w-7xl">
          
          <SellerRefundManagement order={orders}/>
        </div>
      </section>
    </div>
  );
}
