
import UpdateSellerForm from '@/app/components/formInputs/updateSellerForm';
import UpdateStaffForm from '@/app/components/formInputs/updateStaffForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateStaff({params:{id}}) {
  const seller = await getData(`sellers/${id}`);
  console.log(seller);
  return (
    <div>
      <UpdateSellerForm linktitle="Update Seller"
       heading="UpdateSellerForm"
      updateData={seller} />
    </div>
  )
}