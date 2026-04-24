import { ResetPanel } from '@/components/platform/auth-panels'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-10">
        <ResetPanel locale={currentLocale} />
      </main>
    </PlatformShell>
  )
}
