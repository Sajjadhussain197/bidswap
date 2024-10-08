"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import DateColumn from "@/app/components/DataTableColumns/DateColumn";
import SortableColumn from "@/app/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/app/components/DataTableColumns/ActionColumn";


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
    accessorKey: "code",
    header: "Coupon Code",
  },
  {
    accessorKey: "date",
    header: "Expiry Date",
    cell: ({ row }) =>  (<DateColumn row={row} accessorKey="date"/>) 
  },
  // {
  //   accessorKey: "isActive",
  //   header: "Active",
  // },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) =>  (<DateColumn row={row} accessorKey="createdAt"/>) 
    
  },
  {
    id: "actions",
    cell: ({ row }) =>{
      const coupon = row.original;
      return(
        <ActionColumn 
        row={row} 
        title="Coupon" 
        editEndpoint = {`coupons/update/${coupon.id}`}
        endpoint={`coupons/${coupon.id}`} 
        />
      )
      
    }
  },
];
