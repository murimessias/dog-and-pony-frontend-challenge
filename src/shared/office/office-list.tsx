'use client'
import { useState } from 'react'

import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'
import clsx from 'clsx'

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/disclosure'
import { Button, IconButton } from '@/ui/form'
import { Icon } from '@/ui/media'

import { OfficeEditForm } from './office-edit-form'
import { useOffices } from './office-hooks'
import { OfficeInfo } from './office-info'
import { OfficeInsertForm } from './office-insert-form'

export const OfficeList = () => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)
  const {
    deleteOfficeById,
    editOfficeById,
    insertOffice,
    offices,
    resetEditingOffices,
    toggleEditingOfficeById,
  } = useOffices()

  const onChangeAccordion = () => {
    resetEditingOffices()
    setIsCollapsibleOpen(false)
  }

  return (
    <div className='flex flex-col gap-8'>
      <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
        {!isCollapsibleOpen ? (
          <CollapsibleTrigger asChild>
            <Button
              className={clsx('h-14 justify-between rounded-lg px-6')}
              fullWidth
              rightAddon={<Icon as='add' />}
            >
              Add New Location
            </Button>
          </CollapsibleTrigger>
        ) : (
          <div className='flex items-center justify-between rounded-lg bg-white px-6 py-4'>
            <h3 className='text-xl font-bold text-primary-dark-blue'>
              New Location
            </h3>
            <CollapsibleTrigger asChild>
              <IconButton size='sm' variant='neutral'>
                <Icon as='cross' />
              </IconButton>
            </CollapsibleTrigger>
          </div>
        )}
        <CollapsibleContent>
          <OfficeInsertForm
            onInsert={(d) => {
              insertOffice(d)
              setIsCollapsibleOpen(false)
            }}
          />
        </CollapsibleContent>
      </Collapsible>
      <Accordion collapsible onValueChange={onChangeAccordion} type='single'>
        {offices.map((office) => {
          return (
            <AccordionItem key={office.id} value={office.id}>
              {office.status === 'default' && (
                <AccordionTrigger>
                  <div className='text-left'>
                    <AccordionHeader>{office.title}</AccordionHeader>
                    <span>{office.address}</span>
                  </div>
                  <div className='text-accent-blue group-data-[state=open]:rotate-180 group-data-[state=open]:text-white'>
                    <Icon as='chevron-down' size='md' />
                  </div>
                </AccordionTrigger>
              )}
              {office.status === 'editing' && (
                <div className='flex items-center justify-between px-6 py-4'>
                  <AccordionHeader asChild>
                    <h3 className='text-xl font-bold text-primary-dark-blue'>
                      Edit Location
                    </h3>
                  </AccordionHeader>
                  <AccordionTrigger asChild>
                    <IconButton
                      onClick={() => toggleEditingOfficeById(office.id)}
                      size='sm'
                      variant='neutral'
                    >
                      <Icon as='cross' />
                    </IconButton>
                  </AccordionTrigger>
                </div>
              )}
              <AccordionContent>
                {office.status === 'default' && (
                  <div className='flex flex-col gap-4'>
                    <OfficeInfo contact={office.contact} />
                    <RadixSeparatorPrimitive.Root
                      className='bg-primary-light-grey data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
                      decorative
                    />
                    <div className='flex justify-between'>
                      <Button
                        leftAddon={<Icon as='pencil' size='lg' />}
                        onClick={() => toggleEditingOfficeById(office.id)}
                        size='sm'
                        variant='neutral'
                      >
                        Edit
                      </Button>
                      <Button
                        leftAddon={<Icon as='trash' size='lg' />}
                        onClick={() => deleteOfficeById(office.id)}
                        size='sm'
                        variant='attention'
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
                {office.status === 'editing' && (
                  <OfficeEditForm
                    office={office}
                    onEdit={(v) => editOfficeById(office.id)(v)}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
