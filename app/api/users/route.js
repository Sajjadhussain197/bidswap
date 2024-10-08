import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '@/app/components/frontend/EmailTemplate';
import { render } from '@react-email/render';

// Configure nodemailer to use a real email service
const transport = nodemailer.createTransport({
    service: 'gmail', // Or another email service
    auth: {
        user: process.env.EMAIL_FROM,
        pass:process.env.APP_PASSWORD // Use an app-specific password for security
    }
});

export async function POST(request) {
    try {
        const { name, email, password, role } = await request.json();
        console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
console.log("EMAIL_PASSWORD:", process.env.APP_PASSWORD);


        // Wrap database operations in a try-catch block
        let existingUser;
        try {
            existingUser = await db.user.findUnique({ where: { email } });
        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json({
                message: 'Database connection error',
                error: dbError.message
            }, { status: 500 });
        }

        if (existingUser) {
            return NextResponse.json({
                data: null,
                message: 'User Already Exists',
            }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const rawToken = uuidv4();
        const token = base64url.encode(rawToken); 
        const resetToken = base64url.encode(uuidv4()); // Generate a reset token
        // const resetTokenExpiry = new Date();           // Set the expiry time
        // resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour
        let newUser;
        try {
            newUser = await db.user.create({
                data: { name, email, password: hashedPassword, verificationToken: token              // Add reset token
                    , role },
            });

            try {
                await db.userProfile.create({
                    data: {
                         userId: newUser.id, // Reference to the newly created user
                    dateOfBirth: null,   // Placeholder
                    address: null,
                    },
                });
            } catch (profileError) {
                console.error('Error creating user profile:', profileError);
                // Optionally handle the error (rollback, etc.)
            }
        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json({
                message: 'Error creating user',
                error: dbError.message
            }, { status: 500 });
        }

        if (role === "SELLER") {
            const userId = newUser.id;
            const linkText = "Verify Account";
            const redirectUrl = `/api/users/verify?token=${token}`; // Include token in the URL
            const subject = "Account Verification - BidSwap360";
            const description = "Thank you for creating an account with us. Please click on the link below to verify your email and complete your onboarding process.";
            
            try {
                const emailHtml = await render(EmailTemplate({ name, redirectUrl, linkText, description, subject }));

                const info = await transport.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: subject,
                    html: emailHtml,
                });
                console.log('Email sent:', info.response);
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                // Check if the error is due to missing credentials
                if (emailError.message.includes('Missing credentials')) {
                    console.error('Missing email credentials. Please check your environment variables.');
                }
                // Log the error but don't prevent user creation
            }
        }
        return NextResponse.json(
            {
              data: newUser,
              message: "User Created Successfully. Please check your email for verification.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating User:', error);
        return NextResponse.json({
            message: 'Unable to create User',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const users = await db.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error Fetching users:', error);
        return NextResponse.json({
            message: 'Unable to fetch users',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
