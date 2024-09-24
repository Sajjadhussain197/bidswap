import ProductPart from "@/app/components/backend/ProductPart";
import DataTable from "@/app/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Products() {
  const session = await getServerSession(authOptions);

  // Return null if no session
  if (!session) {
    return null;
  }

  const role = session.user?.role;
  const id = session.user?.id;
  console.log(id, "id of current user");
  console.log(role, "hey i am ");

  const allProducts = await getData("products");
  console.log(allProducts, "all products");

  // Filter products by seller (if not Admin)
  const sellerProducts = allProducts.filter((product) => product.userId=== id);
  console.log(sellerProducts, "seller products");

  return (
    <>
      <ProductPart 
        heading="Products" 
        href="/dashboard/products" 
        linktitle="Add Product" 
      />
      <div className="py-8">
        {role === "ADMIN" ? (
          <DataTable data={allProducts} columns={columns} />
        ) : (
          <DataTable data={sellerProducts} columns={columns} />
        )}
      </div>
    </>
  );
}
