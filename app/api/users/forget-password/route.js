import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '@/app/components/frontend/EmailTemplate';
import { render } from '@react-email/render';

// Configure nodemailer to use your email service
const transport = nodemailer.createTransport({
    service: 'gmail', // Or another email service
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.APP_PASSWORD // Use an app-specific password
    }
});

export async function PUT(request) {
    try {
        const { email } = await request.json();

        // Check if the email is valid
        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Find the user by email
        const existingUser = await db.user.findUnique({ where: { email } });
        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Generate a reset token
        const rawToken = uuidv4();
        const resetToken = base64url.encode(rawToken);
        
        // Set the expiry time for the reset token
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

        // Log the user update operation
        console.log('Updating user with email:', email);
        console.log('Reset token:', resetToken);
        console.log('Reset token expiry:', resetTokenExpiry);

        // Update the user with the reset token and expiration
        await db.user.update({
            where: { email },
            data: {
                resetToken: resetToken,
               resetTokenExpiry: new Date(Date.now() + 3600000)
            },
        });

        // Construct the reset password URL
        const redirectUrl = `/reset-password?token=${resetToken}&id=${existingUser.id}`;
        const subject = 'Password Reset - BidSwap360';
        const description = 'Please click the link below to reset your password.';
        const linkText = 'Reset Password';

        // Render the email template
        const emailHtml = await render(EmailTemplate({
            name: existingUser.name,
            redirectUrl,
            linkText,
            description,
            subject,
        }));

        // Send the email
        const info = await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            html: emailHtml,
        });

        console.log('Email sent:', info.response);

        return NextResponse.json({
            message: 'Password reset email sent successfully',
        }, { status: 200 });

    } catch (error) {
        console.error('Error processing reset request:', error);
        return NextResponse.json({
            message: 'Failed to send password reset email',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

// export async function PUT(request) {
//     try {
//         const { email } = await request.json();

//         // Check if the email is valid
//         if (!email) {
//             return NextResponse.json({ message: 'Email is required' }, { status: 400 });
//         }

//         // Find the user by email
//         const existingUser = await db.user.findUnique({ where: { email } });
//         if (!existingUser) {
//             return NextResponse.json({ message: 'User not found' }, { status: 404 });
//         }

//         // Generate a reset token
//         const rawToken = uuidv4();
//         const resetToken = base64url.encode(rawToken);

//         // Update the user with the reset token and expiration (optional)
//         await db.user.update({
//             where: { email },
//             data: { resetToken, resetTokenExpiry: Date.now() + 3600000 }, // 1 hour expiry
//         });

//         // Construct the reset password URL
//         const redirectUrl = `/reset-password?token=${resetToken}&id=${existingUser.id}`;
//         const subject = 'Password Reset - BidSwap360';
//         const description = 'Please click the link below to reset your password.';
//         const linkText = 'Reset Password';

//         // Render the email template
//         const emailHtml = await render(EmailTemplate({
//             name: existingUser.name,
//             redirectUrl,
//             linkText,
//             description,
//             subject,
//         }));

//         // Send the email
//         const info = await transport.sendMail({
//             from: process.env.EMAIL_FROM,
//             to: email,
//             subject: subject,
//             html: emailHtml,
//         });

//         console.log('Email sent:', info.response);

//         return NextResponse.json({
//             message: 'Password reset email sent successfully',
//         }, { status: 200 });

//     } catch (error) {
//         console.error('Error processing reset request:', error);
//         return NextResponse.json({
//             message: 'Failed to send password reset email',
//             error: error.message || 'Unknown error'
//         }, { status: 500 });
//     }
// }
