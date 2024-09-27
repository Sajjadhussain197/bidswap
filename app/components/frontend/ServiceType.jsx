"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ServiceType = () => {
  const [selectedService, setSelectedService] = useState('')
  const router = useRouter()
  const fetchData = async (service) => {
    try {
      let endpoint = ''
      if (service === 'bidding') {
        endpoint = '/api/bids'
      } else if (service === 'barting') {
        endpoint = '/api/barters'
      } else if (service === 'sale') {
        endpoint = '/api/sales'
      }

      const response = await fetch(endpoint)
      const data = await response.json()

      // Send data to Product component
      router.push({
        pathname: '/product',
        query: { data: JSON.stringify(data) },
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    console.log(selectedService)
    if (selectedService) {
    //   fetchData(selectedService)
    
    router.push(`/?serviceType=${encodeURIComponent(selectedService)}`);
    }
  }, [selectedService, fetchData])

  

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value)
  }

  return (
    <div className="col-span-full mt-4 flex flex-col items-center justify-between border rounded-xl ">
        <div className="bg-gray-200 p-2 rounded-t-lg w-full">
            <span className="font-semibold text-black">Select Service</span>
        </div>
        <hr className="w-full mb-2 border-gray-300" />
        <div className="flex justify-between w-full flex-col p-2 gap-2 ">
            <label className="flex items-center">
                <input
                    type="radio"
                    name="service"
                    value="bidding"
                    className="mr-2"
                    onChange={handleServiceChange}
                />
                <span className="text-black">Bidding</span>
            </label>
            <label className="flex items-center">
                <input
                    type="radio"
                    name="service"
                    value="barting"
                    className="mr-2"
                    onChange={handleServiceChange}
                />
                <span className="text-black">Barting</span>
            </label>
            <label className="flex items-center">
                <input
                    type="radio"
                    name="service"
                    value="sale"
                    className="mr-2"
                    onChange={handleServiceChange}
                />
                <span className=" text-red-500">Sale</span>
            </label>
        </div>
    </div>
  )
}

export default ServiceType
