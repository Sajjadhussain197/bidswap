import { NextResponse } from "next/server";
import db from "../../../lib/db";
import { Prisma } from "@prisma/client";
import { title } from "process";
import CartItem from "@/app/components/frontend/CartItem";


export async function GET(request) {
  try {
    const sales = await db.sale.findMany({
    orderBy:{
      createdAt: "desc",
    },
    include:{
      orderItems :true
    }

    });
    return NextResponse.json(sales);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Unable to fetch Sales', error: error.message },
      { status: 500 }
    );
  }
}
