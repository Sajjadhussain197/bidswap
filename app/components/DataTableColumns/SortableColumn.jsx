import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

export default function SortableColumn({column,name}) {
   
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {name}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
     
}
