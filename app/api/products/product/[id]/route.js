import db from "@/lib/db";
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId for validation

export async function GET(request, { params }) {
  const { id } = params; // Extract the product ID from params (if applicable)
  const url = new URL(request.url);
  console.log(url,"url from get product")
  const serviceTypeQuery = url.searchParams.get('serviceType'); // Extract serviceType query parameter
  console.log(serviceTypeQuery,"service type from product")
  const searchText = url.searchParams.get('query'); // Extract open search text (e.g., 'chairs', 'fancy chair')

  try {
    // Check if `id` is provided and if it's a valid ObjectId
    // if (id && ObjectId.isValid(id)) {
    //   // Fetch a specific product by ID
    //   const product = await db.product.findUnique({
    //     where: { id },
    //     include: {
    //       category: true, // Include category details
    //       bids: true,     // Include bid details if they exist
    //       serviceType: true, // Include service type details
    //     }
    //   });

    //   if (!product) {
    //     return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    //   }

    //   return NextResponse.json(product);

    // } else if (serviceTypeQuery) {
    //   // Search by serviceType
    //   const serviceType = await db.serviceType.findFirst({
    //     where: {
    //       name: { equals: serviceTypeQuery, mode: 'insensitive' } // Find service type by name
    //     }
    //   });

    //   if (serviceType) {
    //     // Fetch products by service type ID
    //     const products = await db.product.findMany({
    //       where: { serviceTypeId: serviceType.id },
    //       include: {
    //         category: true,
    //         bids: true,
    //         serviceType: true
    //       }
    //     });

    //     if (products.length === 0) {
    //       return NextResponse.json({ message: 'No products found for the given service type' }, { status: 404 });
    //     }

    //     return NextResponse.json(products);
    //   } else {
    //     return NextResponse.json({ message: 'Service type not found' }, { status: 404 });
    //   }

    // } else if (searchText) {
    //   // Search by product name, description, or category
    //   const products = await db.product.findMany({
    //     where: {
    //       OR: [
    //         { name: { contains: searchText, mode: 'insensitive' } },
    //         { description: { contains: searchText, mode: 'insensitive' } },
    //         {
    //           category: {
    //             name: { contains: searchText, mode: 'insensitive' }
    //           }
    //         }
    //       ]
    //     },
    //     include: {
    //       category: true,
    //       bids: true,
    //       serviceType: true
    //     }
    //   });

    //   if (products.length === 0) {
    //     return NextResponse.json({ message: 'No products found for the search query' }, { status: 404 });
    //   }

    //   return NextResponse.json(products);

    // } else {
    //   // Fetch all products if no query is provided
    //   const products = await db.product.findMany({
    //     include: {
    //       category: true,
    //       bids: true,
    //       serviceType: true
    //     }
    //   });

    //   return NextResponse.json(products);
    // }

  } catch (error) {
    console.error('Error Fetching product:', error);
    return NextResponse.json({
      message: 'Unable to fetch product',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
