
import BannerPart from "@/app/components/backend/BannerPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default async function Banners() {
  const banners = await getData("banners");
  return (
    <>
      <BannerPart
        heading="Banners"
        href="/dashboard/banners"
        linktitle="Add Banner"
      />
      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
      
    </>
  );
}
