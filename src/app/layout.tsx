import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '700'],
})

export const metadata = {
  title: 'Dog And Pony Studios - Offices',
  description: 'An application to list all Dog And Pony Studio Offices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-primary-light-grey text-primary-grey' lang='en'>
      <body className={`${roboto.variable} font-sans`}>{children}</body>
    </html>
  )
}
