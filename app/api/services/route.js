import { NextResponse } from 'next/server';
import db from '../../../lib/db'

export async function GET(request) {
  
    console.log("in Service route")
      try {
       const service = await db.ServiceType.findMany({
        include:{
          products:true
        }
       });
       return NextResponse.json(service);
       
       
      } catch (error) {
        console.error('Error Fetching category:', error);
        return NextResponse.json({
          message: 'Unable to fetch serviceType',
          error: error.message || 'Unknown error'
        }, { status: 500 });
      }
    }


export async function POST(request) {
    try {
      const {
        name,
        description,
        image,
        slug,
        products // Array of product data to create
      } = await request.json();
      // Create the category with associated products
      const newCategory = await db.category.create({
        data: {
          name,
          description,
          image,
          slug,
          products: {
            create: products // Create products and link them to the category
          }
        },
        include: {
          products: true // Include related products in the response
        }
      });
  
      console.log('Created new category with products:', newCategory);
      return NextResponse.json(newCategory);
  
    } catch (error) {
      console.error('Error creating category:', error);
      return NextResponse.json({
        message: 'Unable to create Category',
        error: error.message
      }, { status: 500 });
    }
  }


  
