
import CouponPart from "@/app/components/backend/couponPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Orders() {
  const session = await getServerSession(authOptions);
  const id =session?.user?.id;
  const role =session?.user?.role;
  const allOrders = await getData("orders");
  const  sellerOrders = allOrders.filter((order)=>order.vendorId === id);
  return (
    <>
    {/* <CouponPart heading='Coupons' href='/dashboard/coupons' linktitle='Add Coupon'/> */}
    <div className="py-8">
    {role === "Admin"? (<DataTable data={allOrders} columns={columns} />):
        (<DataTable data={sellerOrders} columns={columns} />)}
      </div>
    
    </>
  );
}
