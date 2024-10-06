
"use client"
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function OrderRefundForm({orderId}) {
    const [id, setid] = useState(orderId)
    const [status, setStatus] = useState();
  const [formData, setFormData] = useState({
    orderNumber: id,
    reason: '',
    description: '',
    refundMethod: 'original',
    agreeToTerms: false
  })


  useEffect(() => {
    const fetchRefundStatus = async () => {
      try {
        const response = await axios.get(`/api/refund/${id}`);
    
        setStatus(response.data.status)
        console.log(response.data)
      
      } catch (err) {
        console.log('Failed to fetch refund status', err);
      } finally {
        console.log("loading")
      }
    };

    if (id) {
      fetchRefundStatus();
      
    }
  }, [id]);

// console.log(id, "order id")
  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target ).checked : value
    }))
  }

//   const requestRefund = async () => {
   
//     // Handle success or error messages
//   };
  const  handleSubmit =async (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({formData }),
      });
  
      const data = await response.json();
      if(data){
        toast.success("request submitted successfully")
      }else{
        toast.error("an error occurd")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-teal-800 p-4 text-white">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Refund Request</h1>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your order number"
              />
            </div> */}

            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">
                Reason for Refund
              </label>
              <input 
              type="text" 
              id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
             

              />
              {/* <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select a reason</option>
                <option value="wrong-item">Received wrong item</option>
                <option value="defective">Item is defective</option>
                <option value="not-as-described">Item not as described</option>
                <option value="no-longer-needed">No longer needed</option>
                <option value="other">Other</option>
              </select> */}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Please provide more details about your refund request"
              ></textarea>
            </div>
{/* 
            <div>
              <label htmlFor="refundMethod" className="block text-sm font-medium mb-1">
                Preferred Refund Method
              </label>
              <select
                id="refundMethod"
                name="refundMethod"
                value={formData.refundMethod}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="original">Refund to original payment method</option>
                <option value="store-credit">Store credit</option>
                <option value="bank-transfer">Bank transfer</option>
              </select>
            </div> */}

            {/* <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm">
                I agree to the refund policy and terms
              </label>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-purple-900 transition-colors duration-300"
              >
                Submit Refund Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}