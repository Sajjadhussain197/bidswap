
import CommunityPart from "@/app/components/backend/CommunityPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default async function Community() {
  const community = await getData("trainings")
  return (
    <>
    <CommunityPart heading='Community' href='/dashboard/community' linktitle='Add Community Trainings'/>
    <div className="py-8">
        <DataTable data={community} columns={columns} />
    </div>
    </>
  );
}
