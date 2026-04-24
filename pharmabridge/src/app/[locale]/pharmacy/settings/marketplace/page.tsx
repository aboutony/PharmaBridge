import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmacyMarketplaceIntegrationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  const copy =
    currentLocale === 'ar'
      ? {
          title: 'طبقة تكامل السوق الحالي',
          body: 'هذه الشاشة تجهز ربط السوق الخارجي بالصيدلية داخل PharmaBridge عبر مسارات الكتالوج والمخزون والطلبات والتحليلات.',
          sections: [
            ['ربط الكتالوج', 'ربط الأصناف الحالية بمعرّفات PharmaBridge مع سياسة تحديث تلقائي للمخزون والسعر.'],
            ['ربط الطلبات', 'تمرير الطلبات الجديدة إلى PIMS مع حالة تنفيذ موحدة واسترجاع حالة الشحن أو الاستلام.'],
            ['التوفر والظهور', 'التحكم في المدن الظاهرة، أوقات الاستلام، وسياسة المنتجات المقيدة بوصفة.'],
            ['تحليلات القناة', 'إرسال بيانات الأداء إلى BridgeIntel حتى يظهر السوق الحالي ضمن لوحة التحليلات.'],
          ],
        }
      : {
          title: 'Existing marketplace integration layer',
          body: 'This screen prepares how an external marketplace connects into PharmaBridge across catalog sync, stock visibility, order routing, and analytics.',
          sections: [
            ['Catalog sync', 'Map current SKUs into PharmaBridge IDs with automatic stock and pricing updates.'],
            ['Order routing', 'Push incoming orders into PIMS with a shared fulfillment state and pickup or delivery feedback.'],
            ['Availability control', 'Control visible cities, pickup windows, and the prescription-required workflow.'],
            ['Channel analytics', 'Send performance data into BridgeIntel so the external marketplace appears in analytics.'],
          ],
        }

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="blue" className="p-8">
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">{copy.title}</h1>
            <p className="mt-3 text-base leading-8 text-slate-600 dark:text-white/65">{copy.body}</p>
          </GlassPanel>
          <div className="grid gap-4 tablet:grid-cols-2">
            {copy.sections.map(([title, body]) => (
              <GlassPanel key={title} level={1} className="p-6">
                <p className="text-xl font-semibold text-slate-950 dark:text-white">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">{body}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </main>
    </PlatformShell>
  )
}
