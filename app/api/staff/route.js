import { NextResponse } from 'next/server';
import React from 'react'
import db from '../../../lib/db'

export async function POST(request) {
try {
    const {name,contactno,email,date,isActive,image,parentCategory,slug} = await request.json();
    
    const dateobj = new Date(date);
    const newStaff = await db.staff.create({
        data : {name,contactno,email,date: dateobj,isActive,image,parentCategory,slug}
    });
    console.log(newStaff);
    return NextResponse.json(newStaff);

} catch (error) {
    console.log(error);
    return NextResponse.json({
        message: 'Unable to create Staff', error
    },{status:500})
}
}

export async function GET(request) {
    try {
        const Staff = await db.staff.findMany();
        return NextResponse.json(Staff);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Unable to fetch Staff', error
        },{status:500})
    }
    }
