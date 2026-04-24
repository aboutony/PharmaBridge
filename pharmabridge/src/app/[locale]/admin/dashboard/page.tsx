import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="purple" className="p-8">
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
              {currentLocale === 'ar' ? 'لوحة الإدارة والتحكم' : 'Administration and control'}
            </h1>
            <p className="mt-3 text-base leading-8 text-slate-600 dark:text-white/65">
              {currentLocale === 'ar'
                ? 'مساحة متابعة جاهزية المنصة، تبني الوحدات، وتمكين الفرق والشركاء عبر المسارات المختلفة.'
                : 'A control surface for platform readiness, module adoption, and cross-team enablement across the operating journey.'}
            </p>
          </GlassPanel>
          <div className="grid gap-4 tablet:grid-cols-3">
            {[
              { title: currentLocale === 'ar' ? 'تحليلات جسر التحليلات' : 'BridgeIntel analytics', href: `/${currentLocale}/pharmacy/analytics` },
              { title: currentLocale === 'ar' ? 'تمكين الموزعين' : 'Distributor enablement', href: `/${currentLocale}/distributor/enablement` },
              { title: currentLocale === 'ar' ? 'محرك الصيدلة الذكي' : 'PharmAI engine', href: `/${currentLocale}/pharmai` },
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
