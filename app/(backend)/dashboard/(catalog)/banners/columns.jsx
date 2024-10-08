"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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
    header: "Banner Image",
    cell: ({ row }) => (<ImageColumn row={row} accessorKey="image"/>)
  },
  {
    accessorKey: "link",
    header: " Banner Link",
  },
  // {
  //   accessorKey: "isActive",
  //   header: "Active",
  // },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorKey="createdAt"/>)  
  },
  {
    id: "actions",
    cell: ({ row }) =>{
        const banner = row.original;
        return(
          <ActionColumn 
          row={row} 
          title="Banner" 
          editEndpoint = {`banners/update/${banner.id}`}
          endpoint={`banners/${banner.id}`} 
          />
        )
        
      }
  },
];
