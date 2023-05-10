import { v4 as uuid } from 'uuid'

import { OfficeList } from '@/shared/office'

import { OfficeList as OfficeListType } from '@/types/office'

const data: OfficeListType = [
  {
    id: uuid(),
    title: 'Office 1',
    address: 'office-address',
    contact: {
      name: 'Office Contact Name',
      position: 'Office Position',
      email: 'office@email.com',
      phone: '(303) 444-5551',
    },
  },
  {
    id: uuid(),
    title: 'Office 2',
    address: 'office-address',
    contact: {
      name: 'Office Contact Name',
      position: 'Office Position',
      email: 'office@email.com',
      phone: '(303) 444-5551',
    },
  },
  {
    id: uuid(),
    title: 'Office 3',
    address: 'office-address',
    contact: {
      name: 'Office Contact Name',
      position: 'Office Position',
      email: 'office@email.com',
      phone: '(303) 444-5551',
    },
  },
  {
    id: uuid(),
    title: 'Office 4',
    address: 'office-address',
    contact: {
      name: 'Office Contact Name',
      position: 'Office Position',
      email: 'office@email.com',
      phone: '(303) 444-5551',
    },
  },
  {
    id: uuid(),
    title: 'Office 5',
    address: 'office-address',
    contact: {
      name: 'Office Contact Name',
      position: 'Office Position',
      email: 'office@email.com',
      phone: '(303) 444-5551',
    },
  },
]

export default function Home() {
  return (
    <main className='mx-auto flex h-screen w-full max-w-[320px] flex-col justify-center'>
      <OfficeList offices={data} />
    </main>
  )
}
