import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch market with related products
    const market = await db.market.findUnique({
      where: { id },
    });
    
    if (!market) {
      return NextResponse.json(
        { message: 'market not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(market);
  } catch (error) {
    console.error('Error Fetching market:', error);
    return NextResponse.json({
      message: 'Unable to fetch market',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}




export async function DELETE(request, { params: { id } }) {
  try {
    const existingmarket = await db.market.findUnique({
      where: {
        id,
      },
    });
    if (!existingmarket) {
      return NextResponse.json(
        {
          data: null,
          message: "market Not Found",
        },
        { status: 400 }
      );
    }
    const deletemarket = await db.market.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletemarket);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete market",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, description, image, slug } = await request.json();
    console.log('Data received:', { name, description, image, slug });

    // Check if the market exists
    const existingmarket = await db.market.findUnique({
      where: { id },
    });

    if (!existingmarket) {
      console.log('market not found');
      return NextResponse.json({ data: null, message: "market Not Found" }, { status: 404 });
    }

    // Update the market
    const updatedmarket = await db.market.update({
      where: { id },
      data: { name, description, image, slug },
    });

    console.log('market updated:', updatedmarket);
    return NextResponse.json(updatedmarket);
  } catch (error) {
    console.error('Error updating market:', error);
    return NextResponse.json({ message: "Unable to Update market", error }, { status: 500 });
  }
}



