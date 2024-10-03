import BidListings from '@/app/components/backend/BidListings';
import OrderCard from '@/app/components/order/OrderCard'
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData'
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Bids() {
  
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session?.user?.id;
  const Role = session?.user?.role;

  let bids;
  let userOrders;
  if(Role == "SELLER"){

    console.log("role and id ", Role, userId)
     bids = await getData(`bids/${userId}`);
    //  console.log(bids, "bids data")
  }
 
  return (
    <>
            <BidListings bid={bids}/>
    </>
  );
}
