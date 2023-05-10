import { OfficeContact } from '@/types/office'

type OfficeInfoProps = {
  contact: OfficeContact
}

export const OfficeInfo = ({ contact }: OfficeInfoProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl font-bold leading-normal text-primary-dark-blue'>
        {contact.name}
      </h3>
      <span className='text-primary-dark-blue'>{contact.position}</span>
      <a href={`mailto:${contact.email}`} className='text-accent-blue'>
        {contact.email}
      </a>
      <span className='text-primary-dark-blue'>{contact.phone}</span>
    </div>
  )
}
