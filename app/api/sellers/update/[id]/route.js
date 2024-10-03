import db from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'
// import db from '../../../lib/db';
console.log("id")
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
export async function GET(request, { params }) {
  console.log(params.id, "backend id");
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a 2-second delay

  try {
    // If an ID is provided, fetch the specific seller
    if (params.id) {
      const seller = await db.user.findUnique({
        where: { id: params.id },
      });

      // If seller not found, return a 404 response
      if (!seller) {
        return NextResponse.json(
          { message: 'Seller not found' },
          { status: 404 }
        );
      }

      // Return the found seller
      return NextResponse.json(seller);
    }

    // If no ID is provided, fetch all sellers
    const sellers = await db.user.findMany();
    return NextResponse.json(sellers);

  } catch (error) {
    console.error('Error fetching seller:', error);

    // Return a 500 status with error message
    return NextResponse.json(
      { message: 'Unable to fetch Sellers', error: error.message },
      { status: 500 }
    );
  }
}
  export async function PUT(request , { params }) {
    try {
      console.log(params)
      const { id } = params;
      const body = await request.json();
  
      // Initialize an empty object to store the updated fields
      const data = {};
  
      // Dynamically add the fields to the data object if they are present in the request body
      if (body.name) data.name = body.name;
      if (body.email) data.email = body.email;
      // if (body.contact) data.contact = body.contact;
      // if (body.category) data.category = body.category;
      // if (body.address) data.address = body.address;
      // if (body.imageUrl) data.imageUrl = body.imageUrl;
      // if (body.slug) data.slug = body.slug;
  
      // Update the seller with the provided fields
      const updatedSeller = await db.user.update({
        where: { id },
        data
      });
  
      // Return the updated seller object
      return NextResponse.json(updatedSeller);} catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Unable to update Seller', error },
        { status: 500 }
      );
    }
  }



  export async function DELETE(request, { params }) {
    const { id } = params;
  console.log(id,"delete")
    try {
      // Check if the seller exists
      const seller = await db.user.findUnique({ where: { id } });
  
      if (!seller) {
        return NextResponse.json({ message: 'Seller not found' }, { status: 404 });
      }
  
      // Delete the seller
      await db.user.delete({ where: { id } });
      return NextResponse.json({ message: 'Seller deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting seller:', error);
      return NextResponse.json({ message: 'Error deleting seller', error }, { status: 500 });
    }
  }