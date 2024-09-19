"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox"
import DateColumn from "@/app/components/DataTableColumns/DateColumn";
import SortableColumn from "@/app/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/app/components/DataTableColumns/ActionColumn";
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
    accessorKey: "image",
    header: "Market Image",
    cell: ({ row }) => (<ImageColumn row={row} accessorKey="image"/>)
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description");

      return (
        <div className="line-clamp-1">
          {description}
        </div>
      );
    },
  },
 
  {
    accessorKey: "categories",
    header:"Categories",
  },
 
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) =>  (<DateColumn row={row} accessorKey="createdAt"/>) 
    
  },
  {
    id: "actions",
    cell: ({ row }) =>{
      const market = row.original;
      return(
        <ActionColumn 
        row={row} 
        title="Market" 
        editEndpoint = {`markets/update/${market.id}`}
        endpoint={`markets/${market.id}`} 
        />
      )
      
    }
  },
];
