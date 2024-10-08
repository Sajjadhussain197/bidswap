"use client";

import { getData } from "@/lib/getData";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchOrder() {
      if (id) {
        try {
          const fetchedOrder = await getData(`orders/${id}`);
          if (fetchedOrder) {
            setOrder(fetchedOrder);
            console.log(fetchedOrder, "data from fetchorder using orders/id");
            
              const items = Array.isArray(fetchedOrder.orderItems) ? fetchedOrder.orderItems : [];
              setOrderItems(items);
              
              const subtotal = items
                .reduce((acc, item) => acc + item.price * item.quantity, 0);
              setSubTotal(subtotal.toFixed(2));
              const totalprice = (subtotal + fetchedOrder.shippingCost).toFixed(2);
              console.log(totalprice);
              setTotal(totalprice)

            
          } else {
            console.error("No order data received");
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
        
      }
    }

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 dark:bg-slate-950 bg-slate-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl mx-auto">
          <div className="relative mt-6 overflow-hidden bg-white dark:bg-slate-700 rounded-lg shadow md:mt-10">
            {/* <div className="absolute top-4 right-4">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200"
              >
                View invoice
              </button>
            </div> */}
            <div className="absolute top-4 right-4">
  <Link
    href={`/dashboard/orders/${id}/invoice`}
    className="inline-flex items-center  justify-center px-4 py-3 text-xs font-bold text-gray-900 transition-all duration-200
     border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200"
  >
    View invoice
  </Link>
</div>

            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="-my-8 divide-y divide-gray-200">
                <div className="pt-16 pb-8 text-center sm:py-8">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-lime-500" />

                  <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-lime-50">
                    We received your order!
                  </h1>
                  <p className="mt-2 text-sm font-normal text-gray-600 dark:text-slate-300">
                    Your order #{id} is completed and ready to ship
                  </p>
                </div>

                <div className="py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-20">
                    <div>
                      <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                        Shipping Address
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {order.streetAddress} {order.city}, {order.district}, {order.country}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                        Payment Info
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-8">
                  <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                    Order Items
                  </h2>

                  <div className="flow-root mt-8">
                    <ul className="divide-y divide-gray-200 -my-7">
                      {orderItems.length > 0 &&
                        orderItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start justify-between space-x-5 py-7 md:items-stretch"
                          >
                            <div className="flex items-stretch">
                              <div className="flex-shrink-0">
                                <img
                                  // width={200}
                                  // height={200}
                                  className="object-cover w-20 h-20 rounded-lg"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>

                              <div className="flex flex-col justify-between ml-5 w-44">
                                <p className="flex-1 text-sm font-bold text-gray-900 dark:text-gray-300">
                                  {item.name}
                                </p>
                              </div>
                            </div>

                            <div className="ml-auto">
                              <p className="text-sm font-bold text-right text-gray-900 dark:text-gray-300">
                                ${item.price}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="py-8">
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Sub total
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${subTotal}
                      </p>
                    </li>
                    <li className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Shipping Cost
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${order.shippingCost}
                      </p>
                    </li>

                    <li className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        Total
                      </p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        ${total}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
