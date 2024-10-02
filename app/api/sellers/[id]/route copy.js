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
export async function GET({ params }) {
  console.log(params.id, "backend id")
    // try {
    //   if (params.id) {
    //     const seller = await db.user.findUnique({
    //       where: { id: params.id },
    //     });
    //     if (!seller) {
    //       return NextResponse.json(
    //         { message: 'Seller not found' },
    //         { status: 404 }
    //       );
    //     }
    //     return NextResponse.json(seller);
    //   } else {
    //     const sellers = await db.user.findMany();
    //     return NextResponse.json(sellers);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   return NextResponse.json(
    //     { message: 'Unable to fetch Sellers', error },
    //     { status: 500 }
    //   );
    // }
  }
  export async function PUT({ params }) {
    try {
      const { id } = params;
      const { name, email, contact, category, address, imageUrl, slug } = await request.json();
      const updatedSeller = await db.seller.update({
        where: { id },
        data: { name, email, contact, category, address, imageUrl, slug }
      });
      return NextResponse.json(updatedSeller);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Unable to update Seller', error },
        { status: 500 }
      );
    }
  }


