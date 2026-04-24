import { redirect } from 'next/navigation'
import { isArabic } from '@/lib/platform-content'

export default async function MarketplaceRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  redirect(`/${currentLocale}/pharmamarket`)
}
