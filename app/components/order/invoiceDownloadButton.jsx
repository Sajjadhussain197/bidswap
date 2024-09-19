"use client";
import React from 'react'

export default function invoiceDownloadButton() {
    function handlePrint(){
        console.log("clicked");
    }
  return (
        <div className="flex items-end justify-end mb-8">
        <button
        onClick={handlePrint}
          type="button"
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold
         dark:bg-gray-100 bg-slate-800  dark:text-gray-900 transition-all duration-20
         text-slate-200 border border-transparent rounded-md focus:outline-none focus:ring-2 
         focus:ring-offset-2 focus:ring-gray-500"
        >
          Download Invoice
        </button>
      </div>

  )
}
