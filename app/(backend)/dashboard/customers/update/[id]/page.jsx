
import UpdateCustomerForm from '@/app/components/formInputs/updateCustomerForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateSeller({params:{id}}) {
  const seller = await getData(`sellers/update/${id}`);
  console.log(seller, "data in main customer ");
  return (
    <div>
      <UpdateCustomerForm  linktitle="Update  Customer"
       heading="Update Customer "
      updateData={seller} />
      
    </div>
  )
}