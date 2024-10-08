import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request, {params : {id}}) {
try {
    const existingCoupon = await db.coupon.findUnique({
        where:{
            id,
        }
    });
    if (!existingCoupon){
        return NextResponse.json({
            data:null,
            message : "Coupon Not Found"
        },
        {status:400}
    );
       
    }
    const deleteCoupon = await db.coupon.delete({
        where:{
            id,
        }
    })

    return NextResponse.json(deleteCoupon);

} catch (error) {
    console.log(error);
    return NextResponse.json({
        message: 'Unable to Delete Coupon', error
    },{status:500})
}
}




