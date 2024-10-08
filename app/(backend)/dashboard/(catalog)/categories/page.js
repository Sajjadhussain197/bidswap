
import PageHeader from "@/app/components/backend/pageHeader";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import DataTable from "@/app/components/data-table-components/DataTable";

export default async function Home() {
  const categories = await getData("categories");
  return (
    <>
      <PageHeader heading='Categories' href='/dashboard/categories' linktitle='Add Category'/>
      <div className="py-8">
        <DataTable data={categories} columns={columns}  />
      </div>
    </>
  );
}
