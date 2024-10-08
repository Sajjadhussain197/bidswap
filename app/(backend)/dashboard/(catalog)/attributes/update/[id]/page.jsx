
import UpdateAttributeForm from '@/app/components/formInputs/updateAttributeForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateCategory({params:{id}}) {
  const attribute = await getData(`attributes/${id}`);
  console.log(attribute);
  return (
    <div>
      <UpdateAttributeForm  linktitle="Update Attribute"
       heading="Update Attribute "
      updateData={attribute} />
    </div>
  )
}