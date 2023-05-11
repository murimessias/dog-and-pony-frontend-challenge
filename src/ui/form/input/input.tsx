'use client'
import { forwardRef, InputHTMLAttributes } from 'react'

import * as Label from '@radix-ui/react-label'
import clsx from 'clsx'

import { Icon } from '@/ui/media'

type InputStatus = 'default' | 'error'

type InputProps = {
  helperText?: string
  label?: string
  name: string
  status?: InputStatus
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ helperText, label, name, status = 'default', ...props }, forwardRef) => {
    return (
      <div className='relative flex flex-col gap-0.5 pb-2 text-primary-dark-blue'>
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
              'text-primary-dark-blue outline-primary-grey',
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
            <span className='text-accent-red'>
              <Icon as='warn' />
            </span>
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
