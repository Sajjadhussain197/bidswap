// /pages/api/products/bids.js
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from 'next-auth';
import db from "@/lib/db";
import { NextResponse } from 'next/server';
export async function GET(req, {params}) {
    const userId = params.id;
    console.log(userId, "params ")
//   const { sellerId } = req.query;

    try {
      // Find all products belonging to the seller
      const productsWithBids = await db.product.findMany({
        where: {
          userId: userId, // Match the seller
        },
        select: {
          id: true,
          name: true,
          saleprice: true,
          createdAt: true,
          bids: {
            select: {
              id: true,
              amount: true,
              createdAt: true,
              expiresAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      // If no products are found
      if (!productsWithBids.length) {
        return res.status(404).json({ message: 'No products found for this seller' });
      }

      return NextResponse.json(productsWithBids);

    } catch (error) {
      console.error('Error fetching bids:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}
