import { forwardRef, InputHTMLAttributes } from 'react'

import * as Label from '@radix-ui/react-label'
import clsx from 'clsx'

import { Icon } from '@/ui/media'

type InputStatus = 'default' | 'error'

type InputProps = {
  helperText?: string
  label?: string
  name: string
  required?: boolean
  status?: InputStatus
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { helperText, label, name, status = 'default', required, ...props },
    forwardRef,
  ) => {
    return (
      <div className='relative flex flex-col gap-1 pb-2 text-primary-dark-blue'>
        {!!label && (
          <Label.Root
            className='inline-flex cursor-pointer gap-1 self-start text-base text-primary-dark-blue'
            htmlFor={name}
          >
            {label}
            {required && <span className='text-primary-grey'>*</span>}
          </Label.Root>
        )}
        <div
          className={clsx(
            'flex min-h-[2.5rem] items-center rounded border-2 bg-white px-3 shadow-micro transition focus-within:border-accent-blue',
            props.disabled &&
              'cursor-not-allowed border-primary-grey text-primary-grey',
            status === 'error' && 'border-accent-red text-accent-red',
            status === 'default' &&
              'border-primary-grey text-primary-dark-blue',
          )}
        >
          <input
            className={clsx(
              'w-full leading-none text-primary-dark-blue outline-none placeholder:text-primary-grey',
              props.disabled && 'cursor-not-allowed text-primary-grey',
            )}
            name={name}
            ref={forwardRef}
            type='text'
            {...(label ? { id: name } : {})}
            {...props}
          />
          {status === 'error' && (
            <div className='inline-flex items-center justify-center text-accent-red'>
              <Icon as='warn' size='md' />
            </div>
          )}
        </div>
        {!!helperText && (
          <small
            className={clsx(
              'absolute -bottom-4 text-xs',
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
