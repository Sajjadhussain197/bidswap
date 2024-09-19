import CouponPart from "@/app/components/backend/couponPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
export default async function Customers() {
  const  customer = await getData ("customers");

  return (
    <>
      {/* <CouponPart heading='Sales' href='/dashboard/coupons' linktitle='Add Coupon'/> */}
      <div className="py-8">
      <DataTable data={customer} columns={columns} />
       
      </div>
    </>
  );
}
   