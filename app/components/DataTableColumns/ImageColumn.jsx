import Image from 'next/image';
import React from 'react'

export default function ImageColumn({row, accessorKey}) {
    const image = row.getValue(`${accessorKey}`);

         return (
           <div className="shrink-0">
              <Image
             src={image}
             width={500}
             height={500}
             alt="image"
             className="w-10 h-10 rounded-full object-cover"
           />
           </div>
         );
}
