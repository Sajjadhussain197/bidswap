
import UpdateCommunityForm from '@/app/components/formInputs/updateCommunityForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateCommunity({params:{id}}) {
  const community = await getData(`trainings/${id}`);
  console.log(community);
  return (
    <div>
      <UpdateCommunityForm linktitle="Update Community"
       heading="Update Community "
      updateData={community} />
    </div>
  )
}