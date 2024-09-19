import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related trainings
    const training = await db.training.findUnique({
      where: { id }
    });
    
    if (!training) {
      return NextResponse.json(
        { message: 'training not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(training);
  } catch (error) {
    console.error('Error Fetching training:', error);
    return NextResponse.json({
      message: 'Unable to fetch training',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}




export async function DELETE(request, { params: { id } }) {
  try {
    const existingtraining = await db.training.findUnique({
      where: {
        id,
      },
    });
    if (!existingtraining) {
      return NextResponse.json(
        {
          data: null,
          message: "training Not Found",
        },
        { status: 400 }
      );
    }
    const deletetraining = await db.training.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletetraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete training",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, description , image, slug  } = await request.json();
    console.log('Data received:', { name, description , image, slug });

    const existingtraining = await db.training.findUnique({
      where: { id },
    });

    if (!existingtraining) {
      console.log('training not found');
      return NextResponse.json({ data: null, message: "training Not Found" }, { status: 404 });
    }


    const updatedtraining = await db.training.update({
      where: { id },
      data: { name, description , image, slug  },
    });

    console.log('training updated:', updatedtraining);
    return NextResponse.json(updatedtraining);
  } catch (error) {
    console.error('Error updating training:', error);
    return NextResponse.json({ message: "Unable to Update training", error }, { status: 500 });
  }
}



