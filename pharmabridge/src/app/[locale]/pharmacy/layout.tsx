import { QueryProvider } from '@/components/ui/query-provider'

export default function PharmacyDataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <QueryProvider>{children}</QueryProvider>
}
