import React from 'react';
import SmallCard from './SmallCard';

export default function SmallCards(
    {
        data
    }
) {
    // const orderStatus = [
    //     {
    //         title: 'Total Orders',
    //         number: 180000,
    //         iconColour: 'bg-green-600',
    //         icon: ShoppingCart
    //     },
    //     {
    //         title: 'Orders Pending',
    //         number: 160000,
    //         iconColour: 'bg-blue-600',
    //         icon: CircleEllipsis 
    //     },
    //     {
    //         title: 'Orders Processing',
    //         number: 240000,
    //         iconColour: 'bg-orange-600',
    //         icon: Package
    //     },
    //     {
    //         title: 'Orders Delivered',
    //         number: 1010000,
    //         iconColour: 'bg-purple-600',
    //         icon: CircleCheck
    //     }
    // ];

    // console.log("orderStatus:", orderStatus);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-3 py-6">
            {data.map((item, i) => (
                <SmallCard key={i} data={item} />
            ))}
        </div>
    );
}
