import { ComponentProps, forwardRef } from 'react'

import clsx from 'clsx'

type IconButtonProps = {
  children: React.ReactNode
  size?: 'sm' | 'base'
  variant?: 'primary' | 'neutral' | 'attention'
} & ComponentProps<'button'>

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, children, size = 'base', variant = 'primary', ...props },
    forwardRef,
  ) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center rounded outline-none transition-colors disabled:cursor-not-allowed disabled:bg-primary-grey disabled:text-white',
          size === 'base' && 'h-8 w-8 p-0.5',
          size === 'sm' && 'h-6 w-6 p-0.5',
          variant === 'attention' &&
            'text-accent-red hover:ring-2 hover:ring-accent-red hover:ring-offset-1 focus:ring-2 focus:ring-accent-red focus:ring-offset-2 disabled:uppercase',
          variant === 'neutral' &&
            'text-primary-grey hover:ring-2 hover:ring-primary-grey hover:ring-offset-1 focus:ring-2 focus:ring-primary-grey focus:ring-offset-2 disabled:uppercase',
          variant === 'primary' &&
            'bg-accent-blue text-white hover:bg-primary-dark-blue focus:ring-2 focus:ring-accent-blue focus:ring-offset-2',
          className,
        )}
        {...props}
        ref={forwardRef}
      >
        <span className='sr-only'>Icon</span>
        {children}
      </button>
    )
  },
)

// Display Names
IconButton.displayName = 'Button'
