import { authOptions } from "@/lib/authOptions";
import { getServerSession } from 'next-auth';
import db from "@/lib/db";
import { NextResponse } from 'next/server';

// Function to place a bid
export async function POST(request) {
    // Get the user's session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id; // Get the user's ID from the session
    console.log(userId, "user id");

    try {
        const { productId, amount } = await request.json(); // Parse bid details from request
        console.log("Inside bid:", userId, amount, productId);

        // Input validation
        if (!productId || !amount || !userId) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Fetch the product to ensure it exists
        const product = await db.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        // Ensure the bid amount is valid
        if (amount <= 0) {
            return NextResponse.json({ message: 'Bid amount must be greater than zero' }, { status: 400 });
        }

        // Fetch the associated bid using the productId
        const bid = await db.bid.findFirst({
            where: { productId: productId },
        });

        if (!bid) {
            return NextResponse.json({ message: 'No active bid found for this product' }, { status: 404 });
        }

        const bidId = bid.id; // Get the bid ID
        const sellerId = product.userId; // Assuming the product has a userId representing the seller
        console.log(bidId, bid, "bid data to to apply")

        const newBid = await db.bidder.create({
            data: {
                amount: amount,
                createdAt: new Date(),
                updatedAt: new Date(),
                
                // Connect the user by userId
                user: {
                    connect: {
                        id: userId,
                    },
                },
                
                // Connect the bid by bidId (remove bidId from the top level)
                bid: {
                    connect: {
                        id: bidId,  // Ensure bidId is available and valid
                    },
                },
                
                // Connect the product by productId
                product: {
                    connect: {
                        id: productId,
                    },
                },
            },
        });
        

        return NextResponse.json({ message: 'Bid placed successfully', bid: newBid }, { status: 201 });
    } catch (error) {
        console.error('Error placing bid:', error);
        return NextResponse.json({
            message: 'Unable to place bid',
            error: error.message || 'Unknown error',
        }, { status: 500 });
    }
}
