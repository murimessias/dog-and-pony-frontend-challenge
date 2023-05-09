import { ComponentProps } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  fullWidth?: boolean
  leftAddon?: JSX.Element
  size?: 'sm' | 'base'
  variant?: 'primary' | 'neutral' | 'attention'
} & ComponentProps<'button'>

export const Button = ({
  children,
  fullWidth = false,
  leftAddon,
  size = 'base',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex min-h-[40px] w-fit min-w-[7ch] items-center justify-center gap-2 rounded px-4 py-2 text-center font-normal outline-none transition-colors  disabled:cursor-not-allowed disabled:bg-primary-grey disabled:text-white',
        fullWidth && 'w-full',
        size === 'base' && 'text-base',
        size === 'sm' && 'text-sm',
        variant === 'attention' &&
          'uppercase tracking-[0.02em] text-accent-red hover:ring-2 hover:ring-accent-red hover:ring-offset-1 focus:ring-2 focus:ring-accent-red focus:ring-offset-2 disabled:uppercase',
        variant === 'neutral' &&
          'uppercase tracking-[0.02em] text-primary-grey hover:ring-2 hover:ring-primary-grey hover:ring-offset-1 focus:ring-2 focus:ring-primary-grey focus:ring-offset-2 disabled:uppercase',
        variant === 'primary' &&
          'bg-accent-blue text-white hover:bg-primary-dark-blue focus:ring-2 focus:ring-accent-blue focus:ring-offset-2',
      )}
      {...props}
    >
      {!!leftAddon && (
        <div className='flex items-center justify-center'>{leftAddon}</div>
      )}
      {children}
    </button>
  )
}