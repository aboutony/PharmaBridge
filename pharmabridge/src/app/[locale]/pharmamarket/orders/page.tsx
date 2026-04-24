import { PharmaMarketOrdersView } from '@/components/pharmamarket/orders-view'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PharmaMarketShell locale={currentLocale}>
      <PharmaMarketOrdersView locale={currentLocale} />
    </PharmaMarketShell>
  )
}
