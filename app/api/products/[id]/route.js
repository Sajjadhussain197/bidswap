import db from "@/lib/db";
import { NextResponse } from "next/server";

import { ObjectId } from 'mongodb'; // Import ObjectId for validation


export async function GET(request, { params }) {
  const { id } = params; // Extract the product ID from params (if applicable)
  const url = new URL(request.url);
  console.log(url,"url from get product")
  const serviceTypeQuery = url.searchParams.get('serviceType'); // Extract serviceType query parameter
  console.log(serviceTypeQuery,"service type from product")
  const searchText = url.searchParams.get('query'); // Extract open search text (e.g., 'chairs', 'fancy chair')
  console.log(searchText,"search text type from product")
  const minprice = url.searchParams.get('minprice'); // Extract open search text (e.g., 'chairs', 'fancy chair')
  const maxprice = url.searchParams.get('maxprice'); // Extract open search text (e.g., 'chairs', 'fancy chair')
  console.log(minprice,"min",maxprice,"max")

  try {
    // Check if `id` is provided and if it's a valid ObjectId
    if (id && ObjectId.isValid(id)) {
      // Fetch a specific product by ID
      const product = await db.product.findUnique({
        where: { id },
        include: {
          category: true, // Include category details
          bids: true,     // Include bid details if they exist
          serviceType: true, // Include service type details
        }
      });

      if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }

      return NextResponse.json(product);

    } else if (serviceTypeQuery && serviceTypeQuery !== undefined) {
      // Search by serviceType
      console.log("service type query is fetching")
      const serviceType = await db.serviceType.findFirst({
        where: {
          name: { equals: serviceTypeQuery, mode: 'insensitive' } // Find service type by name
        }
      });
        console.log("fetched type",serviceType,searchText)
      if (serviceType) {
        // Fetch products by service type ID
        const products = await db.product.findMany({
          where: { serviceTypeId: serviceType.id },
          include: {
            category: true,
            bids: true,
            serviceType: true,
            barters: {
              select: {
                prductExchange: true,  // Select only the productExchange field
              }
            }
          }
        });

        if (products.length === 0) {
          return NextResponse.json({ message: 'No products found for the given service type' }, { status: 404 });
        }

        return NextResponse.json(products);
      }
       else {
        return NextResponse.json({ message: 'Service type not found' }, { status: 404 });
      }

    } else if (searchText && searchText.trim() !== "") {
      // Search by product name, description, or category
      console.log(searchText, "inside elseif ot saerch")
      const products = await db.product.findMany({
        where: {
          OR: [
            { name: { contains: searchText, mode: 'insensitive' } },
            { description: { contains: searchText, mode: 'insensitive' } },
            {
              category: {
                name: { contains: searchText, mode: 'insensitive' }
              }
            }
          ]
        },
        include: {
          category: true,
          bids: true,
          serviceType: true
        }
      });

      if (products.length === 0) {
        return NextResponse.json({ message: 'No products found for the search query' }, { status: 404 });
      }

      return NextResponse.json(products);

    }else if (minprice || maxprice) {
      // Convert prices to numbers for comparison
      const parsedMinPrice = minprice ? parseFloat(minprice) : 0;
      const parsedMaxPrice = maxprice ? parseFloat(maxprice) : Infinity;
  
      // Fetch products within the price range
      const products = await db.product.findMany({
        where: {
          saleprice: {
            gte: parsedMinPrice,
            lte: parsedMaxPrice,
          }
        },
        include: {
          category: true,
          bids: true,
          serviceType: true
        }
      });
  
      if (products.length === 0) {
        return NextResponse.json({ message: 'No products found within the price range' }, { status: 404 });
      }
  
      return NextResponse.json(products);
  
    // Search by serviceType
    } 
     else {
      // Fetch all products if no query is provided
      const products = await db.product.findMany({
        include: {
          category: true,
          bids: true,
          serviceType: true
        }
      });

      return NextResponse.json(products);
    }

  } catch (error) {
    console.error('Error Fetching product:', error);
    return NextResponse.json({
      message: 'Unable to fetch product',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}


// export async function GET(request, { params }) {
//   try {
//     // Fetch category with related products
//     const product = await db.product.findUnique({
//       where: { id }
//     });
    
//     if (!product) {
//       return NextResponse.json(
//         { message: 'Product not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error('Error Fetching product:', error);
//     return NextResponse.json({
//       message: 'Unable to fetch product',
//       error: error.message || 'Unknown error'
//     }, { status: 500 });
//   }
// }




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



