"use client"
import { makePutRequest } from '@/lib/apiRequest';
import { getData } from '@/lib/getData';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default  function OrderDetails({ params }) {
  const { id } = params;
  const [orderStatus, setOrderStatus] = useState('Pending')
  const [sellerNote, setSellerNote] = useState({})
  const [order, setOrder] = useState([]);

  // const orderData = await getData(`orderitem/${id}`);
  useEffect(() => {
    const fetchOrder = async () => {
        console.log("fetching")
        try {
            const orderData = await getData(`orderitem/${id}`);
            if(orderData){

                setOrder(orderData); 
            }

            // setLoading(false);   
        } catch (err) {
            console.error(err);  // Log any errors
            setError("Failed to load order"); // Set error state
            setLoading(false);   // Stop loading in case of error
        }
    };
    fetchOrder(); // Trigger the fetchOrder function
}, []); // Only call useEffect when 'id' changes




  const handleApprove = async () => {
    console.log(id,"id to approve")
    const  res = await makePutRequest(`/api/orders/${id}`)
    setTimeout(() => {
      toast.success("order is Approved Successfully")
    }, 5000)
    // setOrderStatus('Approved')
    // Add logic to update order status in the backend
  }

  const handleReject = () => {
    setOrderStatus('Rejected')
    // Add logic to update order status in the backend
  }

  return (
    <>
      {order &&
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-teal-800 p-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Order #{order.orderNumber}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              order.orderStatus === 'Approved'
                ? 'bg-green-500'
                : order.orderStatus === 'Rejected'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
            <p>
              Name: {order.firstName} {order.lastName}
            </p>
            <p>Email: {order.emailAddress}</p>
            <p>Phone: {order.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p>{order.streetAddress}</p>
            <p>
              {order.city}, {order.district}, {order.country}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white border-opacity-20">
                <th className="text-left py-2">Product</th>
                <th className="text-right py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">{item.productName}</td>
                  <td className="text-right">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white border-opacity-20 font-semibold">
                <td className="py-2">Total</td>
                <td className="text-right">${(order.salesTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Timeline</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <p>Order placed - {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <p>Payment received - {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <p>Awaiting approval - Current</p>
            </div>
          </div>
        </div>

       

        <div className="flex justify-between items-center">
          <button
            disabled={order.orderStatus === 'DELIVERED'}
            onClick={handleApprove}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-purple-900"
          >
            Approve Order
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-purple-900"
          >
            Reject Order
          </button>
          
        </div>
      </div>
    </div>

      }
    </>
  )
}