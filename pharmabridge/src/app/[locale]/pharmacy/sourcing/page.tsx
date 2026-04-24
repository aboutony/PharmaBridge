import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function DistributorSourcing({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'
  const offers = currentLocale === 'ar'
    ? [
        { supplier: 'موزع دمشق فارما', meta: '12,500 ل.س • ساعتان', href: `/${currentLocale}/distributor/dashboard` },
        { supplier: 'الشام الطبية', meta: '11,800 ل.س • 24 ساعة', href: `/${currentLocale}/distributor/dashboard` },
      ]
    : [
        { supplier: 'Damascus Pharma', meta: '12,500 SYP • 2 hours', href: `/${currentLocale}/distributor/dashboard` },
        { supplier: 'AlSham Medical', meta: '11,800 SYP • 24 hours', href: `/${currentLocale}/distributor/dashboard` },
      ]

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="teal" className="p-8">
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
              {currentLocale === 'ar' ? 'مقارنة عروض التوريد' : 'Compare sourcing offers'}
            </h1>
            <p className="mt-3 text-base leading-8 text-slate-600 dark:text-white/65">
              {currentLocale === 'ar'
                ? 'هذا المسار يستقبل تنبيهات إدارة المخزون ويحوّلها مباشرة إلى عروض موزعين قابلة للمقارنة والتنفيذ.'
                : 'This path receives PIMS alerts and turns them into comparable, actionable distributor offers.'}
            </p>
          </GlassPanel>

          <div className="grid gap-4 tablet:grid-cols-2">
            {offers.map((offer) => (
              <GlassPanel key={offer.supplier} level={1} interactive className="p-6">
                <p className="text-xl font-semibold text-slate-950 dark:text-white">{offer.supplier}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-white/65">{offer.meta}</p>
                <div className="mt-5 flex gap-3">
                  <Link href={offer.href} className="rounded-2xl bg-[#148F77] px-4 py-3 text-sm font-semibold text-white">
                    {currentLocale === 'ar' ? 'افتح الموزع' : 'Open distributor'}
                  </Link>
                  <Link href={`/${currentLocale}/pharmacy/analytics`} className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/12 dark:bg-white/8 dark:text-white">
                    {currentLocale === 'ar' ? 'راجع الأثر' : 'Review impact'}
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </main>
    </PlatformShell>
  )
}
