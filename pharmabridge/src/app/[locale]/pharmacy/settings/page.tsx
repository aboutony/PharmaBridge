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

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="purple" className="p-8">
            <h1 className="text-4xl font-bold text-white">
              {currentLocale === 'ar' ? 'إعدادات التشغيل' : 'Operating settings'}
            </h1>
            <p className="mt-3 text-base leading-8 text-white/65">
              {currentLocale === 'ar'
                ? 'اضبط فرق العمل، سياسات الموافقة، واتجاه التكامل بين إدارة المخزون وربط الموزعين وجسر التحليلات.'
                : 'Configure team roles, approval policies, and the integration flow between PIMS, DistributorLink, and BridgeIntel.'}
            </p>
          </GlassPanel>
          <div className="grid gap-4 tablet:grid-cols-3">
            {[
              { title: currentLocale === 'ar' ? 'الفِرق والصلاحيات' : 'Teams and permissions', href: `/${currentLocale}/admin/dashboard` },
              { title: currentLocale === 'ar' ? 'مسار التحليلات' : 'Analytics routing', href: `/${currentLocale}/pharmacy/analytics` },
              { title: currentLocale === 'ar' ? 'قواعد التوريد' : 'Sourcing rules', href: `/${currentLocale}/pharmacy/sourcing` },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <GlassPanel level={1} interactive className="p-6">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                </GlassPanel>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PlatformShell>
  )
}
