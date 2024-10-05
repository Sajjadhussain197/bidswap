import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '@/app/components/frontend/EmailTemplate';
import { render } from '@react-email/render';
import bcrypt from 'bcrypt';

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
        const body= await request.json();
        console.log(body,"data")
        const { password, token, id,email } = body;


        const existingUser = await db.user.findUnique({ where: { id } });
        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
         // Check if the token is valid and not expired
    if (existingUser.resetToken !== token || new Date() > existingUser.resetTokenExpiry) {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
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
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update the user with the reset token and expiration
        await db.user.update({
            where: { id },
            data: {
              password: hashedPassword,
              resetToken: null,
              resetTokenExpiry: null,
            },
          });

        // Construct the reset password URLconst 
        // redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&id=${existingUser.id}`;

        // const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&id=${existingUser.id}`;
        // const subject = 'Password Reset - BidSwap360';
        // const description = 'Please click the link below to reset your password.';
        // const linkText = 'Reset Password';

        // // Render the email template
        // const emailHtml = await render(EmailTemplate({
        //     name: existingUser.name,
        //     redirectUrl,
        //     linkText,
        //     description,
        //     subject,
        // }));

        // // Send the email
        // const info = await transport.sendMail({
        //     from: process.env.EMAIL_FROM,
        //     to: email,
        //     subject: subject,
        //     html: emailHtml,
        // });

        // console.log('Email sent:', info.response);
        return new NextResponse(JSON.stringify({
            message: 'Password reset successfully',
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error processing reset request:', error);
        return NextResponse.json({
            message: 'Failed to send password reset email',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const body= await request.json();
        console.log(body,"data")
        const { password, token, id,email } = body;


        const existingUser = await db.user.findUnique({ where: { id } });
        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
         // Check if the token is valid and not expired
    // if (existingUser.resetToken !== token || new Date() > existingUser.resetTokenExpiry) {
    //     return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    //   }
        // Generate a reset token
        const rawToken = uuidv4();
        const resetToken = base64url.encode(rawToken);
        
        // Set the expiry time for the reset token
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

        // // Log the user update operation
        // console.log('Updating user with email:', email);
        // console.log('Reset token:', resetToken);
        // console.log('Reset token expiry:', resetTokenExpiry);
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update the user with the reset token and expiration
        await db.user.update({
            where: { id },
            data: {
              password: hashedPassword,
              resetToken: null,
              resetTokenExpiry: null,
            },
          });

        // Construct the reset password URLconst 
        // redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&id=${existingUser.id}`;

        // const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&id=${existingUser.id}`;
        // const subject = 'Password Reset - BidSwap360';
        // const description = 'Please click the link below to reset your password.';
        // const linkText = 'Reset Password';

        // // Render the email template
        // const emailHtml = await render(EmailTemplate({
        //     name: existingUser.name,
        //     redirectUrl,
        //     linkText,
        //     description,
        //     subject,
        // }));

        // // Send the email
        // const info = await transport.sendMail({
        //     from: process.env.EMAIL_FROM,
        //     to: email,
        //     subject: subject,
        //     html: emailHtml,
        // });

        // console.log('Email sent:', info.response);
        return new NextResponse(JSON.stringify({
            message: 'Password reset successfully',
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error processing reset request:', error);
        return NextResponse.json({
            message: 'Failed to send password reset email',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

