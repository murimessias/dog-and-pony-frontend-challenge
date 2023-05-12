import { ComponentProps, forwardRef } from 'react'

import * as RadixCollapsiblePrimitive from '@radix-ui/react-collapsible'
import clsx from 'clsx'

type RootProps = RadixCollapsiblePrimitive.CollapsibleProps

const Root = ({ children, ...props }: RootProps) => {
  return (
    <RadixCollapsiblePrimitive.Root
      className='rounded-lg bg-white shadow-base'
      {...props}
    >
      {children}
    </RadixCollapsiblePrimitive.Root>
  )
}

type TriggerProps = ComponentProps<typeof RadixCollapsiblePrimitive.Trigger>

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ asChild, children, className, ...props }, forwardRef) => {
    return (
      <RadixCollapsiblePrimitive.Trigger
        asChild={asChild}
        {...(!asChild && {
          className: clsx(
            'flex w-full items-center justify-between gap-6 rounded-lg p-6 outline-none transition data-[state=open]:rounded-b-none data-[state=open]:rounded-t-lg data-[state=open]:bg-primary-grey data-[state=open]:text-white data-[state=open]:shadow-base',
          ),
        })}
        {...props}
        ref={forwardRef}
      >
        {children}
      </RadixCollapsiblePrimitive.Trigger>
    )
  },
)

type ContentProps = RadixCollapsiblePrimitive.CollapsibleContentProps

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <RadixCollapsiblePrimitive.CollapsibleContent
      className='overflow-hidden p-6 data-[state=closed]:animate-slideCollapsibleUp data-[state=open]:animate-slideCollapsibleDown'
      {...props}
    >
      {children}
    </RadixCollapsiblePrimitive.CollapsibleContent>
  )
}

// DisplayNames
Trigger.displayName = 'CollapsibleTrigger'

// Exports
export const Collapsible = Root
export const CollapsibleContent = Content
export const CollapsibleTrigger = Trigger
