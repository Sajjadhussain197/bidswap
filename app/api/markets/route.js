import { NextResponse } from 'next/server';
import React from 'react'
import db from '../../../lib/db'

export async function POST(request) {
try {
    const {name,description,categories,image,slug} = await request.json();
    
    const existingMarket = await db.market.findUnique({
        where:{
            slug,
        },
    })
    if(existingMarket){
        return NextResponse.json({
            data:null,
            message: "Market already exists"
        },
        {
            status: 409
        }
    )
    }
    const newMarket = await db.market.create({
        data: {name,description,categories,image,slug} 
    })
    console.log(newMarket);
    return NextResponse.json(newMarket);


} catch (error) {
    console.log(error);
    return NextResponse.json({
        message: 'Unable to create Market', error
    },{status:500})
}
}


export async function GET(request) {
    try {
        const market = await db.market.findMany();
        return NextResponse.json(market);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Unable to fetch Markets', error
        },{status:500})
    }
    }

