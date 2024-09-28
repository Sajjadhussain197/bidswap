import OrderCard from '@/app/components/order/OrderCard'
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData'
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Order() {
  // Fetch orders data
  const userOrders = await getData("orders");

  // Log orders to check the data structure
  // console.log('Orders:', orders);

  const session = await getServerSession(authOptions);

  // If no session, return nothing
  if (!session) return;

  const userId = session?.user?.id;
  console.log('User ID:', userId);

  // If orders are empty or not an array, return a message
  if (!userOrders || !Array.isArray(userOrders) || userOrders.length === 0) {
    return (
      <p>No Orders yet</p>
    );
  }

  // Filter orders by the userId
  // const userOrders = orders;
  const filterdOrder = userOrders.filter((order) => order.userId === userId);
  
  console.log('Orders:', filterdOrder);

  return (
    <div>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Your Orders Details</h1>
              <p className="mt-2 text-sm font-normal text-gray-600">
                Check the status of recent and old orders & discover more products
              </p>
            </div>

            {/* Display user orders */}
            <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
              {userOrders.length > 0 ? (
                userOrders.map((order, i) => <OrderCard key={i} order={order} />)
              ) : (
                <p>No orders found for this user.</p>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
