import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { amount } = await request.json(); // Parse the request body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: 'usd',
      payment_method_types: ['card']
    });
    console.log(paymentIntent,"payment")
    return NextResponse.json({ clientSecret: paymentIntent.client_secret ,intentId:paymentIntent.id});
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
