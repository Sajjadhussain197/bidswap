
import AttributePart from "@/app/components/backend/AttributePart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default async function Attributes() {
  const attributes = await getData("attributes")
  return (
    <>
    <AttributePart heading='Attributes' href='/dashboard/attributes' linktitle='Add Attribute'/>
    <div className="py-8">
        <DataTable data={attributes} columns={columns} />
    </div>
    </>
  );
}
