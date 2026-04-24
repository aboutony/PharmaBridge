import { QueryProvider } from '@/components/ui/query-provider'

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <QueryProvider>{children}</QueryProvider>
}
