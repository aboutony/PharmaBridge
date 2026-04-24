import { ModulePage } from '@/components/platform/module-page'
import { DrugAvailabilitySearch } from '@/components/marketplace/drug-search'
import { GlassPanel } from '@/components/platform/glass-panel'
import { AppRuntime } from '@/components/system/app-runtime'
import { isArabic } from '@/lib/platform-content'

export default async function MarketplaceHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <ModulePage locale={currentLocale} moduleKey="market">
      <AppRuntime />
      <GlassPanel level={1} className="p-6 tablet:p-8">
        <DrugAvailabilitySearch locale={currentLocale} />
      </GlassPanel>
    </ModulePage>
  )
}
