"use client";
import { Checkbox } from "@/components/ui/checkbox"
import DateColumn from "@/app/components/DataTableColumns/DateColumn";
import ActionColumn from "@/app/components/DataTableColumns/ActionColumn";
import SortableColumn from "@/app/components/DataTableColumns/SortableColumn";
import ImageColumn from "@/app/components/DataTableColumns/ImageColumn";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

 
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} name="Name"/>
  },
 {
    accessorKey: "role",
    header: "Role",
   
  },
 
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorKey="createdAt"/>)  
  },
  {
    id: "actions",
    cell: ({ row }) =>{
        const sellers = row.original;
        return(
          <ActionColumn 
          row={row} 
          title="Seller" 
          editEndpoint = {`sellers/update/${sellers.id}`}
          endpoint={`sellers/${sellers.id}`} 
          />
        )
        
      }
  },
];
