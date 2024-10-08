import { NextResponse } from 'next/server';
import React from 'react'
import db from '../../../lib/db'


export async function POST(request) {
try {
    const {name,link,image,slug} = await request.json();
    const newBanner = await db.banner.create({
        data: {name,link,image,slug}
    }); 
    console.log(newBanner);
    return NextResponse.json(newBanner);

} catch (error) {
    console.log(error);
    return NextResponse.json({
        message: 'Unable to create Banner', error
    },{status:500})
}
}

export async function GET() {
    try {

        const Banner = await db.banner.findMany();
        return NextResponse.json(Banner);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Unable to fetch Banner', error
        },{status:500})
    }
    }
