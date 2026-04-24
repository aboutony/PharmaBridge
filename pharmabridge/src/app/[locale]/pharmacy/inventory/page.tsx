import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { isArabic } from '@/lib/platform-content'

export default async function PharmacyInventory({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'
  const rows = currentLocale === 'ar'
    ? [
        { name: 'أموكسيسيلين 500mg', category: 'مضاد حيوي', stock: '12', status: 'نقص' },
        { name: 'باراسيتامول 500mg', category: 'مسكن', stock: '320', status: 'مستقر' },
        { name: 'أوميبرازول 20mg', category: 'هضمي', stock: '18', status: 'قرب انتهاء' },
      ]
    : [
        { name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: '12', status: 'Low stock' },
        { name: 'Paracetamol 500mg', category: 'Pain relief', stock: '320', status: 'Stable' },
        { name: 'Omeprazole 20mg', category: 'Digestive', stock: '18', status: 'Near expiry' },
      ]

  return (
    <PlatformShell locale={currentLocale}>
      <main id="main-content" className="section-shell px-4 py-10">
        <div className="space-y-6">
          <GlassPanel level={2} tone="amber" className="p-8">
            <h1 className="text-4xl font-bold text-white">
              {currentLocale === 'ar' ? 'مركز المخزون' : 'Inventory command center'}
            </h1>
            <p className="mt-3 text-base leading-8 text-white/65">
              {currentLocale === 'ar'
                ? 'مساحة مخصصة لمراجعة الأصناف الحرجة، تحديث الأولويات، وربط كل قرار بمسار التوريد.'
                : 'A focused surface for reviewing critical items, resetting priorities, and linking each decision into the sourcing journey.'}
            </p>
          </GlassPanel>

          <GlassPanel level={1} className="overflow-hidden p-2">
            <div className="grid grid-cols-4 gap-2 border-b border-white/10 px-4 py-3 text-sm font-semibold text-white/60">
              <span>{currentLocale === 'ar' ? 'الصنف' : 'Item'}</span>
              <span>{currentLocale === 'ar' ? 'الفئة' : 'Category'}</span>
              <span>{currentLocale === 'ar' ? 'المخزون' : 'Stock'}</span>
              <span>{currentLocale === 'ar' ? 'القرار' : 'Action'}</span>
            </div>
            {rows.map((row) => (
              <div key={row.name} className="grid grid-cols-4 gap-2 px-4 py-4 text-sm text-white/80">
                <span>{row.name}</span>
                <span>{row.category}</span>
                <span>{row.stock}</span>
                <Link href={`/${currentLocale}/pharmacy/sourcing`} className="font-semibold text-[#84f0db]">
                  {row.status}
                </Link>
              </div>
            ))}
          </GlassPanel>
        </div>
      </main>
    </PlatformShell>
  )
}
