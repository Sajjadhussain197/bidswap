import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import { Resend } from "resend";
import EmailTemplate from '@/app/components/frontend/EmailTemplate';

export async function POST(request) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        
        const { name, email, password, role } = await request.json();

        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({
                data: null,
                message: 'User Already Exists',
            }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
         //Generate Token
        // Generate a random UUID (version 4)
        const rawToken = uuidv4();
        console.log(rawToken);
        // Encode the token using Base64 URL-safe format
        const token = base64url.encode(rawToken);
        const newUser = await db.user.create({
            data: { name, email, password: hashedPassword, verificationToken: token, role },
        });
        console.log('Created user:', newUser);
        //SEND THE EMAIL IF USER ROLE == SELLER
        if(role==="SELLER"){
             //Send an Email with the Token on the link as a search param
                const userId = newUser.id;
                const linkText = "Verify Account";
                const redirectUrl = `onboarding/${userId}?token=${token}}`;
                const subject = 
                "Account Verification - BidSwap360"
                const description = 
                " Thank you, for Creating an Account with Us. We request you to click on the link Below in order to complete your onboarding process. Thankyou"
                const sendMail = await resend.emails.send({
                //After buying domain do this <domain>
                from: "Desishub <info@jazzafricaadventures.com>",
                to: email,
                subject: subject,
                react: EmailTemplate({ name, redirectUrl, linkText, description, subject }),
    });
    console.log(sendMail);
    //Upon Click redirect them to the login

        }
        return NextResponse.json(
            {
              data: newUser,
              message: "User Created Successfully",
            },
            { status: 201 }
          );
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            {
              error,
              message: "Server Error: Something went wrong",
            },
            { status: 500 }
          );
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
