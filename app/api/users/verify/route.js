import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ message: 'Token is required' }, { status: 400 });
        }

        const user = await db.user.findFirst({
            where: { verificationToken: token }
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
        }

        await db.user.update({
            where: { id: user.id },
            data: { 
                emailVerified: true,
                verificationToken: null // Clear the token after verification
            }
        });

        // Redirect to a success page after verification
        return NextResponse.redirect(new URL('/login', request.url));
    } catch (error) {
        console.error('Error verifying email:', error);
        return NextResponse.json({
            message: 'Unable to verify email',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
