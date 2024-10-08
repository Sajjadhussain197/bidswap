import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch category with related staffs
    const staff = await db.staff.findUnique({
      where: { id }
    });
    
    if (!staff) {
      return NextResponse.json(
        { message: 'staff not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(staff);
  } catch (error) {
    console.error('Error Fetching staff:', error);
    return NextResponse.json({
      message: 'Unable to fetch staff',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}




export async function DELETE(request, { params: { id } }) {
  try {
    const existingstaff = await db.staff.findUnique({
      where: {
        id,
      },
    });
    if (!existingstaff) {
      return NextResponse.json(
        {
          data: null,
          message: "staff Not Found",
        },
        { status: 400 }
      );
    }
    const deletestaff = await db.staff.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletestaff);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete staff",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, contactno , image, isActive } = await request.json();
    console.log('Data received:', { name, contactno , image, isActive });

    const existingstaff = await db.staff.findUnique({
      where: { id },
    });

    if (!existingstaff) {
      console.log('staff not found');
      return NextResponse.json({ data: null, message: "staff Not Found" }, { status: 404 });
    }


    const updatedstaff = await db.staff.update({
      where: { id },
      data: { name, contactno , image, isActive },
    });

    console.log('staff updated:', updatedstaff);
    return NextResponse.json(updatedstaff);
  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json({ message: "Unable to Update staff", error }, { status: 500 });
  }
}



