import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    // Fetch attribute with related products
    const attribute = await db.attribute.findUnique({
      where: { id },
    });
    
    if (!attribute) {
      return NextResponse.json(
        { message: 'attribute not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(attribute);
  } catch (error) {
    console.error('Error Fetching attribute:', error);
    return NextResponse.json({
      message: 'Unable to fetch attribute',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const existingattribute = await db.attribute.findUnique({
      where: {
        id,
      },
    });
    if (!existingattribute) {
      return NextResponse.json(
        {
          data: null,
          message: "attribute Not Found",
        },
        { status: 400 }
      );
    }
    const deleteattribute = await db.attribute.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteattribute);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete attribute",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  console.log('PUT request received with ID:', id);
  try {
    const { name, description, image, slug } = await request.json();
    console.log('Data received:', { name, description, image, slug });

    // Check if the attribute exists
    const existingattribute = await db.attribute.findUnique({
      where: { id },
    });

    if (!existingattribute) {
      console.log('attribute not found');
      return NextResponse.json({ data: null, message: "attribute Not Found" }, { status: 404 });
    }

    // Update the attribute
    const updatedattribute = await db.attribute.update({
      where: { id },
      data: { name, description, image, slug  },
    });

    console.log('attribute updated:', updatedattribute);
    return NextResponse.json(updatedattribute);
  } catch (error) {
    console.error('Error updating attribute:', error);
    return NextResponse.json({ message: "Unable to Update attribute", error }, { status: 500 });
  }
}
