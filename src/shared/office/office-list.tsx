'use client'
import { useState } from 'react'

import { faker } from '@faker-js/faker'
import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'
import clsx from 'clsx'

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/disclosure'
import { Button, IconButton } from '@/ui/form'
import { Icon } from '@/ui/media'

import { Office, OfficeWithoutId } from '@/types/office'

import { OfficeEditForm } from './office-edit-form'
import { OfficeInfo } from './office-info'
import { OfficeInsertForm } from './office-insert-form'

type CurrentOfficeStatus = 'default' | 'editing'
type CurrentOffice = Office & { status: CurrentOfficeStatus }

type OfficesListProps = {
  offices: Office[]
}

export const OfficeList = ({ offices }: OfficesListProps) => {
  const initialOffices: CurrentOffice[] = offices.map((office) => ({
    ...office,
    status: 'default',
  }))

  const [currentOffices, setCurrentOffices] = useState(initialOffices)

  // INFO: CRUD Actions
  const insertOffice = (data: OfficeWithoutId) => {
    const newOfficeId = faker.datatype.uuid()
    setCurrentOffices((prevOffices) =>
      prevOffices.concat({ ...data, id: newOfficeId, status: 'default' }),
    )
    alert(`${newOfficeId} - Office Inserted`)
  }

  const editOfficeById = (id: string) => (data: OfficeWithoutId) => {
    setCurrentOffices((prevOffices) =>
      prevOffices.map((prevOffice) => {
        if (prevOffice.id === id) {
          return { ...data, id: prevOffice.id, status: 'default' }
        }
        return prevOffice
      }),
    )
    alert(`${id} - Office Edited`)
  }

  const deleteOfficeById = (id: string) => {
    setCurrentOffices((prevOffices) => {
      return prevOffices.filter((prevOffice) => prevOffice.id !== id)
    })
    alert(`${id} - Office Deleted`)
  }

  // INFO: Edit Status Actions
  const toggleEditingOfficeById = (id: string) => {
    setCurrentOffices((prevOffices) => {
      return prevOffices.map((prevOffice) => {
        if (prevOffice.id === id) {
          const isEditing = prevOffice.status === 'editing'
          return { ...prevOffice, status: isEditing ? 'default' : 'editing' }
        }
        return { ...prevOffice, status: 'default' }
      })
    })
  }

  const resetEditingOffices = () => {
    setCurrentOffices((prevOffices) => {
      return prevOffices.map((prevOffice) => ({
        ...prevOffice,
        status: 'default',
      }))
    })
  }

  return (
    <div className='flex flex-col gap-8'>
      <Accordion
        collapsible
        onValueChange={() => {
          resetEditingOffices()
        }}
        type='single'
      >
        <AccordionItem value='new-location'>
          <AccordionTrigger asChild>
            <Button
              className={clsx('h-14 justify-between rounded-lg px-6 py-4')}
              fullWidth
              rightAddon={<Icon as='add' />}
            >
              Add New Location
            </Button>
          </AccordionTrigger>
          <AccordionContent>
            <OfficeInsertForm onInsert={insertOffice} />
          </AccordionContent>
        </AccordionItem>
        {currentOffices.map((office) => {
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
                <div className='flex items-center justify-between p-6'>
                  <AccordionHeader asChild>
                    <h3 className='text-xl font-bold text-primary-dark-blue'>
                      Edit Location
                    </h3>
                  </AccordionHeader>
                  <IconButton
                    onClick={() => toggleEditingOfficeById(office.id)}
                    variant='neutral'
                    size='sm'
                  >
                    <Icon as='cross' />
                  </IconButton>
                </div>
              )}
              <AccordionContent>
                {office.status === 'default' && (
                  <div className='flex flex-col gap-4'>
                    <OfficeInfo contact={office.contact} />
                    <RadixSeparatorPrimitive.Root
                      decorative
                      className='bg-primary-light-grey data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
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
