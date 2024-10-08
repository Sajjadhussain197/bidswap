import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, description, image, slug } = await request.json();
    const newAttribute = await db.attribute.create({
      data: { name, description, image, slug }
    });
    console.log(newAttribute);
    return NextResponse.json(newAttribute);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Unable to create Attribute',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const attribute = await db.attribute.findMany();
    return NextResponse.json(attribute);
  } catch (error) {
    console.error('Error Fetching attribute:', error);
    return NextResponse.json({
      message: 'Unable to fetch attribute',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
