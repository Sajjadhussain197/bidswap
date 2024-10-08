
import Heading from '@/app/components/backend/Heading';
import PageHeader from '@/app/components/backend/pageHeader';
import Update from '@/app/components/formInputs/Update';
import UpdateBannerForm from '@/app/components/formInputs/UpdateBannerForm';
import UpdateCategoryForm from '@/app/components/formInputs/UpdateCategoryForm'
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateCategory({params:{id}}) {
  const banner = await getData(`banners/${id}`);
  console.log(banner);
  return (
    <div>
      <UpdateBannerForm  linktitle="Update Banner"
       heading="Update Banner "
      updateData={banner} />
    </div>
  )
}