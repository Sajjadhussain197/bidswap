import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const data = await request.json();
        console.log({ data });

        // Check if price is valid
        if (!data.price || data.price <= 0) {
            return NextResponse.json({ error: 'Invalid price. Price must be greater than 0.' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: data.firstName && data.lastName ? `Order for ${data.firstName} ${data.lastName}` : 'Product Order',
                        },
                        unit_amount: Math.round(data.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?step=${data.currentStep || 0}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?step=${data.currentStep || 0}`,
            customer_email: data.email,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        if (error instanceof Stripe.errors.StripeInvalidRequestError) {
            return NextResponse.json({ error: 'Invalid request to Stripe API. Please check your product data.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}