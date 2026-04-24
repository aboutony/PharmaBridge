import { PlatformHome } from '@/components/platform/platform-home'
import { isArabic } from '@/lib/platform-content'

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return <PlatformHome locale={isArabic(locale) ? 'ar' : 'en'} />
}
