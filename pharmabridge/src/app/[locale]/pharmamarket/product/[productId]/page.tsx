import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PharmaMarketProductActions } from '@/components/pharmamarket/product-actions'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { formatCurrency, getPharmaMarketProduct, productText } from '@/lib/pharmamarket-data'
import { isArabic } from '@/lib/platform-content'

export default async function PharmaMarketProductPage({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>
}) {
  const { locale, productId } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'
  const product = getPharmaMarketProduct(productId)

  if (!product) {
    notFound()
  }

  const text = productText(product, currentLocale)

  return (
    <PharmaMarketShell locale={currentLocale}>
      <div className="space-y-6">
        <GlassPanel level={2} className="p-8">
          <div className="grid gap-8 desktop:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#D9F0F0_0%,#EDF7FA_100%)] p-8 text-center dark:bg-[linear-gradient(135deg,#16334A_0%,#0B1628_100%)]">
              <p className="text-7xl">💊</p>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">{text.category}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">{text.pharmacy}</p>
              <h1 className="mt-3 text-4xl font-extrabold text-slate-950 dark:text-white">{text.name}</h1>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/68">{text.description}</p>
              <p className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">{formatCurrency(currentLocale, product.price)}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-white/55">
                {currentLocale === 'ar'
                  ? product.inStock
                    ? `متوفر الآن في ${text.city}`
                    : `غير متوفر في ${text.city} حاليًا`
                  : product.inStock
                    ? `Currently available in ${text.city}`
                    : `Currently unavailable in ${text.city}`}
              </p>
              <div className="mt-6">
                <PharmaMarketProductActions
                  locale={currentLocale}
                  productId={product.id}
                  requiresPrescription={product.requiresPrescription}
                  inStock={product.inStock}
                />
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-4 desktop:grid-cols-3">
          <GlassPanel level={1} className="p-6">
            <p className="text-xl font-semibold text-slate-950 dark:text-white">
              {currentLocale === 'ar' ? 'الشراء أو الاستلام' : 'Pickup or delivery'}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">
              {currentLocale === 'ar'
                ? 'يمكن متابعة الشراء عبر السلة ثم السداد ثم صفحة الدفع الجاهزة.'
                : 'Continue through cart, checkout, and the payment-ready page.'}
            </p>
            <Link href={`/${currentLocale}/pharmamarket/cart`} className="mt-4 inline-flex rounded-2xl bg-[#148F77] px-4 py-3 text-sm font-semibold text-white">
              {currentLocale === 'ar' ? 'افتح السلة' : 'Open cart'}
            </Link>
          </GlassPanel>
          <GlassPanel level={1} className="p-6">
            <p className="text-xl font-semibold text-slate-950 dark:text-white">
              {currentLocale === 'ar' ? 'خدمة الوصفة' : 'Prescription flow'}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">
              {currentLocale === 'ar'
                ? 'إذا كان المنتج يتطلب وصفة، ارفع الملف قبل إتمام الطلب.'
                : 'If the product requires a prescription, upload the document before completing the order.'}
            </p>
            <Link href={`/${currentLocale}/pharmamarket/prescriptions`} className="mt-4 inline-flex rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/12 dark:bg-white/8 dark:text-white">
              {currentLocale === 'ar' ? 'ارفع الوصفة' : 'Upload prescription'}
            </Link>
          </GlassPanel>
          <GlassPanel level={1} className="p-6">
            <p className="text-xl font-semibold text-slate-950 dark:text-white">
              {currentLocale === 'ar' ? 'تنبيه توفر' : 'Availability alert'}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">
              {currentLocale === 'ar'
                ? 'إذا لم يتوفر المنتج الآن، فعّل تنبيه واتساب أو SMS حسب المدينة.'
                : 'If the item is not available, activate a WhatsApp or SMS alert by city.'}
            </p>
            <Link href={`/${currentLocale}/pharmamarket/alerts?product=${product.slug}`} className="mt-4 inline-flex rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/12 dark:bg-white/8 dark:text-white">
              {currentLocale === 'ar' ? 'أنشئ التنبيه' : 'Create alert'}
            </Link>
          </GlassPanel>
        </div>
      </div>
    </PharmaMarketShell>
  )
}
