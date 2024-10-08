import { Layers, ShoppingCart } from 'lucide-react';
import React from 'react';

export default function SmallCard({ data }) {

  if (!data) {
    console.error("Data is undefined in SmallCard component.");
    return null;
  }

  const { title, number, iconColour, icon: Icon } = data;
  return (
    <div className="rounded-lg text-white shadow-md p-4 bg-slate-600  cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out ">
      <div className="flex space-x-4">
        <div className={`w-12 h-12 ${iconColour} rounded-full flex items-center justify-center ` }>
          <Icon className="lg:w-6 lg:h-6 transition-transform transform hover:scale-105 duration-300 ease-in-out sm:w-4 sm:h-4" />
        </div>
        <div>
          <p>{title}</p>
          <h3 className="lg:text-2xl font-bold sm:text-1xl">{number}</h3>
        </div>
      </div>
    </div>
  );
}
