import { NextResponse } from 'next/server';
import db from '../../../../lib/db'

export async function GET(request) {
  
    console.log("in main route")
      try {
        const categories = await db.category.findMany({
          include: {
            products: {
              where: {
                serviceType: {
                  is: {
                    name: "SELLING", // Use the actual field name from ServiceType model, e.g., `name`
                  },
                },
              },
              include: {
                serviceType: true, // Include serviceType details for confirmation if needed
              },
            },
          },
        });
        
       
       return NextResponse.json(categories);
       
       
      } catch (error) {
        console.error('Error Fetching category:', error);
        return NextResponse.json({
          message: 'Unable to fetch category',
          error: error.message || 'Unknown error'
        }, { status: 500 });
      }
    }
    