import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related products
    const product = await db.product.findUnique({
      where: { id }
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




export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 400 }
      );
    }
    const deleteProduct = await db.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete Product",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, productprice , image, isActive } = await request.json();
    console.log('Data received:', { name, productprice , image, isActive });

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      console.log('Product not found');
      return NextResponse.json({ data: null, message: "Product Not Found" }, { status: 404 });
    }


    const updatedProduct = await db.product.update({
      where: { id },
      data: { name, productprice , image, isActive },
    });

    console.log('Product updated:', updatedProduct);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating Product:', error);
    return NextResponse.json({ message: "Unable to Update Product", error }, { status: 500 });
  }
}



