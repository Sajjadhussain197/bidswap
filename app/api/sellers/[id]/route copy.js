import { NextResponse } from 'next/server';
import React from 'react'
import db from '../../../lib/db';
export async function POST(request) {
try {
    const {name,email,contact,category,address,imageUrl,slug} = await request.json();
    const newSeller = await db.seller.create({
        data: {name,email,contact,category,address,imageUrl,slug}
    })
 //Update the Verification in the user
 //check seller already exist in db 
 
 const existingUser = await db.user.findUnique({ where: { 
  id:sellerData.userId,
} });

 if (!existingUser) {
     return NextResponse.json({
         data: null,
         message: 'No User Found',
     }, { status: 409 });
 } 
 //update  emailverified
 const updatedSeller = await db.user.update({
  where: { 
    id:sellerData.userId,
  },
  data: {
    emailVerified : true
  }
})      
   
    console.log(newSeller);
    return NextResponse.json(newSeller);

} catch (error) {
    console.log(error);
    return NextResponse.json({
        message: 'Unable to create Seller', error
    },{status:500})
}
}
export async function GET() {
    try {
      const sellers = await db.seller.findMany();
      return NextResponse.json(sellers);
  
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Unable to fetch Sellers', error },
        { status: 500 }
      );
    }
  }


