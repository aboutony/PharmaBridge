import { QueryProvider } from '@/components/ui/query-provider'

export default function DistributorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <QueryProvider>{children}</QueryProvider>
}
