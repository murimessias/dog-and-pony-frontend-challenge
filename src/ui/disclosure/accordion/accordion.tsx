'use client'
import { ComponentProps, forwardRef } from 'react'
import * as RadixAccordionPrimitive from '@radix-ui/react-accordion'
import { Icon } from '@/ui/media'

type RootProps = ComponentProps<typeof RadixAccordionPrimitive.Root>

const Root = ({ children, ...props }: RootProps) => {
  return (
    <RadixAccordionPrimitive.Root className='flex flex-col gap-6' {...props}>
      {children}
    </RadixAccordionPrimitive.Root>
  )
}

type TriggerProps = ComponentProps<typeof RadixAccordionPrimitive.Trigger>

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, ...props }, forwardRef) => {
    return (
      <RadixAccordionPrimitive.Trigger
        className='group flex w-full items-center justify-between gap-6 rounded-lg p-6 outline-none transition data-[state=open]:rounded-b-none data-[state=open]:rounded-t-lg data-[state=open]:bg-primary-grey data-[state=open]:text-white data-[state=open]:shadow-base'
        {...props}
        ref={forwardRef}
      >
        <div className='text-left'>{children}</div>
        <div className='text-accent-blue group-data-[state=open]:rotate-180 group-data-[state=open]:text-white'>
          <Icon as='chevron-down' size='md' />
        </div>
      </RadixAccordionPrimitive.Trigger>
    )
  },
)

type ContentProps = RadixAccordionPrimitive.AccordionContentProps

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <RadixAccordionPrimitive.Content
      className='overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown'
      {...props}
    >
      <div className='px-8 py-6'>{children}</div>
    </RadixAccordionPrimitive.Content>
  )
}

type HeaderProps = RadixAccordionPrimitive.AccordionHeaderProps

const Header = ({ children }: HeaderProps) => {
  return (
    <RadixAccordionPrimitive.Header className='text-2xl font-bold leading-9 text-primary-dark-blue data-[state=open]:text-white'>
      {children}
    </RadixAccordionPrimitive.Header>
  )
}

type ItemProps = ComponentProps<typeof RadixAccordionPrimitive.Item>

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, ...props }, forwardRef) => {
    return (
      <RadixAccordionPrimitive.Item
        className='rounded-lg bg-white shadow-base outline-none focus-within:ring focus-within:ring-accent-blue focus-within:ring-offset-1'
        {...props}
        ref={forwardRef}
      >
        {children}
      </RadixAccordionPrimitive.Item>
    )
  },
)

// Component Display Names
Item.displayName = 'AccordionItem'
Trigger.displayName = 'AccordionTrigger'

// Exports
export const Accordion = Root
export const AccordionContent = Content
export const AccordionItem = Item
export const AccordionTrigger = Trigger
export const AccordionHeader = Header
