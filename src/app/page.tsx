'use client'
import { Button, Icon } from '@/ui'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/disclosure/accordion'

export default function Home() {
  return (
    <main className='mx-auto flex h-screen w-full max-w-[320px] flex-col justify-center'>
      <Accordion collapsible defaultValue='item-1' type='single'>
        {[0, 1, 2, 3, 4].map((_, i) => {
          return (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>
                <div className='text-left'>
                  <AccordionHeader>Headquarters</AccordionHeader>
                  <span>3763 W. Dallas Ts.</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-xl font-bold leading-normal text-primary-dark-blue'>
                      Hellena John
                    </h3>
                    <span className='text-primary-dark-blue'>
                      Software Tester
                    </span>
                    <a
                      href='mailto:georgia.yout@example.com'
                      className='text-accent-blue'
                    >
                      georgia.young@example.com
                    </a>
                    <span className='text-primary-dark-blue'>
                      (808) 555-0111
                    </span>
                  </div>
                  <hr className='my-2' />
                  <div className='flex justify-between'>
                    <Button
                      onClick={() => alert(`Editar item ${i}`)}
                      variant='neutral'
                      size='sm'
                      leftAddon={<Icon as='pencil' size='md' />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => alert(`Remover item ${i}`)}
                      variant='attention'
                      size='sm'
                      leftAddon={<Icon as='trash' size='md' />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </main>
  )
}
