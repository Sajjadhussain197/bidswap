// pages/api/check-expiring-bids.js
import db from '@/lib/db';
import nodemailer from 'nodemailer';
// import { db } from '../../your-database-config'; // Adjust the path to your DB config

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Find bids that are expiring within the next 2 minutes
    const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000);
    const expiringBids = await db.bid.findMany({
      where: {
        expiresAt: {
          lte: twoMinutesLater,
        },
        status: 'pending',
      },
    });

    if (expiringBids.length === 0) {
      console.log('No bids are expiring soon.');
      return res.status(200).json({ message: 'No bids are expiring at the moment.' });
    }

    for (const bid of expiringBids) {
      const bidId = bid.id;

      // Find the highest bidder for the bid
      const highestBidder = await db.bidder.findFirst({
        where: {
          bidId: bidId,
        },
        orderBy: {
          amount: 'desc',
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (highestBidder) {
        // Update the bid status to approved
        await db.bid.update({
          where: { id: bidId },
          data: { status: 'APPROVED' },
        });

        // Send email to the highest bidder
        const highestBidderEmail = highestBidder?.user?.email || null;
        if (highestBidderEmail) {
          await sendBidApprovalEmail(highestBidderEmail);
        }

        // Send email to the seller
        const sellerEmail = bid?.user?.email || null;
        if (sellerEmail) {
          await sendSellerNotificationEmail(sellerEmail);
        }

        // Update all other bidders' status to rejected
        await db.bidder.updateMany({
          where: {
            bidId: bidId,
            id: {
              not: highestBidder.id,
            },
          },
          data: { status: 'REJECTED' },
        });
      }
    }

    return res.status(200).json({ message: 'Bids processed successfully.' });
  } catch (error) {
    console.error('Error updating bid:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function sendBidApprovalEmail(bidderEmail) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: bidderEmail,
    subject: 'Your Bid Has Been Approved!',
    html: `
      <h1>Congratulations!</h1>
      <p>Your bid has been approved.</p>
      <p>Click the button below to proceed to checkout:</p>
      <a href="http://localhost:3000/checkout" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Checkout</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

async function sendSellerNotificationEmail(sellerEmail) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: sellerEmail,
    subject: 'Your Product Has a Winning Bid!',
    html: `
      <h1>Congratulations!</h1>
      <p>Your product has received a winning bid.</p>
      <p>Please check your dashboard for further details.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
