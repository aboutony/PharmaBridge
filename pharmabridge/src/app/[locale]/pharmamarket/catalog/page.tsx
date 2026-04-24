import { PharmaMarketCatalogView } from '@/components/pharmamarket/catalog-view'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PharmaMarketShell locale={currentLocale}>
      <PharmaMarketCatalogView locale={currentLocale} />
    </PharmaMarketShell>
  )
}
