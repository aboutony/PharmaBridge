import { PharmaMarketFavoritesView } from '@/components/pharmamarket/favorites-view'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketFavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PharmaMarketShell locale={currentLocale}>
      <PharmaMarketFavoritesView locale={currentLocale} />
    </PharmaMarketShell>
  )
}
