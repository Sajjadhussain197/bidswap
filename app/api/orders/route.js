import { NextResponse } from "next/server";
import db from "../../../lib/db";

// Function to generate an order number
function generateOrderNumber(length) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let orderNumber = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}

export async function POST(request) {
  try {
    const { checkoutFormData, orderItems } = await request.json();
    const {
      City,
      Country,
      District,
      Email,
      FirstName,
      LastName,
      PaymentMethod,
      Phone,
      ShippingCost,
      StreetAddress,
      userId,
    } = checkoutFormData;
   console.log(checkoutFormData,orderItems);

    // Use Prisma transaction to ensure both queries are successful or rolled back
    const result = await db.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          firstName: FirstName,
          lastName: LastName,
          emailAddress: Email,
          phoneNumber: Phone,
          streetAddress: StreetAddress,
          city : City,
          country: Country,
          district: District,
          shippingCost: parseFloat(ShippingCost),
          paymentMethod: PaymentMethod,
          orderNumber: generateOrderNumber(8),
          orderItems: {
            create: orderItems.map(item => ({
              productId: item.id,
              qty: item.qty,
              image: item.image || 'default-image',
              vendorId: item.id, // Adjust this as needed
              name: item.name || 'default-name',
              price: item.saleprice,
            })),
          },
        },
      });

      // Create sales records for each item
      await Promise.all(
        orderItems.map(item =>
          prisma.sale.create({
            data: {
              orderId: newOrder.id,
              productId: item.id,
              vendorId: item.id || newOrder.id, // Adjust this as needed
              image: item.image || 'default-image',
              name: item.name || 'default-name',
              quantity: item.qty,
              productprice: item.saleprice,
              total: item.qty * item.saleprice,
            },
          })
        )
      );

      return [newOrder, newOrder.orderItems];
    });

    const [newOrder, newOrderItems] = result;

    // Log the result for debugging
    console.log(newOrder, newOrderItems);

    // Return the created order and order items
    return NextResponse.json({ newOrder, newOrderItems });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        message: "Failed to create Order",
        error,
      },
      { status: 500 }
    );
  } finally {
    // Close the Prisma client connection
    await db.$disconnect();
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Unable to fetch Orders', error: error.message },
      { status: 500 }
    );
  }
}
