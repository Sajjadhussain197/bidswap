import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related trainings
    const order = await db.order.findUnique({
      where: { 
        userId: id }
    });
    
    if (!order) {
      return NextResponse.json(
        { message: 'order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error Fetching order:', error);
    return NextResponse.json({
      message: 'Unable to fetch order',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}



