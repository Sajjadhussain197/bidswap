
import CouponPart from "@/app/components/backend/couponPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { authOptions } from 'next-auth/react';

import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
export default async function Customers() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const id = session?.user?.id;
  const customer = await getData ("customers");
  // let customer;
  // if(role == 'ADMIN'){

  //     customer = await getData ("customers");
  // }
  // if(role == "SELLER"){
    
  //     customer = await getData(`order/customer/${id}`);
  // }  

  return (
    <>
      {/* <CouponPart heading='Sales' href='/dashboard/coupons' linktitle='Add Coupon'/> */}
      <div className="py-8">
      <DataTable data={customer} columns={columns} />
       
      </div>
    </>
  );
}
   