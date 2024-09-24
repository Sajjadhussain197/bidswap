import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
    console.log("in slug route")
  try {
    // Fetch category by slug with related products
    const category = await db.category.findUnique({
      where: { slug },
      include: { products: true } // Include associated products
    });
    
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error Fetching category by slug:', error);
    return NextResponse.json({
      message: 'Unable to fetch category by slug',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
