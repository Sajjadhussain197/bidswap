
import UpdateProductForm from '@/app/components/formInputs/UpdateProductForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateProduct({params:{id}}) {
  const product = await getData(`products/product/${id}`);
  console.log(product);
  return (
    <div>
      <UpdateProductForm  linktitle="Update Product"
       heading="Update Product "
      updateData={product} />
    </div>
  )
}