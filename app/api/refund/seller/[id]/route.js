import db from '@/lib/db'; // Adjust this import based on your actual database setup
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { refundId, action } = await req.json(); // action can be 'approve' or 'reject'

  // Validate input and seller/admin authentication here
  // Example: const userId = req.user.id; (ensure you have user context)

  try {
    const refund = await db.refund.update({
      where: { id: refundId },
      data: {
        status: action === 'approve' ? 'Approved' : 'REJECTED',
        processedAt: new Date(),
      },
    });

    // Handle payment gateway refund here if approved
    if (action === 'approve') {
      // Implement payment gateway refund logic here
    }

    return NextResponse.json({ message: `Refund ${action}d successfully.`, refund }, { status: 200 });
  } catch (error) {
    console.error('Error processing refund:', error);
    return NextResponse.json({ error: 'An error occurred while processing refund.' }, { status: 500 });
  }
}