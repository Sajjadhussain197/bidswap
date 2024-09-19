
import SellerPart from "@/app/components/backend/SellerPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { columns } from "./columns";
import { getData } from "@/lib/getData";

export default async function Sellers() {
  const sellers = await getData("sellers")
  return (
    <>
    <SellerPart heading='Sellers' href='/dashboard/sellers' linktitle='Add Seller'/>
    <div className="py-8">
        <DataTable data={sellers} columns={columns} />
    </div>
     
    </>
  );
}
