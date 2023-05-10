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

const data = [
  createFakeData(),
  createFakeData(),
  createFakeData(),
  createFakeData(),
]

export const OfficesLayout = () => {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-[320px] flex-col justify-center py-12'>
      <header className='pb-6'>
        <h1 className='text-center text-[4rem] font-light leading-none text-accent-blue'>
          Offices
        </h1>
      </header>
      <section className='py-6'>
        <OfficeList offices={data} />
      </section>
      <footer className='flex flex-col gap-2 text-center'>
        <span className='block'>This project is for test purpose only.</span>
        <a
          className='text-sm uppercase leading-none tracking-wide text-accent-blue'
          href='https://www.dogandponystudios.com'
          rel='noopener noreferrer'
          target='_blank'
        >
          www.dogandponystudios.com
        </a>
      </footer>
    </main>
  )
}
