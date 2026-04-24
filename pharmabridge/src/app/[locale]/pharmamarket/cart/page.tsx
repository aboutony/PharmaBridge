import { PharmaMarketCartView } from '@/components/pharmamarket/cart-view'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketCartPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PharmaMarketShell locale={currentLocale}>
      <PharmaMarketCartView locale={currentLocale} />
    </PharmaMarketShell>
  )
}
