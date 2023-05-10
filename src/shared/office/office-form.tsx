import { useState } from 'react'

import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'

import { Button, Input } from '@/ui/form'

import { Office } from '@/types/office'

type OfficeEditFormProps = {
  office: Office
  onSave: (v: Office) => void
}

export const OfficeEditForm = ({ office, onSave }: OfficeEditFormProps) => {
  const [formValues, setFormValues] = useState<Office>(office)

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={(e) => {
        e.preventDefault()
        onSave(formValues)
      }}
    >
      <div className='flex flex-col gap-6'>
        <Input
          initialValue={formValues.title}
          label='Title'
          name='title'
          onInputChange={(e) => setFormValues((v) => ({ ...v, title: e }))}
          required
          value={formValues.title}
        />
        <Input
          initialValue={formValues.address}
          label='Enter the Address'
          name='address'
          onInputChange={(e) => setFormValues((v) => ({ ...v, address: e }))}
          required
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
          initialValue={formValues.contact.name}
          label='Full name'
          name='full-name'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, name: e },
            }))
          }
          required
        />
        <Input
          initialValue={formValues.contact.position}
          label='Job Position'
          name='position'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, position: e },
            }))
          }
          required
        />
        <Input
          initialValue={formValues.contact.email}
          label='Email address'
          name='email'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, email: e },
            }))
          }
          required
        />
        <Input
          initialValue={formValues.contact.phone}
          label='Phone'
          name='phone'
          onInputChange={(e) =>
            setFormValues((v) => ({
              ...v,
              contact: { ...v.contact, phone: e },
            }))
          }
          required
        />
      </div>
      <Button type='submit'>Save</Button>
    </form>
  )
}
