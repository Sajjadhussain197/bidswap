import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  console.log(session, "backend session")
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }
    const userId = session.user.id; // Assuming session.user.id contains the seller's ID
    console.log(userId, "seller id");
  try {

    const {
      name,
      productprice,
      saleprice,
      description,
      isActive,
      image,
      seller,
      isWholesale,
      sku,
      barcode,
      productCode,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
      categoryId,
      userId  // Add sellerId to the destructured request body
    } = await request.json();
    console.log(userId, "seller id")
    // Ensure numerical values are correctly parsed
    const parsedWholesaleQty = wholesaleQty ? parseInt(wholesaleQty, 10) : null;
    const parsedWholesalePrice = wholesalePrice ? parseFloat(wholesalePrice) : null;
    const parsedProductPrice = parseFloat(productprice);
    const parsedSalePrice = parseFloat(saleprice);
    const parsedProductStock = productStock ? parseInt(productStock, 10) : null;
    const parsedQty = qty ? parseInt(qty, 10) : null;

    // Check if the product name already exists
    const existingProduct = await db.product.findUnique({ where: { name } });

    if (existingProduct) {
      return NextResponse.json(
        { message: 'A product with this name already exists.' },
        { status: 400 }
      );
    }

    // Create the product and link it to the category and seller
    const newProduct = await db.product.create({
      data: {
        name,
        productprice: parsedProductPrice,
        saleprice: parsedSalePrice,
        description,
        isActive,
        image,
        isWholesale,
        sku,
        barcode,
        productCode,
        unit,
        wholesalePrice: parsedWholesalePrice,
        wholesaleQty: parsedWholesaleQty,
        productStock: parsedProductStock,
        qty: parsedQty,
        category: {
          connect: { id: categoryId }
        },seller: {
      connect: { id: userId } // Connect the seller (User) by its ID
    }
      }
    });

    console.log('Created new product:', newProduct);

    return NextResponse.json(newProduct);

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Unable to create Product', error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("Fetching products from product route GET");
    const products = await db.product.findMany();
    
    return NextResponse.json(products);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Unable to fetch Products', error },
      { status: 500 }
    );
  }
}
