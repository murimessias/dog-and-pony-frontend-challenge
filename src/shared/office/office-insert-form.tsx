import { zodResolver } from '@hookform/resolvers/zod'
import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'
import { Controller, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { Button, Input } from '@/ui/form'

import { formatToPhone } from '@/utils/formatters'

import { Office, OfficeWithoutId } from '@/types/office'

type OfficeInsertFormProps = {
  onInsert: (v: Office) => void
}

// Messages
const EMPTY_ERROR_MESSAGE = 'This field cannot be empty'
const EMAIL_ERROR_MESSAGE = 'Please, provide a valid email'
const PHONE_ERROR_MESSAGE = 'Please, provide a valid phone number'

// Regex
const PHONE_PATTERN = /^\(\d{3}\)\s\d{3}[-]\d{4}/g

const insertFormShape = z.object({
  title: z.string().min(1, {
    message: EMPTY_ERROR_MESSAGE,
  }),
  address: z.string().min(1, {
    message: EMPTY_ERROR_MESSAGE,
  }),
  contact: z.object({
    name: z.string().min(1, {
      message: EMPTY_ERROR_MESSAGE,
    }),
    position: z.string().min(1, {
      message: EMPTY_ERROR_MESSAGE,
    }),
    email: z
      .string()
      .min(1, { message: EMPTY_ERROR_MESSAGE })
      .email({ message: EMAIL_ERROR_MESSAGE }),
    phone: z
      .string()
      .min(1, { message: EMPTY_ERROR_MESSAGE })
      .regex(PHONE_PATTERN, { message: PHONE_ERROR_MESSAGE }),
  }),
})

const initialFormValues: OfficeWithoutId = {
  title: '',
  address: '',
  contact: { name: '', position: '', email: '', phone: '' },
}

export const OfficeInsertForm = ({ onInsert }: OfficeInsertFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: initialFormValues,
    resolver: zodResolver(insertFormShape),
  })

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={handleSubmit((d) => onInsert({ ...d, id: uuid() }))}
    >
      <div className='flex flex-col gap-6'>
        <Input
          helperText={errors.title?.message}
          label='Title'
          status={errors.title && 'error'}
          {...register('title')}
        />
        <Input
          helperText={errors.address?.message}
          label='Enter the Address'
          status={errors.address && 'error'}
          {...register('address')}
        />
      </div>
      <div>
        <h4 className='text-xs uppercase text-accent-blue'>
          Contact Information
        </h4>
        <RadixSeparatorPrimitive.Root
          decorative
          className='mt-4 bg-primary-light-grey data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
        />
      </div>
      <div className='flex flex-col gap-6'>
        <Input
          helperText={errors.contact?.name?.message}
          label='Full name'
          status={errors.contact?.name && 'error'}
          {...register('contact.name')}
        />
        <Input
          helperText={errors.contact?.position?.message}
          label='Job Position'
          status={errors.contact?.position && 'error'}
          {...register('contact.position')}
        />
        <Input
          helperText={errors.contact?.email?.message}
          label='Email address'
          status={errors.contact?.email && 'error'}
          {...register('contact.email')}
        />
        <Controller
          name='contact.phone'
          control={control}
          render={({ field }) => (
            <Input
              helperText={errors.contact?.phone?.message}
              label='Phone'
              maxLength={14}
              status={errors.contact?.phone && 'error'}
              {...field}
              onChange={(e) => {
                const value = e.currentTarget.value
                field.onChange(formatToPhone(value))
              }}
              value={field.value}
            />
          )}
        />
      </div>
      <Button type='submit'>Save</Button>
    </form>
  )
}
