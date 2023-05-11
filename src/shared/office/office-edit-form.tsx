import { zodResolver } from '@hookform/resolvers/zod'
import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input } from '@/ui/form'

import { formatToPhone } from '@/utils/formatters'

import { Office } from '@/types/office'

import { hasValidationError, officeFormShape } from './office-constants'

type OfficeEditFormProps = {
  office: Office
  onEdit: (v: Office) => void
}

export const OfficeEditForm = ({ office, onEdit }: OfficeEditFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: office,
    resolver: zodResolver(officeFormShape),
  })

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onEdit)}>
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
