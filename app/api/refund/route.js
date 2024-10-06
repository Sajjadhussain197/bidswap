import db from '@/lib/db'; // Adjust this import based on your actual database setup
import { NextResponse } from 'next/server';
export async function POST(req) {
    const body = await req.json();
    console.log(body.formData, "form");
  
    const { orderNumber, reason, description, refundMethod } = body.formData;
  
    // Validate input
    if (!orderNumber || !reason || !description || !refundMethod) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
  
    try {
      // Fetch order details including userId and order items with products
      const order = await db.order.findUnique({
        where: { id: orderNumber },
        include: {
          orderItems: {
            include: {
              product: true, // Include product details to access vendor
            },
          },
        },
      });
  
      if (!order) {
        return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
      }
  
      // Extract userId directly from the fetched order
      const userId = order.userId; // Get userId directly from the order
  
      // Assuming you want to use the vendor of the first product in order items
      const sellerId = order.orderItems[0]?.product?.userId; // Access vendor from product relation
  
      if (!sellerId) {
        return NextResponse.json({ error: 'Vendor not found for this order.' }, { status: 404 });
      }
  
      const amount = order.shippingCost; // Or any other logic to determine amount
  
      console.log('Seller ID:', sellerId, 'User ID:', userId);
  
      const refund = await db.refund.create({
        data: {
          orderId: order.id,
          userId,                // Use the retrieved user ID
          vendorId: sellerId,    // Use extracted seller ID
          status: 'REQUESTED',   // Set initial status as REQUESTED
          reason,
          amount,
        },
      });
  
      return NextResponse.json({ message: 'Refund requested successfully.', refund }, { status: 200 });
  
    } catch (error) {
      console.error('Error requesting refund:', error);
      return NextResponse.json({ error: 'An error occurred while requesting refund.' }, { status: 500 });
    }
  }

export async function GET(req, { params }) {
  const { id } = params; // Get the refund ID from the request parameters
console.log(id, "user id ")
  try {
    // Fetch refund details along with related order and order items
    const refundDetails = await db.refund.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                product: true, // Include product details if needed
              },
            },
            sales: true, // Include sales if needed
          },
        },
        user: true, // Include user details if needed
        vendor: true, // Include vendor details if needed
      },
    });

    if (!refundDetails) {
      return NextResponse.json({ error: 'Refund not found.' }, { status: 404 });
    }

    return NextResponse.json(refundDetails, { status: 200 });
  } catch (error) {
    console.error('Error fetching refund details:', error);
    return NextResponse.json({ error: 'An error occurred while fetching refund details.' }, { status: 500 });
  }
}