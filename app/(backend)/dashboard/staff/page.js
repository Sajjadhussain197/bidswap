
import StaffPart from '../../../components/backend/StaffPart';
import DataTable from "@/app/components/data-table-components/DataTable";
import { columns } from './columns';
import { getData } from '@/lib/getData';

export default async function Staff() {
  const staff = await getData("staff")
  return (
    <>
    <StaffPart heading='Our Staff' href='/dashboard/staff' linktitle='Add Staff'/>
    <div className="py-8">
        <DataTable data={staff} columns={columns} />
    </div>
    </>
  );
}
