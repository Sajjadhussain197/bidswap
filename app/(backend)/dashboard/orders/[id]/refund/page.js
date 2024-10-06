"use client"; 
import SalesInvoice from "@/app/components/order/salesInvoice";
import OrderRefundForm from "@/app/components/RefundForm";
import { getData } from "@/lib/getData";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
    const id = params.id;
    
    // const [order, setOrder] = useState(null);  // Create state to store the order
    // const [loading, setLoading] = useState(true); // Create state to track loading status
    // const [error, setError] = useState(null); // Create state to track errors

    // // Fetch the order data once the component mounts
    // useEffect(() => {
    //     const fetchOrder = async () => {
    //         try {
    //             const orderData = await getData(`orders/${id}`);
    //             setOrder(orderData); 
    //             setLoading(false);   
    //         } catch (err) {
    //             console.error(err);  // Log any errors
    //             setError("Failed to load order"); // Set error state
    //             setLoading(false);   // Stop loading in case of error
    //         }
    //     };
    //     fetchOrder(); // Trigger the fetchOrder function
    // }, [id]); // Only call useEffect when 'id' changes

    // // Display loading message while fetching data
    // if (loading) return <div>Loading...</div>;

    // // Display error if it occurs
    // if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Order Refund</h1>
            <p>Order ID: {id}</p>
            <OrderRefundForm orderId={id}/>
        </div>
    );
}
