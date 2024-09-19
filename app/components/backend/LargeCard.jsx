import { Layers } from 'lucide-react';
import React from 'react';

export default function LargeCard({ data }) {
  return (
    <div
      className={`rounded-lg text-white shadow-md  p-8 flex items-center flex-col cursor-pointer hover:shadow-glow transition-transform transform hover:scale-105 duration-300 ease-in-out ${data.color}`}
    >
      <Layers />
      <h4>{data.period}</h4>
      <h2 className='lg:text-3xl sm:text-2.5xl'>PKR.{data.sales}</h2>
    </div>
  );
}
