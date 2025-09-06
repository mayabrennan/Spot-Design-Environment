import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spot AI Dashboard',
  description: 'Enterprise AI Operations Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-inter">
        {children}
      </body>
    </html>
  )
} 