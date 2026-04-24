'use client'

import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/platform/glass-panel'
import { formatCurrency } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    title: 'الطلبات وإعادة الطلب',
    empty: 'لا توجد طلبات بعد. أكمل الدفع لإنشاء أول طلب.',
    reorder: 'إعادة الطلب',
  },
  en: {
    title: 'Orders and reorders',
    empty: 'There are no orders yet. Complete payment to create the first order.',
    reorder: 'Reorder',
  },
}

export function PharmaMarketOrdersView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const orders = usePharmaMarketStore((state) => state.orders)
  const reorder = usePharmaMarketStore((state) => state.reorder)

  if (!orders.length) {
    return (
      <GlassPanel level={2} className="p-8 text-center">
        <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
        <p className="mt-3 text-slate-600 dark:text-white/65">{t.empty}</p>
      </GlassPanel>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
      {orders.map((order) => (
        <GlassPanel key={order.id} level={1} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">{order.id}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-white/65">
                {new Date(order.createdAt).toLocaleString(locale === 'ar' ? 'ar-SY' : 'en-US')}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-950 dark:text-white">{formatCurrency(locale, order.total)}</p>
              <Button variant="outline" className="mt-3 rounded-2xl" onClick={() => reorder(order.id)}>
                {t.reorder}
              </Button>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  )
}
