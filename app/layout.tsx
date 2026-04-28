import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NorvexPay',
  description: 'Global payment infrastructure. One API. 180+ countries. Enterprise-grade security. Settlement in seconds.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
