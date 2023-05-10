'use client'
import { useState } from 'react'

import * as RadixSeparatorPrimitive from '@radix-ui/react-separator'
import { v4 as uuid } from 'uuid'

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/disclosure'
import { Button } from '@/ui/form'
import { Icon } from '@/ui/media'

import { Office } from '@/types/office'

import { OfficeEditForm } from './office-form'
import { OfficeInfo } from './office-info'

type Status = 'default' | 'editing'
type CurrentOffice = Office & { status: Status }
type OfficeWithoutId = Omit<Office, 'id'>

type OfficesListProps = {
  offices: Office[]
}

const newOfficeMock: OfficeWithoutId = {
  title: 'Office Created',
  address: 'office-address-created',
  contact: {
    name: 'Office Contact Name Created',
    position: 'Office Position Created',
    email: 'office@email-created.com',
    phone: '(303) 444-5552',
  },
}

export const OfficeList = ({ offices }: OfficesListProps) => {
  const initialOffices: CurrentOffice[] = offices.map((office) => ({
    ...office,
    status: 'default',
  }))

  const [currentOffices, setCurrentOffices] = useState(initialOffices)

  // INFO: CRUD Actions
  const insertOffice = (data: OfficeWithoutId) => {
    const newOfficeId = uuid()
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
      <Button
        fullWidth
        onClick={() => insertOffice(newOfficeMock)}
        rightAddon={<Icon as='add' />}
      >
        Add New Location
      </Button>
      <Accordion
        collapsible
        defaultValue='item-1'
        onValueChange={() => resetEditingOffices()}
        type='single'
      >
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
                  <Button
                    variant='neutral'
                    className='p-0'
                    onClick={() => toggleEditingOfficeById(office.id)}
                  >
                    <Icon as='cross' />
                  </Button>
                </div>
              )}
              <AccordionContent>
                <div className='flex flex-col gap-4'>
                  {office.status === 'default' && (
                    <>
                      <OfficeInfo contact={office.contact} />
                      <RadixSeparatorPrimitive.Root
                        decorative
                        className='bg-primary-light-grey data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
                      />
                      <div className='flex justify-between'>
                        <Button
                          onClick={() => toggleEditingOfficeById(office.id)}
                          variant='neutral'
                          size='sm'
                          leftAddon={<Icon as='pencil' size='md' />}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteOfficeById(office.id)}
                          variant='attention'
                          size='sm'
                          leftAddon={<Icon as='trash' size='md' />}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                  {office.status === 'editing' && (
                    <OfficeEditForm
                      office={office}
                      onSave={(v) => editOfficeById(office.id)(v)}
                    />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
