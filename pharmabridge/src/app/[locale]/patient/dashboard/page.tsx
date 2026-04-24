import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PatientDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'

  const orders = currentLocale === 'ar'
    ? [
        { id: 'ORD-104', status: 'تم التسليم', pharmacy: 'صيدلية الراشد', action: 'عرض الطلب' },
        { id: 'ORD-109', status: 'قيد التجهيز', pharmacy: 'صيدلية الشام', action: 'متابعة التنفيذ' },
      ]
    : [
        { id: 'ORD-104', status: 'Delivered', pharmacy: 'Al-Rashid Pharmacy', action: 'View order' },
        { id: 'ORD-109', status: 'Preparing', pharmacy: 'AlSham Pharmacy', action: 'Track fulfillment' },
      ]

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="blue" className="p-8">
            <h1 className="text-4xl font-bold text-white">
              {currentLocale === 'ar' ? 'لوحة المريض' : 'Patient dashboard'}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-white/65">
              {currentLocale === 'ar'
                ? 'جميع طلباتك، الصيدليات المفضلة، ومسارات التنفيذ في مساحة واحدة متصلة بالسوق والصيدلية.'
                : 'All your orders, preferred pharmacies, and fulfillment journeys in one surface connected to the marketplace and pharmacy systems.'}
            </p>
          </GlassPanel>

          <div className="grid gap-4 tablet:grid-cols-2">
            {orders.map((order) => (
              <GlassPanel key={order.id} level={1} className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-white/50">{order.id}</p>
                <p className="mt-3 text-xl font-semibold text-white">{order.pharmacy}</p>
                <p className="mt-2 text-sm text-white/65">{order.status}</p>
                <Link href={`/${currentLocale}/marketplace`} className="mt-5 inline-flex rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white hover:bg-white/12">
                  {order.action}
                </Link>
              </GlassPanel>
            ))}
          </div>

          <GlassPanel level={1} className="p-6">
            <p className="text-lg font-semibold text-white">
              {currentLocale === 'ar' ? 'العودة إلى رحلة البحث والطلب' : 'Return to the discovery and ordering journey'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/${currentLocale}/marketplace`} className="rounded-2xl bg-[#148F77] px-5 py-3 text-sm font-semibold text-white">
                {currentLocale === 'ar' ? 'ابحث عن دواء' : 'Search medicine'}
              </Link>
              <Link href={`/${currentLocale}/pharmacy/1`} className="rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold text-white">
                {currentLocale === 'ar' ? 'افتح الصيدلية' : 'Open storefront'}
              </Link>
            </div>
          </GlassPanel>
        </div>
      </main>
    </PlatformShell>
  )
}
