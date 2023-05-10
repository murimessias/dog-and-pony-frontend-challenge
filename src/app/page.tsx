import { faker } from '@faker-js/faker'

import { OfficeList } from '@/shared/office'

const createFakeData = () => ({
  id: faker.datatype.uuid(),
  title: faker.company.name(),
  address: faker.address.streetAddress(),
  contact: {
    name: faker.name.fullName(),
    position: faker.name.jobTitle(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number('(###) ###-####'),
  },
})

const data = [createFakeData(), createFakeData(), createFakeData()]

export default function Home() {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-[320px] flex-col justify-center py-10'>
      <OfficeList offices={data} />
    </main>
  )
}
