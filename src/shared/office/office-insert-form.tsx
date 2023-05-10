import { FormEvent, useState } from 'react'

import { faker } from '@faker-js/faker'
import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'

import { Button, Input } from '@/ui/form'

import { Office, OfficeWithoutId } from '@/types/office'

type OfficeInsertFormProps = {
  onSave: (v: Office) => void
}

const initialFormValues: OfficeWithoutId = {
  title: '',
  address: '',
  contact: {
    name: '',
    position: '',
    email: '',
    phone: '',
  },
}

export const OfficeInsertForm = ({ onSave }: OfficeInsertFormProps) => {
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave({ ...formValues, id: faker.datatype.uuid() })
    setFormValues(initialFormValues)
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6'>
        <Input
          label='Title'
          name='title'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              title: e,
            }))
          }
          required
          value={formValues.title}
        />
        <Input
          label='Enter the Address'
          name='address'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              address: e,
            }))
          }
          required
          value={formValues.address}
        />
      </div>
      <div>
        <h4 className='text-sm uppercase text-accent-blue'>
          Contact Information
        </h4>
        <RadixSeparatorPrimitive.Root
          decorative
          className='mt-4 bg-primary-light-grey data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
        />
      </div>
      <div className='flex flex-col gap-6'>
        <Input
          label='Full name'
          name='full-name'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, name: e },
            }))
          }
          required
          value={formValues.contact.name}
        />
        <Input
          label='Job Position'
          name='position'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, position: e },
            }))
          }
          required
          value={formValues.contact.position}
        />
        <Input
          label='Email address'
          name='email'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, email: e },
            }))
          }
          placeholder='name@example.com'
          required
          value={formValues.contact.email}
        />
        <Input
          label='Phone'
          name='phone'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, phone: e },
            }))
          }
          placeholder='(xxx) xxx-xxxx'
          required
          value={formValues.contact.phone}
        />
      </div>
      <Button type='submit'>Save</Button>
    </form>
  )
}
