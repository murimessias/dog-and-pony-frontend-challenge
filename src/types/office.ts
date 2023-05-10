import { z } from 'zod'

const officeContactShape = z.object({
  email: z.string(),
  name: z.string(),
  phone: z.string(),
  position: z.string(),
})

const officeShape = z.object({
  address: z.string(),
  contact: officeContactShape,
  id: z.string(),
  title: z.string(),
})

const officeListShape = officeShape.array()

export type Office = z.infer<typeof officeShape>
export type OfficeContact = z.infer<typeof officeContactShape>
export type OfficeList = z.infer<typeof officeListShape>
