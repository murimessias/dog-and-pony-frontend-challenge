'use client'
import * as RadixToastPrimitive from '@radix-ui/react-toast'

import { IconButton } from '@/ui/form'
import { Icon } from '@/ui/media'

import { useToast, useToastActions } from './toast-hooks'

type ToastProviderProps = RadixToastPrimitive.ToastProps

export const ToastProvider = ({ children, ...props }: ToastProviderProps) => {
  return (
    <RadixToastPrimitive.Provider swipeDirection='up' {...props}>
      {children}
      <RadixToastPrimitive.Viewport className='fixed right-0 top-0 z-40 m-0 flex h-20 w-full max-w-[100vw] outline-none' />
    </RadixToastPrimitive.Provider>
  )
}

export const Toast = () => {
  const { open, message } = useToast()
  const { reset } = useToastActions()

  return (
    <RadixToastPrimitive.Root
      className='fixed inset-x-0 top-0 z-50 grid h-20 place-content-center content-center bg-white data-[state=closed]:animate-hide data-[state=open]:animate-show'
      open={open}
      onOpenChange={reset}
    >
      <RadixToastPrimitive.Description className='flex items-center gap-2 text-xs uppercase leading-none tracking-wide text-primary-dark-blue'>
        {!!message && (
          <>
            <div className='text-accent-blue'>
              <Icon as='check' size='md' />
            </div>
            <span>{message}</span>
          </>
        )}
      </RadixToastPrimitive.Description>
      <RadixToastPrimitive.Close
        aria-label='Close Toast'
        asChild
        className='absolute right-4 top-1/2 -translate-y-1/2'
      >
        <IconButton variant='neutral'>
          <Icon as='cross' />
        </IconButton>
      </RadixToastPrimitive.Close>
    </RadixToastPrimitive.Root>
  )
}
