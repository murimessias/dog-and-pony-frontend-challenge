'use client'
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react'

import * as Label from '@radix-ui/react-label'
import clsx from 'clsx'

import { Icon } from '@/ui/media'

type InputStatus = 'default' | 'error'

type InputProps = {
  initialValue?: string
  helperText?: string
  label?: string
  name: string
  onInputChange?: (value: string) => void
  status?: InputStatus
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      helperText,
      initialValue = '',
      label,
      name,
      onInputChange,
      status = 'default',
      ...props
    },
    forwardRef,
  ) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value
      setValue(newValue)
      !!onInputChange && onInputChange(newValue)
    }

    return (
      <div className='flex flex-col gap-0.5 text-primary-dark-blue'>
        {!!label && (
          <Label.Root
            className='inline-flex cursor-pointer gap-1 text-base text-primary-dark-blue'
            htmlFor={name}
          >
            {label}
            {props.required && <span className='text-primary-grey'>*</span>}
          </Label.Root>
        )}
        <div
          className={clsx(
            'flex min-h-[2.5rem] items-center rounded bg-white px-3 shadow-micro outline outline-2 transition focus-within:outline-accent-blue',
            props.disabled &&
              'cursor-not-allowed text-primary-grey outline-primary-grey',
            status === 'error' && 'text-accent-red outline-accent-red',
            status === 'default' &&
              'text-primary-dark-blue outline-primary-dark-blue',
          )}
        >
          <input
            className={clsx(
              'w-full leading-none text-primary-dark-blue outline-none placeholder:text-primary-grey',
              props.disabled && 'cursor-not-allowed text-primary-grey',
            )}
            name={name}
            onChange={onChange}
            ref={forwardRef}
            type='text'
            value={value}
            {...(label ? { id: name } : {})}
            {...props}
          />
          {status === 'error' && <Icon as='warn' />}
        </div>
        {!!helperText && (
          <small
            className={clsx(
              'relative -bottom-1 text-sm',
              status === 'error' && 'text-accent-red',
            )}
          >
            {helperText}
          </small>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
