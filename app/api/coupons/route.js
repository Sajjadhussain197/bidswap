import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  
  try {
    const { name, code, date, isActive,  slug ,vendorId} = await request.json();
    console.log('Received data:', { name, code, date, slug ,isActive, vendorId});
    
    
    const dateobj = new Date(date);

    const newCoupon = await db.coupon.create({
      data: {
        isActive,
        name,
        code,
        date: dateobj,
        slug,
        vendorId,
      } 
    });
    console.log('Created coupon:', newCoupon);
    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json({
      message: 'Unable to create coupon',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}


export async function GET(request) {
  try {
   const coupons = await db.coupon.findMany();
   return NextResponse.json(coupons);
   
   
  } catch (error) {
    console.error('Error Fetching coupon:', error);
    return NextResponse.json({
      message: 'Unable to fetch coupon',
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
