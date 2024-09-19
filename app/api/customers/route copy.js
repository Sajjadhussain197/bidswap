import Customers from "@/app/(backend)/dashboard/customers/page";
import db from "@/lib/db";
import { profile } from "console";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related sellers
    const customers= await db.user.findUnique({
      orderBy: {
        createdAt: "desc",
      },
       where: {
        role: "USER",
         },
         include: {
          profile :true, 
         }
    });
    
    if (!customers) {
      return NextResponse.json(
        { message: 'customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error Fetching customers:', error);
    return NextResponse.json({
      message: 'Unable to fetch customers',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}





