import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related sellers
    const seller = await db.seller.findUnique({
      orderBy: {
        createdAt: "desc",
      },
       where: {
        role: "SELLER",
         },
         include: {
          seller :true, 
         }
    });
    
    if (!seller) {
      return NextResponse.json(
        { message: 'seller not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(seller);
  } catch (error) {
    console.error('Error Fetching seller:', error);
    return NextResponse.json({
      message: 'Unable to fetch seller',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}




export async function DELETE(request, { params: { id } }) {
  try {
    const existingseller = await db.seller.findUnique({
      where: {
        id,
      },
    });
    if (!existingseller) {
      return NextResponse.json(
        {
          data: null,
          message: "seller Not Found",
        },
        { status: 400 }
      );
    }
    const deleteseller = await db.seller.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteseller);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete seller",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, contact , imageUrl, slug } = await request.json();
    console.log('Data received:', {name, contact , imageUrl, slug  });

    const existingseller = await db.seller.findUnique({
      where: { id },
    });

    if (!existingseller) {
      console.log('seller not found');
      return NextResponse.json({ data: null, message: "seller Not Found" }, { status: 404 });
    }


    const updatedseller = await db.seller.update({
      where: { id },
      data: { name, contact , imageUrl, slug },
    });

    console.log('seller updated:', updatedseller);
    return NextResponse.json(updatedseller);
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json({ message: "Unable to Update seller", error }, { status: 500 });
  }
}



