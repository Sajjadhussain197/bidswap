"use client"
import generateSlug from '@/lib/generateSlug';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link'; // Import Next.js Link component
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const OrderCard = ({ order }) => {
  const router = useRouter();
  const calculatedAmount = order.sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalCalculateAmount = calculatedAmount + parseFloat(order.shippingCost);
  
  // console.log({ ...order, calculatedAmount }, "from card")
  
  const formattedDate = new Date(order.createdAt).toLocaleDateString();
  // Since orderItems are not part of your order object, we can directly access the other properties
  const shippingCost = order.shippingCost || 0; // Fallback to 0 if undefined
  const totalAmount = (parseFloat(order.totalAmount) || 0) + shippingCost; // Adjust as necessary for total amount calculation
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const handleViewOrderDetails = () => {
    router.push(`/dashboard/orders/${order.id}/invoice`);
    console.log("order details");
  }
  return (
    <div>
      <li className="overflow-hidden bg-white border border-gray-200 rounded-md">
        <div className="lg:flex">
          <div className="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
            <div className="px-4 py-6 sm:p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order number</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">#{order.orderNumber}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{formattedDate}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">${totalCalculateAmount}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Order Status</p>
                  <div className="mt-0.5 flex items-center">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                      <svg
                        className="w-2 h-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{order.orderStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
            <ul className="space-y-7">
              {order.length > 0
                ? order.map((item, i) => {
                    const slug = generateSlug(item.name);
                    return (
                      <li key={i} className="relative flex pb-10 sm:pb-0">
                        <div className="flex-shrink-0">
                          <Image
                            className="object-cover rounded-lg w-28 h-28"
                            src={item.image}
                            alt={item.name}
                            width={112}
                            height={112}
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-1 ml-5">
                          <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
                            <div>
                              <p className="text-base font-bold text-gray-900">{item.name}</p>
                            </div>

                            <div className="mt-4 sm:mt-0 flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-500 me-4">{item.qty}</p>
                              <p className="text-base font-bold text-left text-gray-900 sm:text-right">${item.saleprice}</p>
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 sm:relative">
                            <div className="flex space-x-5">
                              <Link
                                href={`/product/${slug}`}
                                title={item.name}
                                className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                              >
                                View Product
                              </Link>

                              <span className="text-gray-200"> | </span>

                              <a
                                href="#"
                                title=""
                                className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                              >
                                Similar Product
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                : ' '}
            </ul>

            <hr className="mt-8 border-gray-200" />

            <div className="flex items-center mt-8 space-x-5">
              <button
                type="button"
                onClick={handleViewOrderDetails}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
              >
                View Order
              </button>

              <Link
                href={`/dashboard/orders/${order.id}/invoice`}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
              >
                View Invoice
              </Link>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default OrderCard;

