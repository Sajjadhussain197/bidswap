
import UpdateMarketForm from '@/app/components/formInputs/UpdateMarketForm';
import UpdateAttributeForm from '@/app/components/formInputs/updateAttributeForm';
import { getData } from '@/lib/getData'
import React from 'react'

export default async function UpdateMarket({params:{id}}) {
  const market = await getData(`markets/${id}`);
  console.log(market);
  return (
    <div>
      <UpdateMarketForm linktitle="Update Market"
       heading="Update Market "
      updateData={market} />
    </div>
  )
}