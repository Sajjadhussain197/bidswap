
import Heading from '@/app/components/backend/Heading';
import PageHeader from '@/app/components/backend/pageHeader';
import Update from '@/app/components/formInputs/Update';
import UpdateCategoryForm from '@/app/components/formInputs/UpdateCategoryForm'
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateCategory({params:{id}}) {
  const category = await getData(`categories/${id}`);
  console.log(category);
  return (
    <div>
      <UpdateCategoryForm  linktitle="Update Category"
       heading="Update Category "
      updateData={category} />
    </div>
  )
}