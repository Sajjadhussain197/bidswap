import db from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET request
export async function GET(request, { params: { id } }) {
  // Validate ID format
  console.log(id);
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { message: 'Invalid or missing order ID' },
      { status: 400 }
    );
  }

  try {
    const order = await db.orderItems.findUnique({
      where: { id },
    
    });

    if (!order) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      {
        message: 'Unable to fetch order',
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}