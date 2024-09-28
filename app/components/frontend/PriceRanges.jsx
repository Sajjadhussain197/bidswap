"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const PriceRanges = () => {
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const router = useRouter()

    const handlePriceChange = (e) => {
        const { name, value } = e.target
        if (name === 'min') {
            setMinPrice(value)
        } else if (name === 'max') {
            setMaxPrice(value)
        }
    }
    const handleClearFilter = () => {
        setMinPrice('')
        setMaxPrice('')
        router.push(`/`)
    }
    const handlePriceSubmit = () => {
        console.log(minPrice, maxPrice)
        if (minPrice && maxPrice) {
            const encodedMin = encodeURIComponent(minPrice)
            const encodedMax = encodeURIComponent(maxPrice)
            router.push(`/?minprice=${encodedMin}&maxprice=${encodedMax}`)

        } else {
            console.log("set prices properly")
        }
    }

    return (
        <div className="col-span-full mt-4 flex flex-col items-center justify-between border rounded-xl">
            <div className="bg-gray-200 p-2 rounded-t-lg w-full ">
                <span className="font-semibold text-black">Select the price range</span>
            </div>
            <hr className="w-full mb-2 border-gray-300" />
            <div className="flex justify-between w-full p-2">
                <input
                    type="number"
                    name="min"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                        const value = Math.max(0, parseInt(e.target.value, 10));
                        setMinPrice(value.toString());
                    }}
                    className="w-24 px-2 py-1 text-black rounded"
                />
                <input
                    type="number"
                    name="max"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                        const value = Math.max(0, parseInt(e.target.value, 10));
                        setMaxPrice(value.toString());
                    }}
                    className="w-24 px-2 py-1 text-black rounded"
                />
            </div>
            <div className='flex w-full gap-2 px-2'>
                <button onClick={handlePriceSubmit} className="mt-4 bg-blue-500 w-[96%] hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded">
                    Filter
                </button>
                <button onClick={handleClearFilter} className="mt-4 bg-blue-500 w-[96%] hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded">
                    clear filter
                </button>
            </div>
        </div>
    )
}

export default PriceRanges
