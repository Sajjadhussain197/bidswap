import db from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET(request, { params: { id } }) {
  try {
    // Fetch banner with related products
    const banner = await db.banner.findUnique({
      where: { id },
      
    });
    
    if (!banner) {
      return NextResponse.json(
        { message: 'banner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error('Error Fetching banner:', error);
    return NextResponse.json({
      message: 'Unable to fetch banner',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}




export async function DELETE(request, { params: { id } }) {
  try {
    const existingBanner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "banner Not Found",
        },
        { status: 400 }
      );
    }
    const deleteBanner = await db.banner.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to Delete banner",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('PUT request received with ID:', id);
  try {
    const { name, link, image, slug } = await request.json();
    console.log('Data received:', { name, link, image, slug });

    // Check if the banner exists
    const existingBanner = await db.banner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      console.log('banner not found');
      return NextResponse.json({ data: null, message: "banner Not Found" }, { status: 404 });
    }

    // Update the banner
    const updatedBanner = await db.banner.update({
      where: { id },
      data: { name, link, image, slug  },
    });

    console.log('banner updated:', updatedBanner);
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ message: "Unable to Update banner", error }, { status: 500 });
  }
}



