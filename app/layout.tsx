import type { ReactNode } from 'react';
import './globals.css'

export const metadata = {
  title: 'Portfolio',
  description: 'My Portfolio Website',
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 
