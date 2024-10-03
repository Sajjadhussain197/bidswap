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
    const order = await db.order.findUnique({
      where: { id },
      include: { orderItems: true },
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

// Handle DELETE request
export async function DELETE(request, { params: { id } }) {
  // Validate ID format
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { message: 'Invalid or missing order ID' },
      { status: 400 }
    );
  }

  try {
    const existingOrder = await db.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { data: null, message: "Order not found" },
        { status: 404 }
      );
    }

    const deletedOrder = await db.order.delete({
      where: { id },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      {
        message: "Unable to delete order",
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle PUT request
export async function PUT(request, { params: { id } }) {
  console.log(id,"id is here we can update order")
  // Validate ID format
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { message: 'Invalid or missing order ID' },
      { status: 400 }
    );
  }

  try {
    const existingOrder = await db.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    const updatedOrder = await db.order.update({
      where: { id },
      data: { orderStatus: 'DELIVERED' },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        message: 'Unable to update order',
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
