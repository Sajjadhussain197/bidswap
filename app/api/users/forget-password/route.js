import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { Resend } from "resend";
import EmailTemplate from "@/app/components/frontend/EmailTemplate";

export async function PUT(request) {
  console.log('recieved');
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    
    if (!existingUser) {
      return NextResponse.json({ data: null, message: "User Not Found" }, { status: 404 });
    }

    console.log('Received in PUT');
    
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    const linkText = "Reset Password";
    const userId = existingUser.id;
    const name = existingUser.name;
    const redirectUrl = `reset-password?token=${token}&id=${userId}`;
    const description = "Click on the following link in order to reset your password. Thank you";
    const subject = "Password Reset - BidSwap360";
    
    console.log(userId, name, redirectUrl);
    
    const sendMail = await resend.emails.send({
      from: "Desishub <info@jazzafricaadventures.com>",
      to: email,
      subject: subject,
      react: EmailTemplate({
        name,
        redirectUrl,
        linkText,
        description,
        subject,
      }),
    });
    
    console.log("SendMail Response:", sendMail);
    
    return NextResponse.json({ data: null, message: "Password reset email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in sending email:", error);
    return NextResponse.json({ error, message: "Server Error: Something went wrong" }, { status: 500 });
  }
}
