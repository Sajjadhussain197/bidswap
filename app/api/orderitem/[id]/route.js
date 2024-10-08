// import db from "@/lib/db";
// import { NextResponse } from "next/server";

// // Handle GET request
// export async function GET(request, { params: { id } }) {
//   // Validate ID format
//   console.log(id);
//   if (!id || typeof id !== 'string') {
//     return NextResponse.json(
//       { message: 'Invalid or missing order ID' },
//       { status: 400 }
//     );
//   }

//   try {
//     const order = await db.orderItems.findUnique({
//       where: { id },
    
//     });

//     if (!order) {
//       return NextResponse.json(
//         { message: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       {
//         message: 'Unable to fetch order',
//         error: error.message || 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }


import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const orderId = params.id; // Assuming you get the order ID from the route params
  console.log(orderId,"this is order id to fetch data for seller order details")
  try {


    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        sales: { select: { total: true } },
        orderItems: {
          select: {
            product: {
              select: {
                name: true,
                seller: { select: { name: true, email: true } },
              },
            },
            quantity: true,
          },
        },
      },
    });


    const orderObject = {
      id: order.id,
        firstName: order?.firstName,
        lastName: order?.lastName,
        emailAddress: order?.emailAddress,
        phoneNumber: order?.phoneNumber,
        streetAddress: order?.streetAddress,
        city: order?.city,
        district: order?.district,
        country: order?.country,
        shippingCost: order?.shippingCost,
        paymentMethod: order?.paymentMethod,
        orderStatus: order?.orderStatus,
        orderNumber: order?.orderNumber,
        createdAt: order?.createdAt,
        updatedAt: order?.updatedAt,
      salesTotal: order?.sales.reduce((sum, sale) => sum + sale.total, 0), // Calculate total sales
      items: order?.orderItems.map(item => ({
        productName: item.product?.name,
        sellerName: item.product?.seller?.name,
        sellerEmail: item.product?.seller?.email,
        quantity: item?.quantity,
      })),
    };

    // Return the constructed object as a JSON response
    return NextResponse.json(orderObject);




    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}


    // Fetch the order details by orderId
    // const order = await db.order?.findUnique({
    //   where: {
    //     id: orderId, // Find the order by its ID
    //   },
    //   include: {
    //     sales: {
    //       select: {
    //         total: true, // Include only the total from Sale
    //       },
    //     },
    //     orderItems: {
    //       select: {
    //         product: {
    //           select: {
    //             name: true,
    //             seller: {
    //               select: {
    //                 name: true,
    //                 email: true,
    //               },
    //             },
    //           },
    //         },
    //         quantity: true,
    //       },
    //     },
    //   },
    // });

    // if (!order || !order?.orderItems || order?.orderItems.length === 0) {
    //   return new Response(JSON.stringify({ error: 'No items found for this order?.' }), { status: 404 });
    // }
    
    // const responseData = {
    //   id: order?.id,
    //   total: order?.sales.total,
    //   items: order?.orderItems.map(item => ({
    //     productName: item.product?.name || 'Unknown Product',
    //     sellerName: item.product?.seller?.name || 'Unknown Seller',
    //     sellerEmail: item.product?.seller?.email || 'No Email Provided',
    //     quantity: item.quantity,
    //   })),
    // };
    