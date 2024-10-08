"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SellerRefundManagement({ order }) {
  console.log(order, "heyeee orders");

  // Initialize refundRequests with the fetched orders
  const [refundRequests, setRefundRequests] = useState([]);

  useEffect(() => {
    if (order && order.length > 0) {
      setRefundRequests(order); // Set refund requests when data is available
    }
  }, [order]); // Dependency array ensures this runs when orders change

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApprove = async (id) => {
    console.log(id);
  
    try {
      const response = await axios.put(`/api/refund/${id}`, {
        action: 'APPROVE', // Set action to approve
      });
  
      console.log('Refund approved:', response.data);
      // Optionally, update local state to reflect the approved status
      setRefundRequests(requests =>
        requests.map(request =>
          request.id === id ? { ...request, status: 'APPROVED' } : request
        )
      );
    } catch (error) {
      console.error('Error approving refund:', error);
    }
  };

  const handleReject = (id) => {

    // setRefundRequests(requests =>
    //   requests.map(request =>
    //     request.id === id ? { ...request, status: 'rejected' } : request
    //   )
    // );
    // setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-teal-800 p-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Refund Request Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Refund Requests List */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Pending Refund Requests</h2>
          <div className="space-y-4">
            {refundRequests.filter(request => request.status === 'REQUESTED').map(request => (
              <div
                key={request.id}
                className="bg-white bg-opacity-20 p-4 rounded-md cursor-pointer hover:bg-opacity-30 transition-colors duration-200"
                onClick={() => setSelectedRequest(request)}
              >
                <h3 className="font-semibold">{request.userId}</h3>
                <p>Order: {request.order.orderNumber}</p>
                {request.order.orderItems && request.order.orderItems.length > 0 && (
                  <p>Item Price: ${request.order.orderItems[0].price.toFixed(2)}</p>
                )}
                {/* <p>Amount: ${request.orderItems[0].price}</p> */}
                <p>Date: {new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Request Details */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Request Details</h2>
          {selectedRequest ? (
            <div>
              <p><strong>User ID:</strong> {selectedRequest.userId}</p>
              <p><strong>Order Number:</strong> {selectedRequest.order.orderNumber}</p>
              {selectedRequest.order.orderItems && selectedRequest.order.orderItems.length > 0 && (
                <p><strong>Item Price:</strong> ${selectedRequest.order.orderItems[0].price.toFixed(2)}</p>
              )}
              <p><strong>Reason:</strong> {selectedRequest.reason}</p>
              <p><strong>Description:</strong> {selectedRequest.description || 'N/A'}</p>
              <p><strong>Request Date:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
              <div className="mt-6 space-x-4">
                <button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition-colors duration-300"
                >
                  Approve Refund
                </button>
                <button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="bg-transparent border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                  Reject Refund
                </button>
              </div>
            </div>
          ) : (
            <p>Select a refund request to view details.</p>
          )}
        </div>
      </div>

      {/* Processed Refunds */}
      <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Processed Refunds</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white border-opacity-20">
              <th className="text-left py-2">Order</th>
              <th className="text-left py-2">User ID</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {refundRequests.filter(request => request.status !== 'REQUESTED').map(request => (
              <tr key={request.id} className="border-b border-white border-opacity-10">
                <td className="py-2">{request.order.orderNumber}</td>
                <td className="py-2">{request.userId}</td>
                {request.order.orderItems && request.order.orderItems.length > 0 && (
                    <td className="py-2"><strong>Item Price:</strong> ${request.order.orderItems[0].price.toFixed(2)}</td>
              )}
               
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="py-2">{new Date(request.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}