'use client'
import { ComponentProps, forwardRef } from 'react'

import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  fullWidth?: boolean
  leftAddon?: JSX.Element
  rightAddon?: JSX.Element
  size?: 'sm' | 'base'
  variant?: 'primary' | 'neutral' | 'attention'
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      fullWidth = false,
      leftAddon,
      rightAddon,
      size = 'base',
      variant = 'primary',
      ...props
    },
    forwardRef,
  ) => {
    return (
      <button
        className={clsx(
          'inline-flex w-fit min-w-[7ch] items-center justify-center gap-2 rounded  text-center font-normal outline-none transition-colors  disabled:cursor-not-allowed disabled:bg-primary-grey disabled:text-white',
          fullWidth && 'w-full',
          size === 'base' && 'min-h-[40px] px-4 py-2 text-base',
          size === 'sm' && 'p-0.5 text-xs leading-none tracking-[0.02em]',
          variant === 'attention' &&
            'uppercase  text-accent-red hover:ring-2 hover:ring-accent-red hover:ring-offset-1 focus:ring-2 focus:ring-accent-red focus:ring-offset-2 disabled:uppercase',
          variant === 'neutral' &&
            'uppercase text-primary-grey hover:ring-2 hover:ring-primary-grey hover:ring-offset-1 focus:ring-2 focus:ring-primary-grey focus:ring-offset-2 disabled:uppercase',
          variant === 'primary' &&
            'bg-accent-blue text-white hover:bg-primary-dark-blue focus:ring-2 focus:ring-accent-blue focus:ring-offset-2',
          className,
        )}
        {...props}
        ref={forwardRef}
      >
        {!!leftAddon && (
          <div className='flex items-center justify-center'>{leftAddon}</div>
        )}
        <div>{children}</div>
        {!!rightAddon && (
          <div className='flex items-center justify-center'>{rightAddon}</div>
        )}
      </button>
    )
  },
)

// Display Names
Button.displayName = 'Button'
