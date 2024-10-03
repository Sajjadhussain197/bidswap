import OrderCard from '@/app/components/order/OrderCard'
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData'
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Order() {
  
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session?.user?.id;
  const Role = session?.user?.role;
  let orders;
  let userOrders;
  if(Role == "SELLER"){
    console.log("role and id ", Role, userId)
     orders = await getData(`orders/seller/${userId}`);
     console.log(orders, "seller orders data")
  } else{
 // Fetch orders data
  orders = await getData("orders");
 // console.log(orders)
 console.log(session);
 if (!orders || !Array.isArray(orders) || orders.length === 0) {
   return (
     <p>No Orders yet</p>
   );
 }
  userOrders = orders.filter((order) => order.userId === userId);
 
//  console.log('Orders:', userOrders);

  }
 
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
            {Role == 'ADMIN' ? (
              <>
                
              {orders.length > 0 ? (
                orders.map((order, i) => <OrderCard key={i} order={order} />)
              ) : (
                <p>No orders found for this user.</p>
              )}
              </>
            ):(
              <>
                {Role == 'SELLER' ? (
                  orders.length > 0 ? (
                    orders.map((order, i) => <OrderCard key={i} order={order} />)
                  ) : (
                    <p>No orders found for this user.</p>
                  )
                ) : (
                  userOrders.length > 0 ? (
                    userOrders.map((order, i) => <OrderCard key={i} order={order} />)
                  ) : (
                    <p>No orders found for this user.</p>
                  )
                )}
              </>
            )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
