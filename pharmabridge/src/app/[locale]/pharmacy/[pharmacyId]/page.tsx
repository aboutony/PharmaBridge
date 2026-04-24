import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmacyPage({
  params,
}: {
  params: Promise<{ locale: string; pharmacyId: string }>
}) {
  const { locale, pharmacyId } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="blue" className="p-8">
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
              {currentLocale === 'ar' ? `واجهة الصيدلية #${pharmacyId}` : `Pharmacy storefront #${pharmacyId}`}
            </h1>
            <p className="mt-3 text-base leading-8 text-slate-600 dark:text-white/65">
              {currentLocale === 'ar'
                ? 'واجهة مخصصة للمريض تعرض التوفر والسعر ومسار الطلب دون انفصال عن مخزون الصيدلية الفعلي.'
                : "A patient-facing storefront showing availability, price, and order flow without disconnecting from the pharmacy's live inventory."}
            </p>
          </GlassPanel>

          <div className="grid gap-4 tablet:grid-cols-3">
            <Link href={`/${currentLocale}/pharmamarket`}>
              <GlassPanel level={1} interactive className="p-6">
                <p className="font-semibold text-slate-950 dark:text-white">
                  {currentLocale === 'ar' ? 'العودة إلى السوق' : 'Back to marketplace'}
                </p>
              </GlassPanel>
            </Link>
            <Link href={`/${currentLocale}/patient/dashboard`}>
              <GlassPanel level={1} interactive className="p-6">
                <p className="font-semibold text-slate-950 dark:text-white">
                  {currentLocale === 'ar' ? 'طلبات المريض' : 'Patient orders'}
                </p>
              </GlassPanel>
            </Link>
            <Link href={`/${currentLocale}/pharmacy/dashboard`}>
              <GlassPanel level={1} interactive className="p-6">
                <p className="font-semibold text-slate-950 dark:text-white">
                  {currentLocale === 'ar' ? 'لوحة الصيدلية' : 'Pharmacy operations'}
                </p>
              </GlassPanel>
            </Link>
          </div>
        </div>
      </main>
    </PlatformShell>
  )
}
