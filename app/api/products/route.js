import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';


export async function POST(request) {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  console.log(body, "backend request data")
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
      bartingInput,
      serviceTypeId,
      userId  // Add sellerId to the destructured request body
    } = body;
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
        },
        serviceType:{
        connect: { id: serviceTypeId }
      },
        seller: {
      connect: { id: userId } // Connect the seller (User) by its ID
    }
      }
    });

    console.log('Created new product:', newProduct);

    const serviceType = await db.ServiceType.findUnique({
      where: { id: serviceTypeId }
    });

    if (serviceType && serviceType.name === "BIDDING") {
      // Set a default bid amount, e.g., equal to the product price
      const defaultBidAmount = parsedProductPrice; // Use the product price as the bid amount

      // Calculate expiration date for the bid
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (1)); // Add the number of days to today

      // Create the bid data
      const newBid = await db.Bid.create({
        data: {
          productId: newProduct.id, // Reference to the created product
          userId: userId, // Reference to the seller
          amount: defaultBidAmount, // Default bid amount based on product price
          expiresAt: expiresAt // Expiry date for the bid
        }
      });

      console.log('Created new bid:', newBid);
     
      return NextResponse.json({ product: newProduct, bid: newBid , barter:newBarter});
    }else if(serviceType && serviceType.name === "BARTING"){
      console.log("we are in barting ")
      const newBarter = await db.Barter.create({
        data: {
          productId: newProduct.id, // Reference to the created product
          userId: userId, // Reference to the seller
          prductExchange: bartingInput, // Specify any exchange type or details here
        }
      });

      console.log('Created new barter:', newBarter);
    }

    // If the service type is not "BIDDING", return just the product
    return NextResponse.json({ product: newProduct });


    // return NextResponse.json(newProduct);

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Unable to create Product', error },
      { status: 500 }
    );
  }
}







// export async function POST(request) {
//   const session = await getServerSession(authOptions);
//   console.log(session, "backend session")
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//     // Check if the user is authenticated
//     if (!session || !session.user) {
//       return NextResponse.json(
//         { message: 'User not authenticated' },
//         { status: 401 }
//       );
//     }
//     const userId = session.user.id; // Assuming session.user.id contains the seller's ID
//     console.log(userId, "seller id");
//   try {

//     const {
//       name,
//       productprice,
//       saleprice,
//       description,
//       isActive,
//       image,
//       seller,
//       isWholesale,
//       sku,
//       barcode,
//       productCode,
//       unit,
//       wholesalePrice,
//       wholesaleQty,
//       productStock,
//       qty,
//       categoryId,
//       userId  // Add sellerId to the destructured request body
//     } = await request.json();
//     console.log(userId, "seller id")
//     // Ensure numerical values are correctly parsed
//     const parsedWholesaleQty = wholesaleQty ? parseInt(wholesaleQty, 10) : null;
//     const parsedWholesalePrice = wholesalePrice ? parseFloat(wholesalePrice) : null;
//     const parsedProductPrice = parseFloat(productprice);
//     const parsedSalePrice = parseFloat(saleprice);
//     const parsedProductStock = productStock ? parseInt(productStock, 10) : null;
//     const parsedQty = qty ? parseInt(qty, 10) : null;

//     // Check if the product name already exists
//     const existingProduct = await db.product.findUnique({ where: { name } });

//     if (existingProduct) {
//       return NextResponse.json(
//         { message: 'A product with this name already exists.' },
//         { status: 400 }
//       );
//     }

//     // Create the product and link it to the category and seller
//     const newProduct = await db.product.create({
//       data: {
//         name,
//         productprice: parsedProductPrice,
//         saleprice: parsedSalePrice,
//         description,
//         isActive,
//         image,
//         isWholesale,
//         sku,
//         barcode,
//         productCode,
//         unit,
//         wholesalePrice: parsedWholesalePrice,
//         wholesaleQty: parsedWholesaleQty,
//         productStock: parsedProductStock,
//         qty: parsedQty,
//         category: {
//           connect: { id: categoryId }
//         },seller: {
//       connect: { id: userId } // Connect the seller (User) by its ID
//     }
//       }
//     });

//     console.log('Created new product:', newProduct);

//     return NextResponse.json(newProduct);

//   } catch (error) {
//     console.error('Error creating product:', error);
//     return NextResponse.json(
//       { message: 'Unable to create Product', error },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    console.log("Fetching products from product route GET");
    // const products = await db.product.findMany();
    const productData = await db.product.findMany({
      include: {
        serviceType: {
          select: {
            name: true, // Fetch the 'name' field from the related serviceType schema
          },
        },
      },
    });
    
    // Map the data to include 'servicetypename' alias
    const dataWithServiceType = productData.map((product) => ({
      ...product,
      servicetypename: product.serviceType?.name || "No Service Type", // Alias the name field as servicetypename
    }));
    
    
    return NextResponse.json(dataWithServiceType);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Unable to fetch Products', error },
      { status: 500 }
    );
  }
}
