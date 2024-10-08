import CouponPart from "@/app/components/backend/couponPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Sales() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const role = session?.user?.role;

  // Fetch sales data
  let allSales = [];
  try {
    allSales = await getData("sale");
  } catch (error) {
    console.error("Failed to fetch sales data", error);
  }

  // Ensure allSales is an array to avoid errors
  allSales = Array.isArray(allSales) ? allSales : [];

  const sellerSales = allSales.filter((sale) => sale.vendorId === id);

  return (
    <>
      {/* <CouponPart heading='Sales' href='/dashboard/coupons' linktitle='Add Coupon'/> */}
      <div className="py-8">
        {role === "Admin" ? (
          <DataTable data={allSales} columns={columns} />
        ) : (
          <DataTable data={sellerSales} columns={columns} />
        )}
      </div>
    </>
  );
}
   