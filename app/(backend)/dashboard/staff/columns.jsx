"use client";
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
    accessorKey: "contactno",
    header:"Contact Number",
  },

 
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) =>  (<DateColumn row={row} accessorKey="createdAt"/>) 
    
  },
  {
    accessorKey: "isActive",
    header:"IsActive",
  },
  {
    id: "actions",
    cell: ({ row }) =>{
      const staff = row.original;
      return(
        <ActionColumn 
        row={row} 
        title="Staff" 
        editEndpoint = {`staff/update/${staff.id}`}
        endpoint={`staff/${staff.id}`} 
        />
      )
      
    }
  },
];
