import { z } from 'zod'

import { PHONE_REGEX } from '@/utils/regex'

// Office Form Error Messages
export const EMAIL_ERROR_MESSAGE = 'Please, provide a valid email'
export const EMPTY_ERROR_MESSAGE = 'This field cannot be empty'
export const PHONE_ERROR_MESSAGE = 'Plase, provide a valid phone (xxx) xxx-xxxx'

// Office Toast Messages
export const DELETED_MESSAGE = 'The location has been deleted.'
export const INSERTED_MESSAGE = 'The location has been created.'
export const UPDATED_MESSAGE = 'The location has been updated.'

// Office Insert & Edit Form Shape
export const officeFormShape = z.object({
  title: z.string().min(1, {
    message: EMPTY_ERROR_MESSAGE,
  }),
  address: z.string().min(1, {
    message: EMPTY_ERROR_MESSAGE,
  }),
  contact: z.object({
    name: z.string().min(1, {
      message: EMPTY_ERROR_MESSAGE,
    }),
    position: z.string().min(1, {
      message: EMPTY_ERROR_MESSAGE,
    }),
    email: z
      .string()
      .min(1, { message: EMPTY_ERROR_MESSAGE })
      .email({ message: EMAIL_ERROR_MESSAGE }),
    phone: z
      .string()
      .min(1, { message: EMPTY_ERROR_MESSAGE })
      .regex(PHONE_REGEX, { message: PHONE_ERROR_MESSAGE }),
  }),
})

// Office Form Validations Helpers
export const hasValidationError = (obj: object): boolean =>
  Object.keys(obj).length !== 0
