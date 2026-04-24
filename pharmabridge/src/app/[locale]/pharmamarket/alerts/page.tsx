import { Suspense } from 'react'
import { PharmaMarketAlertsView } from '@/components/pharmamarket/alerts-view'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketAlertsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PharmaMarketShell locale={currentLocale}>
      <Suspense>
        <PharmaMarketAlertsView locale={currentLocale} />
      </Suspense>
    </PharmaMarketShell>
  )
}
