// /pages/api/products/bids.js
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from 'next-auth';
import db from "@/lib/db";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


async function sendBidApprovalEmail(bidderEmail) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
      user: process.env.EMAIL_FROM, // Sender's email
      pass: process.env.APP_PASSWORD // App-specific password
    },
  });

  // Setup email data
  let mailOptions = {
    from: process.env.EMAIL_FROM, // Sender's email
    to: bidderEmail, // Recipient email
    subject: 'Your Bid Has Been Approved!', // Subject line
    html: `
      <h1>Congratulations!</h1>
      <p>Your bid has been approved.</p>
      <p>Click the button below to proceed to checkout:</p>
      <a href="http://localhost:3000/checkout" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Checkout</a>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}






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
              status: true, // Include the status field
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

export async function PUT(req, {params}) {
    const bidId = params.id;
    console.log(bidId, "params TO update bid")

    try {
      // Update the bid status to approved
      const updatedBid = await db.bid.update({
        where: { id: bidId },
        data: { status: 'APPROVED' },
      });
      const bidder = await db.bidder.findFirst({
        where: {
          bidId: bidId, // Find the bidder using the bidId
        },
        include: {
          user: {
            select: {
              email: true, // Select the email of the user
            },
          },
        },
      });
      const bidderEmail = bidder?.user?.email || null;
      if(bidderEmail){
        sendBidApprovalEmail(bidderEmail)
      }

      // console.log(bidderEmail, "bidder email")

      if (!updatedBid) {
        return res.status(404).json({ message: 'Bid not found' });
      }

      return NextResponse.json(bidder);

    } catch (error) {
      console.error('Error updating bid:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}
