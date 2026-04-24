import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmacySettings({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  const copy =
    currentLocale === 'ar'
      ? {
          title: 'إعدادات الصيدلية والتكامل',
          body: 'اختر بين تكامل سوقك الحالي مع المنصة أو تشغيل بوابة فارماماركت الاستهلاكية كقناة بيع جديدة مرتبطة بالمخزون.',
          scenarioA: 'السيناريو A: لدي سوقي الحالي',
          scenarioABody: 'فعّل طبقة التكامل داخل الإعدادات لربط الطلبات والكتالوج والتوفر والتحليلات مع المنصة الحالية.',
          scenarioB: 'السيناريو B: أريد بوابة فارماماركت',
          scenarioBBody: 'شغّل بوابة فارماماركت المستقلة، ثم افتحها في نافذة جديدة كواجهة بيع واستهلاك مرتبطة بمخزون الصيدلية.',
          configure: 'إعداد التكامل',
          launch: 'افتح بوابة فارماماركت',
          analytics: 'تحليلات التشغيل',
          sourcing: 'قواعد التوريد',
        }
      : {
          title: 'Pharmacy settings and marketplace integration',
          body: 'Choose between integrating an existing marketplace or launching the dedicated PharmaMarket consumer portal as a new selling channel tied to pharmacy inventory.',
          scenarioA: 'Scenario A: I already run my own marketplace',
          scenarioABody: 'Use the integration layer inside settings to connect catalog, orders, stock visibility, and analytics back into the platform.',
          scenarioB: 'Scenario B: I want the PharmaMarket portal',
          scenarioBBody: 'Launch the separate PharmaMarket consumer portal and open it in a new window as a live selling surface powered by the pharmacy inventory.',
          configure: 'Configure integration',
          launch: 'Open PharmaMarket portal',
          analytics: 'Operations analytics',
          sourcing: 'Sourcing rules',
        }

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="purple" className="p-8">
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">{copy.title}</h1>
            <p className="mt-3 text-base leading-8 text-slate-600 dark:text-white/65">{copy.body}</p>
          </GlassPanel>

          <div className="grid gap-4 tablet:grid-cols-2">
            <GlassPanel level={1} className="p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">A</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{copy.scenarioA}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">{copy.scenarioABody}</p>
              <Link href={`/${currentLocale}/pharmacy/settings/marketplace`} className="mt-5 inline-flex rounded-2xl bg-[#2471A3] px-5 py-3 text-sm font-semibold text-white">
                {copy.configure}
              </Link>
            </GlassPanel>

            <GlassPanel level={1} className="p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">B</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{copy.scenarioB}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">{copy.scenarioBBody}</p>
              <a
                href={`/${currentLocale}/pharmamarket`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-2xl bg-[#148F77] px-5 py-3 text-sm font-semibold text-white"
              >
                {copy.launch}
              </a>
            </GlassPanel>
          </div>

          <div className="grid gap-4 tablet:grid-cols-2">
            {[
              { title: copy.analytics, href: `/${currentLocale}/pharmacy/analytics` },
              { title: copy.sourcing, href: `/${currentLocale}/pharmacy/sourcing` },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <GlassPanel level={1} interactive className="p-6">
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</p>
                </GlassPanel>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PlatformShell>
  )
}
