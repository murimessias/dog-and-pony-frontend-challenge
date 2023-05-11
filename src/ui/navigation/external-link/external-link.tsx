import { ComponentProps } from 'react'

import clsx from 'clsx'

type ExternalLinkProps = {
  href: string
} & ComponentProps<'a'>

export const ExternalLink = ({
  children,
  className,
  href,
  ...props
}: ExternalLinkProps) => {
  return (
    <a
      className={clsx(
        'w-min text-accent-blue outline-none focus-visible:rounded-sm focus-visible:outline-accent-blue',
        className,
      )}
      href={href}
      rel='noopener noreferrer'
      target='_blank'
      {...props}
    >
      {children}
    </a>
  )
}
