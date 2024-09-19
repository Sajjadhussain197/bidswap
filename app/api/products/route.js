import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
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
      categoryId
    } = await request.json();

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

    // Create the product and link it to the category
    const newProduct = await db.product.create({
      data: {
        name,
        productprice: parsedProductPrice,
        saleprice: parsedSalePrice,
        description,
        isActive,
        image,
        seller,
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
          connect: { id: categoryId } // Link product to category
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
