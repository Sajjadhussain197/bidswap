import db from '@/lib/db'; // Adjust this import based on your actual database setup
import { NextResponse } from 'next/server';
// import { stripe } from '@/lib/stripe'; // Make sure to import your Stripe instance

export async function PUT(req , {params}) {
  
    const body = await req.json();
    
    const id = req.url.split('/').pop();
    console.log(id,body,params,"all")
  const {  action } = body; // action can be 'approve' or 'reject'

  // Validate input
  if (!id || !action) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    // Update the refund status in the database
    const refund = await db.refund.update({
      where: { id: id },
      data: {
        status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
        updatedAt: new Date(),
      },
    });

    // Handle payment gateway refund here if approved
    // if (action === 'approve') {
    //   // Implement payment gateway refund logic here
    //   const paymentIntentId = refund.paymentIntentId; // Assuming you have this field in your Refund model

    //   // Create a refund with Stripe
    //   await stripe.refunds.create({
    //     payment_intent: paymentIntentId,
    //   });
    // }

    return NextResponse.json({ message: `Refund ${action}d successfully.`, refund }, { status: 200 });
  } catch (error) {
    console.error('Error processing refund:', error);
    return NextResponse.json({ error: 'An error occurred while processing the refund.' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
    const userId = req.url.split('/').pop();
    console.log(userId, "here is user, for refund ordes ");
    try {
     
    const refunds = await db.refund.findMany({
        where: { vendorId: userId }, // Filter by vendorId (seller ID)
        include: {
          order: { // Include order details related to each refund
            select: {
              id: true, // Only include order ID
              orderNumber: true, // Include order number if needed
              createdAt: true, // Include created date if needed
              updatedAt: true, // Include updated date if needed
              orderItems: { // Include items in the order
                select: {
                  id: true, // Only include item ID
                  name: true, // Include item name if needed
                  price: true, // Include item price if needed
                  quantity: true, // Include item quantity if needed
                },
              },
            },
          },
        },
      });
  
      if (!refunds) {
        return NextResponse.json({ error: 'Refund not found.' }, { status: 404 });
      }
  
      return NextResponse.json(refunds, { status: 200 });
    } catch (error) {
      console.error('Error fetching refund details:', error);
      return NextResponse.json({ error: 'An error occurred while fetching refund details.' }, { status: 500 });
    }
  }
