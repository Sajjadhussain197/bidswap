import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    // const sellerId = params.sellerId;
    // Validate seller ID format
    const sellerId = request.url.split('/').pop();
    console.log(sellerId, "here is seller ordes ");
    if (!sellerId || typeof sellerId !== 'string') {
      return NextResponse.json(
        { message: 'Invalid or missing seller ID' },
        { status: 400 }
      );
    }
  
    try {
      // Find order items associated with the seller's products where user role is "SELLER"
      // const sellerId = '66f4f1337f1a2484544b69e1'; // The ID of the seller you're querying for

      const orders = await db.order.findMany({
        where: {
          orderItems: {
            some: {
              product: {
                seller: {
                  id: sellerId, // Ensure this matches the seller's ID
                  role: 'SELLER' // Confirm the seller's role
                }
              }
            }
          }
        },
        include: {
          sales: {
            select: {
              total: true, // Include only the total from Sale
            },
          },
          orderItems: {
            select: {
              product: {
                select: {
                  name: true,
                  seller: {
                    select: {
                      name: true,
                      email: true,
                    }
                  }
                }
              },
              quantity: true,
            },
          },
        },
      });
      
      console.log(orders);
      























      // const orderItems = await db.orderItems.findMany({
      //   where: {
      //     product: {
      //       seller: {
      //         id: sellerId,  // Match the seller ID
      //         role: 'SELLER' // Ensure the user has the role of "SELLER"
      //       }
      //     }
      //   },
      //   include: {
      //     order: true,     // Include related order data
      //     product: true    // Include related product data (optional if you need it)
      //   }
      // });
      
      // const orderItems = await db.orderItems.findMany({
      //   where: {
      //     product: {
      //       seller: {
      //         id: sellerId, // Match the seller ID
      //         role: 'SELLER' // Ensure the user has the role of "SELLER"
      //       }
      //     }
      //   },
      //   include: { order: true } // Include the order data
      // });
  
      // If no order items found, return 404
      if (!orders.length) {
        return NextResponse.json(
          { message: 'No orders found for this seller' },
          { status: 404 }
        );
      }
  
      // Extract unique orders from order items
      // const orders = orderItems.map(item => item.order);
  
      return NextResponse.json(orders);
    } catch (error) {
      console.error('Error fetching orders for seller:', error);
      return NextResponse.json(
        {
          message: 'Unable to fetch orders',
          error: error.message || 'Unknown error'
        },
        { status: 500 }
      );
    }
  }
  