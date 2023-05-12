import { useState, useEffect } from 'react'

import localforage from 'localforage'
import { v4 as uuid } from 'uuid'

import { useToastActions } from '@/ui/overlay'

import { Office, OfficeWithoutId } from '@/types/office'

import {
  INSERTED_MESSAGE,
  UPDATED_MESSAGE,
  DELETED_MESSAGE,
} from './office-constants'

type OfficeStatus = 'default' | 'editing'
type OfficeWithStatus = Office & { status: OfficeStatus }

export const useOffices = () => {
  const [offices, setOffices] = useState<OfficeWithStatus[]>([])
  const { toggle } = useToastActions()

  useEffect(() => {
    localforage.setItem('offices', offices)
  }, [offices])

  useEffect(() => {
    const getLocalStorage = async () => {
      const localStorageOffices = await localforage.getItem<Office[]>('offices')
      if (localStorageOffices) {
        setOffices(
          localStorageOffices.map((office) => ({
            ...office,
            status: 'default',
          })),
        )
        return
      }
    }

    getLocalStorage()
  }, [])

  const insertOffice = (data: OfficeWithoutId) => {
    const newOfficeId = uuid()
    setOffices((prevOffices) =>
      prevOffices.concat({ ...data, id: newOfficeId, status: 'default' }),
    )
    toggle(true)(INSERTED_MESSAGE)
  }

  const editOfficeById = (id: string) => (data: OfficeWithoutId) => {
    setOffices((prevOffices) =>
      prevOffices.map((prevOffice) => {
        if (prevOffice.id === id) {
          return { ...data, id: prevOffice.id, status: 'default' }
        }
        return prevOffice
      }),
    )
    toggle(true)(UPDATED_MESSAGE)
  }

  const deleteOfficeById = (id: string) => {
    setOffices((prevOffices) =>
      prevOffices.filter((prevOffice) => prevOffice.id !== id),
    )
    toggle(true)(DELETED_MESSAGE)
  }

  const toggleEditingOfficeById = (id: string) => {
    setOffices((prevOffices) => {
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
    setOffices((prevOffices) => {
      return prevOffices.map((prevOffice) => ({
        ...prevOffice,
        status: 'default',
      }))
    })
  }

  return {
    deleteOfficeById,
    editOfficeById,
    insertOffice,
    offices,
    resetEditingOffices,
    toggleEditingOfficeById,
  }
}
