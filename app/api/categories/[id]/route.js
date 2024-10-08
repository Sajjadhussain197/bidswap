import db from "@/lib/db";import { NextResponse } from 'next/server'; // Ensure you import NextResponse

export async function GET(request, { params }) {
  const identifier = params.id; // This could be either an ID or a slug
  let category;

  try {
    // Check if the identifier is in ObjectID format (or whatever format your IDs are)
    if (isValidObjectId(identifier)) {
      // If it's a valid ID, search by ID
      category = await db.category.findUnique({
        where: { id: identifier },
        include: { products: true }
      });
    } else {
      // If it's not an ID, search by name, description, or slug
      category = await db.category.findMany({
        where: {
          OR: [
            { name: { contains: identifier, mode: 'insensitive' } },
            { description: { contains: identifier, mode: 'insensitive' } },
            { slug: { contains: identifier, mode: 'insensitive' } },
          ],
        },
        include: { products: true }
      });
    }

    // Check if category is found
    if (!category || (Array.isArray(category) && category.length === 0)) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    // Return category data in JSON format
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ message: 'Unable to fetch category' }, { status: 500 });
  }
}

// Helper function to validate ObjectID format (if using MongoDB)
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id); // Example for MongoDB ObjectID
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