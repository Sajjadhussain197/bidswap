
import CouponPart from "@/app/components/backend/couponPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Coupons() {
  const session = await getServerSession(authOptions);
  const id =session?.user?.id;
  const role =session?.user?.role;
  const allCoupons = await getData("coupons");
  const  sellerCoupons = allCoupons.filter((coupon)=>coupon.vendorId === id);
  return (
    <>
    <CouponPart heading='Coupons' href='/dashboard/coupons' linktitle='Add Coupon'/>
    <div className="py-8">
    {role === "Admin"? (<DataTable data={allCoupons} columns={columns} />):
        (<DataTable data={sellerCoupons} columns={columns} />)}
      </div>
    
    </>
  );
}
