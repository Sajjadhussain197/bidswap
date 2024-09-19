'use client'
import React, { useState } from 'react';

const DataTable = () => {
  
  const data = [
    {
      id: 1,
      name: 'Apple MacBook Pro 17"',
      color: 'Silver',
      category: 'Laptop',
      price: '$2999',
    },
    {
      id: 2,
      name: 'Microsoft Surface Pro',
      color: 'White',
      category: 'Laptop PC',
      price: '$1999',
    },
    {
      id: 3,
      name: 'Magic Mouse 2',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      id: 4,
      name: 'Apple Watch',
      color: 'Black',
      category: 'Watches',
      price: '$199',
    },
    {
      id: 5,
      name: 'Apple iMac',
      color: 'Silver',
      category: 'PC',
      price: '$2999',
    },
    {
      id: 6,
      name: 'Apple AirPods',
      color: 'White',
      category: 'Accessories',
      price: '$399',
    },
    {
      id: 7,
      name: 'iPad Pro',
      color: 'Gold',
      category: 'Tablet',
      price: '$699',
    },
    {
      id: 8,
      name: 'Magic Keyboard',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      id: 9,
      name: 'Smart Folio iPad Air',
      color: 'Blue',
      category: 'Accessories',
      price: '$79',
    },
    {
      id: 10,
      name: 'AirTag',
      color: 'Silver',
      category: 'Accessories',
      price: '$29',
    },
    {
      id: 11,
      name: 'Apple MacBook Pro 17"',
      color: 'Silver',
      category: 'Laptop',
      price: '$2999',
    },
    {
      id: 12,
      name: 'Microsoft Surface Pro',
      color: 'White',
      category: 'Laptop PC',
      price: '$1999',
    },
    {
      id: 13,
      name: 'Magic Mouse 2',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      id: 14,
      name: 'Apple Watch',
      color: 'Black',
      category: 'Watches',
      price: '$199',
    },
    {
      id: 15,
      name: 'Apple iMac',
      color: 'Silver',
      category: 'PC',
      price: '$2999',
    },
    {
      id: 16,
      name: 'Apple AirPods',
      color: 'White',
      category: 'Accessories',
      price: '$399',
    },
    {
      id: 17,
      name: 'iPad Pro',
      color: 'Gold',
      category: 'Tablet',
      price: '$699',
    },
    {
      id: 18,
      name: 'Magic Keyboard',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      id: 19,
      name: 'Smart Folio iPad Air',
      color: 'Blue',
      category: 'Accessories',
      price: '$79',
    },
    {
      id: 20,
      name: 'AirTag',
      color: 'Silver',
      category: 'Accessories',
      price: '$29',
    },
    
  ];
  const arr = [1,2,3,4,5];
  const PAGE=5;
  const [current,setCurrent] = useState(1);
  
  const startIndex = (current-1)*PAGE;
  const endIndex = startIndex + PAGE;
  const currently = data.slice(startIndex,endIndex);
  const numberOfPages = Math.ceil(data.length/ PAGE);
  const total = data.length;

  function handlePageChange(page)  {
    console.log(page)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm  text-left rtl:text-right text-gray-50 dark:text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-gray-200 bg-opacity-30 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-1   ">
              Id
            </th>
            <th scope="col" className="lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-1 ">
              Product name
            </th>
            <th scope="col" className="lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-1 ">
              Color
            </th>
            <th scope="col" className="lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-1 ">
              Category
            </th>
            <th scope="col" className="lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-1 ">
              Price
            </th>
            <th scope="col" className="lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-1 ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currently.map((item) => (
            <tr
              key={item.id}
              className="bg-white bg-opacity-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:text-gray-400 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4 sm:p-3 sm:w-3">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${item.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`checkbox-table-search-${item.id}`} className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="lg:px-6 lg:py-4 md:px-4 md:py-2 sm:px-2 sm:py-1  font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.id}
              </th>
              <th
                scope="row"
                className="lg:px-6 lg:py-4 md:px-4 md:py-2 sm:px-2 sm:py-1  font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>

              <td className="lg:px-6 lg:py-4 md:px-4 md:py-2 sm:px-3 sm:py-2 ">{item.color}</td>
              <td className="lg:px-6 lg:py-4 md:px-4 md:py-2 sm:px-3 sm:py-2 ">{item.category}</td>
              <td className="lg:px-6 lg:py-4 md:px-4 md:py-2 sm:px-3 sm:py-2 ">{item.price}</td>
              <td className="lg:px-6 lg:py-4 md:px-4 md:py-2 sm:px-3 sm:py-2 ">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-50 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-90 dark:text-white">{startIndex+1}-{endIndex}</span> of{' '}
          <span className="font-semibold text-gray-90 dark:text-white">{total}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button onClick={(() => setCurrent(current-1))}  disabled={current == 1}
             
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          
          <li>
            <button onClick={(() => setCurrent(current+1))} disabled={current == numberOfPages}
             
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;
