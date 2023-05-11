import { zodResolver } from '@hookform/resolvers/zod'
import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'
import { Controller, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { Button, Input } from '@/ui/form'

import { formatToPhone } from '@/utils/formatters'

import { Office, OfficeWithoutId } from '@/types/office'

import { hasValidationError, officeFormShape } from './office-constants'

const initialFormValues: OfficeWithoutId = {
  title: '',
  address: '',
  contact: { name: '', position: '', email: '', phone: '' },
}

type OfficeInsertFormProps = {
  onInsert: (v: Office) => void
}

export const OfficeInsertForm = ({ onInsert }: OfficeInsertFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: initialFormValues,
    resolver: zodResolver(officeFormShape),
  })

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={handleSubmit((d) => onInsert({ ...d, id: uuid() }))}
    >
      <div className='flex flex-col gap-6'>
        <Input
          aria-invalid={errors.title ? 'true' : 'false'}
          helperText={errors.title?.message}
          label='Title'
          required
          status={errors.title && 'error'}
          {...register('title')}
        />
        <Input
          aria-invalid={errors.address ? 'true' : 'false'}
          helperText={errors.address?.message}
          label='Enter the address'
          required
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
          aria-invalid={errors.contact?.name ? 'true' : 'false'}
          helperText={errors.contact?.name?.message}
          label='Full name'
          required
          status={errors.contact?.name && 'error'}
          {...register('contact.name')}
        />
        <Input
          aria-invalid={errors.contact?.position ? 'true' : 'false'}
          helperText={errors.contact?.position?.message}
          label='Job Position'
          required
          status={errors.contact?.position && 'error'}
          {...register('contact.position')}
        />
        <Input
          aria-invalid={errors.contact?.email ? 'true' : 'false'}
          helperText={errors.contact?.email?.message}
          label='Email address'
          placeholder='name@example.com'
          required
          status={errors.contact?.email && 'error'}
          {...register('contact.email')}
        />
        <Controller
          name='contact.phone'
          control={control}
          render={({ field }) => (
            <Input
              aria-invalid={errors.contact?.phone ? 'true' : 'false'}
              helperText={errors.contact?.phone?.message}
              label='Phone'
              placeholder='(xxx) xxx-xxxx'
              maxLength={14}
              required
              status={errors.contact?.phone && 'error'}
              {...field}
              onChange={(e) => {
                const value = e.currentTarget.value
                const formattedValueAsPhone = formatToPhone(value)
                field.onChange(formattedValueAsPhone)
              }}
              value={field.value}
            />
          )}
        />
      </div>
      <Button disabled={hasValidationError(errors)} type='submit'>
        Save
      </Button>
    </form>
  )
}
