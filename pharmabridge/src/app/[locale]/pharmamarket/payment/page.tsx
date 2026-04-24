import { PharmaMarketPaymentView } from '@/components/pharmamarket/payment-view'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketPaymentPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PharmaMarketShell locale={currentLocale}>
      <PharmaMarketPaymentView locale={currentLocale} />
    </PharmaMarketShell>
  )
}
