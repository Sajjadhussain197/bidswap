import { NextResponse } from 'next/server';
import React from 'react'
import db from '@/lib/db';



export async function GET(request, {params: {id}}) {
    try {
        const seller = await db.user.findUnique({
            where: {
                id,
                role : 'USER'
            }
        });
        return NextResponse.json(seller);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Unable to fetch user', error
        },{status:500})
    }
    }


