import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related products

    const category = await db.category.findUnique({
      where: { id },
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
    console.error('Error Fetching category:', error);
    return NextResponse.json({
      message: 'Unable to fetch category',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}




export async function DELETE(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category Not Found",
        },
        { status: 400 }
      );
    }
    const deleteCategory = await db.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete Category",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, description, image, slug } = await request.json();
    console.log('Data received:', { name, description, image, slug });

    // Check if the category exists
    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      console.log('Category not found');
      return NextResponse.json({ data: null, message: "Category Not Found" }, { status: 404 });
    }

    // Update the category
    const updatedCategory = await db.category.update({
      where: { id },
      data: { name, description, image, slug },
    });

    console.log('Category updated:', updatedCategory);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ message: "Unable to Update Category", error }, { status: 500 });
  }
}



