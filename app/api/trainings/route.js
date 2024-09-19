import { NextResponse } from "next/server";
import React from "react";
import db from "../../../lib/db";

export async function POST(request) {
  try {
    const { name, category, description, slug, content , image} = await request.json();
    //Check if this training already exist
    // const existingTraining = await db.training.findUnique({
    //     where:{
    //         slug,
    //     },
    // })
    // if(existingTraining){
    //     return NextResponse.json({
    //         data:null,
    //         message: "Training With name already exists"
    //     },
    //     {
    //         status: 409
    //     }
    // )
    // }
    const newTraining = await db.training.create({
      data: { name, category, description, slug, content, image },
    });
    console.log('database');
    return NextResponse.json(newTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to create Training",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET() {
    try {
      const trainings = await db.training.findMany();
      return NextResponse.json(trainings);
  
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Unable to fetch Trainings', error },
        { status: 500 }
      );
    }
  }


