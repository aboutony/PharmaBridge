import Link from 'next/link'
import { Bell, Heart, MapPin, ShieldCheck, ShoppingBag, Truck, Upload } from 'lucide-react'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PharmaMarketProductCard } from '@/components/pharmamarket/product-card'
import { PharmaMarketShell } from '@/components/pharmamarket/portal-shell'
import { PharmaMarketStoreSummary } from '@/components/pharmamarket/store-summary'
import {
  pharmamarketCategories,
  pharmamarketProducts,
} from '@/lib/pharmamarket-data'
import { isArabic } from '@/lib/platform-content'

const copy = {
  ar: {
    eyebrow: 'بوابة صيدليات رقمية للمريض',
    title: 'ابحث، اطلب، وارفع وصفتك من نافذة دوائية واحدة.',
    body: 'فارماماركت هي البوابة الاستهلاكية المنفصلة داخل منظومة فارمابريدج، حيث يرى المريض مخزون الصيدليات المرخصة ويشتري ويستلم أو يطلب التوصيل مع تنبيهات توفر مستقبلية.',
    catalog: 'افتح الكتالوج',
    checkout: 'انتقل إلى الدفع',
    categories: 'فئات سريعة',
    deals: 'عروض اليوم',
    how: 'كيف تطلب',
    howBody: 'ابحث عن الدواء، أضفه إلى السلة، ارفع الوصفة إذا لزم الأمر، ثم أكمل الطلب أو الدفع الجاهز للتوصيل.',
    verified: 'صيدليات موثقة',
    verifiedBody: 'كل شريك مرخص ومهيأ داخل الشبكة.',
    delivery: 'توصيل مجاني',
    deliveryBody: 'على بعض الطلبات فوق حد معين.',
    pickup: 'استلام قريب',
    pickupBody: 'من أكثر من 200 نقطة استلام مرتبطة.',
    rx: 'خدمة الوصفات',
    rxBody: 'ارفع وصفة الطبيب ضمن رحلة حقيقية قابلة للتنفيذ.',
    customerActions: 'رحلة العميل',
    customerBody: 'كل زر يقود إلى خطوة عملية: مفضلة، تنبيه، سلة، وصفة، أو إتمام شراء.',
  },
  en: {
    eyebrow: 'A digital pharmacy marketplace for patients',
    title: 'Search, compare, upload your prescription, and order from one healthcare storefront.',
    body: 'PharmaMarket is the separate consumer portal inside the PharmaBridge ecosystem, giving patients licensed pharmacy inventory, checkout-ready ordering, prescription handling, and availability alerts.',
    catalog: 'Open catalog',
    checkout: 'Go to checkout',
    categories: 'Quick categories',
    deals: 'Deals of the day',
    how: 'How ordering works',
    howBody: 'Search medicine, add it to the cart, upload a prescription when required, then continue to checkout or the payment-ready screen.',
    verified: 'Verified pharmacies',
    verifiedBody: 'Every partner is licensed and ready for fulfillment.',
    delivery: 'Free delivery',
    deliveryBody: 'Available on selected orders over a threshold.',
    pickup: 'Near-me pickup',
    pickupBody: 'Available across 200+ connected pickup points.',
    rx: 'Prescription service',
    rxBody: 'Upload the doctor prescription inside a real order journey.',
    customerActions: 'Consumer journey',
    customerBody: 'Every CTA leads to a real action: favorites, alerts, cart, prescriptions, or checkout.',
  },
}

export default async function PharmaMarketHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = isArabic(locale) ? 'ar' : 'en'
  const t = copy[currentLocale]
  const deals = pharmamarketProducts.filter((product) => product.deal).slice(0, 3)

  return (
    <PharmaMarketShell locale={currentLocale}>
      <div className="space-y-8">
        <GlassPanel level={2} className="overflow-hidden p-8 tablet:p-10">
          <div className="grid gap-8 desktop:grid-cols-[1.15fr_0.85fr] desktop:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-600 dark:border-white/12 dark:bg-white/8 dark:text-white/60">
                <ShieldCheck className="h-4 w-4 text-[#148F77]" />
                {t.eyebrow}
              </div>
              <h1 className="text-5xl font-extrabold leading-tight text-slate-950 dark:text-white tablet:text-6xl">{t.title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-white/68">{t.body}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${currentLocale}/pharmamarket/catalog`} className="inline-flex items-center gap-2 rounded-2xl bg-[#148F77] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_26px_rgba(20,143,119,0.25)] transition hover:bg-[#19a387]">
                  <ShoppingBag className="h-4 w-4" />
                  {t.catalog}
                </Link>
                <Link href={`/${currentLocale}/pharmamarket/checkout`} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12">
                  <Truck className="h-4 w-4" />
                  {t.checkout}
                </Link>
              </div>
            </div>

            <GlassPanel level={1} tone="teal" className="p-6">
              <div className="grid gap-3">
                {[
                  { icon: ShieldCheck, title: t.verified, body: t.verifiedBody },
                  { icon: Truck, title: t.delivery, body: t.deliveryBody },
                  { icon: MapPin, title: t.pickup, body: t.pickupBody },
                  { icon: Upload, title: t.rx, body: t.rxBody },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/65 p-4 dark:border-white/10 dark:bg-white/6">
                    <item.icon className="h-5 w-5 text-[#148F77]" />
                    <p className="mt-3 font-semibold text-slate-950 dark:text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/65">{item.body}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </GlassPanel>

        <PharmaMarketStoreSummary locale={currentLocale} />

        <section className="grid gap-4 desktop:grid-cols-[0.9fr_1.1fr]">
          <GlassPanel level={1} className="p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">{t.categories}</p>
            <div className="mt-4 grid gap-3 tablet:grid-cols-2">
              {pharmamarketCategories.map((category) => (
                <Link
                  key={category.key}
                  href={`/${currentLocale}/pharmamarket${category.href}`}
                  className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4 font-semibold text-slate-800 transition hover:bg-white dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
                >
                  {category.title[currentLocale]}
                </Link>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel level={1} tone="blue" className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">{t.how}</p>
                <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{t.howBody}</p>
              </div>
              <Link href={`/${currentLocale}/pharmamarket/prescriptions`} className="rounded-full bg-[#2471A3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2f85bf]">
                {currentLocale === 'ar' ? 'ارفع الوصفة' : 'Upload now'}
              </Link>
            </div>
            <div className="mt-5 grid gap-3 tablet:grid-cols-4">
              {[
                { href: `/${currentLocale}/pharmamarket/catalog`, icon: ShoppingBag, label: currentLocale === 'ar' ? 'اختيار المنتجات' : 'Select products' },
                { href: `/${currentLocale}/pharmamarket/favorites`, icon: Heart, label: currentLocale === 'ar' ? 'حفظ المفضلة' : 'Save favorites' },
                { href: `/${currentLocale}/pharmamarket/alerts`, icon: Bell, label: currentLocale === 'ar' ? 'تفعيل التنبيه' : 'Create alert' },
                { href: `/${currentLocale}/pharmamarket/payment`, icon: Truck, label: currentLocale === 'ar' ? 'جاهزية الدفع' : 'Payment ready' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 transition hover:bg-white dark:border-white/12 dark:bg-white/8 dark:hover:bg-white/12">
                  <item.icon className="h-5 w-5 text-[#148F77]" />
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                </Link>
              ))}
            </div>
          </GlassPanel>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">{t.deals}</p>
              <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
                {currentLocale === 'ar' ? 'منتجات جاهزة للتسوق الآن' : 'Products ready for checkout now'}
              </p>
            </div>
            <Link href={`/${currentLocale}/pharmamarket/catalog`} className="text-sm font-semibold text-[#2471A3]">
              {currentLocale === 'ar' ? 'عرض الكتالوج كاملًا' : 'See full catalog'}
            </Link>
          </div>
          <div className="grid gap-4 desktop:grid-cols-3">
            {deals.map((product) => (
              <PharmaMarketProductCard key={product.id} locale={currentLocale} product={product} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 desktop:grid-cols-3">
          {[
            {
              href: `/${currentLocale}/pharmamarket/favorites`,
              title: currentLocale === 'ar' ? 'قائمة المفضلة' : 'Favorites list',
              body: currentLocale === 'ar' ? 'احفظ المنتجات المتكررة لتظهر في صفحة الدفع وإعادة الطلب.' : 'Save recurring products so they appear again in checkout and reorder flows.',
            },
            {
              href: `/${currentLocale}/pharmamarket/alerts`,
              title: currentLocale === 'ar' ? 'تنبيهات التوفر' : 'Availability alerts',
              body: currentLocale === 'ar' ? 'أبلغ العميل عبر واتساب وSMS عندما يتوفر المنتج أو يصل إلى مدينته.' : 'Notify the customer by WhatsApp and SMS when an item returns or reaches the selected city.',
            },
            {
              href: `/${currentLocale}/pharmamarket/orders`,
              title: currentLocale === 'ar' ? 'إعادة الطلب' : 'Reorder journey',
              body: currentLocale === 'ar' ? 'الطلبات السابقة قابلة للإرجاع إلى السلة مباشرة لاستكمال شراء جديد.' : 'Past orders can be restored back into the cart for a fresh checkout cycle.',
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <GlassPanel level={1} interactive className="h-full p-6">
                <p className="text-xl font-semibold text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/68">{item.body}</p>
              </GlassPanel>
            </Link>
          ))}
        </section>
      </div>
    </PharmaMarketShell>
  )
}
