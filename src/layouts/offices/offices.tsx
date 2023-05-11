import { faker } from '@faker-js/faker'

import { OfficeList } from '@/shared/office'
import { ExternalLink } from '@/ui/navigation'
import { Toast, ToastProvider } from '@/ui/overlay'

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
    <ToastProvider>
      <Toast />
      <main className='mx-auto flex min-h-screen w-full max-w-[320px] flex-col justify-center py-12'>
        <header className='pb-6'>
          <h1 className='text-center text-[4rem] font-light leading-none text-accent-blue'>
            Offices
          </h1>
        </header>
        <section className='py-6'>
          <OfficeList offices={data} />
        </section>
        <footer className='flex flex-col items-center gap-2'>
          <span className='block text-center'>
            This project is for test purpose only.
          </span>
          <ExternalLink
            className='text-center text-xs uppercase leading-none tracking-wide '
            href='https://www.dogandponystudios.com/'
          >
            www.dogandponystudios.com
          </ExternalLink>
        </footer>
      </main>
    </ToastProvider>
  )
}
