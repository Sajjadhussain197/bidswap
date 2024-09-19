
import UpdateStaffForm from '@/app/components/formInputs/updateStaffForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateStaff({params:{id}}) {
  const staff = await getData(`staff/${id}`);
  console.log(staff);
  return (
    <div>
      <UpdateStaffForm linktitle="Update Staff"
       heading="Update Staff "
      updateData={staff} />
    </div>
  )
}