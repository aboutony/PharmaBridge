import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PharmaBridge',
  description: 'Unified Pharmaceutical Ecosystem Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}