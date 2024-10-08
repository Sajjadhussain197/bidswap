
import MarketPart from "@/app/components/backend/MarketPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default async function Markets() {
  const markets = await getData("markets");
  return (
    <>
    <MarketPart heading='Markets' href='/dashboard/markets' linktitle='Add Market'/>
    <div className="py-8">
        <DataTable data={markets} columns={columns} />
    </div>
  
    </>
  );
}
