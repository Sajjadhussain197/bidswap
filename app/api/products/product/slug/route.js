import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    // Fetch product by slug
    const product = await db.product.findUnique({
      where: { slug }
    });
    
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error Fetching product:', error);
    return NextResponse.json({
      message: 'Unable to fetch product',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request, { params: { slug } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    const deleteProduct = await db.product.delete({
      where: {
        slug,
      },
    });

    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.error('Error deleting Product:', error);
    return NextResponse.json(
      {
        message: "Unable to Delete Product",
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { slug } }) {
  try {
    const { name, productprice, image, isActive } = await request.json();

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (!existingProduct) {
      return NextResponse.json({ data: null, message: "Product Not Found" }, { status: 404 });
    }

    const updatedProduct = await db.product.update({
      where: { slug },
      data: { name, productprice, image, isActive },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating Product:', error);
    return NextResponse.json({ 
      message: "Unable to Update Product", 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
