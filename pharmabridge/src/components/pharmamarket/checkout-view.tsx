'use client'

import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { formatCurrency, getPharmaMarketProduct, productText } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    title: 'صفحة السداد',
    favorites: 'مفضلاتك للطلبات القادمة',
    reorder: 'طلباتك القابلة لإعادة الشراء',
    payment: 'الانتقال إلى صفحة الدفع',
  },
  en: {
    title: 'Checkout',
    favorites: 'Favorites for future orders',
    reorder: 'Items ready for reorder',
    payment: 'Continue to payment',
  },
}

export function PharmaMarketCheckoutView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const cart = usePharmaMarketStore((state) => state.cart)
  const favorites = usePharmaMarketStore((state) => state.favorites)
  const orders = usePharmaMarketStore((state) => state.orders)
  const prescriptions = usePharmaMarketStore((state) => state.prescriptions)

  const total = cart.reduce((sum, item) => {
    const product = getPharmaMarketProduct(item.productId)
    return sum + (product?.price ?? 0) * item.quantity
  }, 0)

  return (
    <div className="space-y-6">
      <GlassPanel level={2} className="p-6">
        <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
          {locale === 'ar'
            ? `إجمالي السلة الحالية ${formatCurrency(locale, total)} مع ${prescriptions.length} وصفات مرفوعة جاهزة للمراجعة.`
            : `Current cart total ${formatCurrency(locale, total)} with ${prescriptions.length} uploaded prescriptions ready for review.`}
        </p>
        <Link href={`/${locale}/pharmamarket/payment`} className="mt-5 inline-flex rounded-2xl bg-[#148F77] px-5 py-3 text-sm font-semibold text-white">
          {t.payment}
        </Link>
      </GlassPanel>

      <div className="grid gap-4 desktop:grid-cols-2">
        <GlassPanel level={1} className="p-6">
          <p className="text-xl font-semibold text-slate-950 dark:text-white">{t.favorites}</p>
          <div className="mt-4 space-y-3">
            {favorites.slice(0, 3).map((id) => {
              const product = getPharmaMarketProduct(id)
              if (!product) return null
              const text = productText(product, locale)
              return (
                <div key={id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/12 dark:bg-white/8">
                  <p className="font-semibold text-slate-950 dark:text-white">{text.name}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{formatCurrency(locale, product.price)}</p>
                </div>
              )
            })}
          </div>
        </GlassPanel>

        <GlassPanel level={1} className="p-6">
          <p className="text-xl font-semibold text-slate-950 dark:text-white">{t.reorder}</p>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/12 dark:bg-white/8">
                <p className="font-semibold text-slate-950 dark:text-white">{order.id}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{formatCurrency(locale, order.total)}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
