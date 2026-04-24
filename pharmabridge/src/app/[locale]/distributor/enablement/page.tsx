import { ModulePage } from '@/components/platform/module-page'
import { isArabic } from '@/lib/platform-content'

export default async function DistributorEnablementPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <ModulePage locale={isArabic(locale) ? 'ar' : 'en'} moduleKey="enablement" />
}
