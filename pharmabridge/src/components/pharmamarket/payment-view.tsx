'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/platform/glass-panel'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    title: 'صفحة الدفع الجاهزة',
    body: 'ممرات الدفع النهائية ستُربط لاحقًا، لكن رحلة الدفع والطلب جاهزة الآن.',
    methods: ['الدفع عند الاستلام', 'بطاقة بنكية (جاهز للربط)', 'محفظة رقمية (جاهز للربط)'],
    confirm: 'تأكيد الطلب',
  },
  en: {
    title: 'Payment-ready page',
    body: 'Final gateways will be connected later, but the payment and order-confirmation flow is already prepared.',
    methods: ['Cash on delivery', 'Card gateway (integration ready)', 'Digital wallet (integration ready)'],
    confirm: 'Confirm order',
  },
}

export function PharmaMarketPaymentView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const router = useRouter()
  const placeOrder = usePharmaMarketStore((state) => state.placeOrder)
  const [selectedMethod, setSelectedMethod] = useState(t.methods[0])

  return (
    <GlassPanel level={2} className="space-y-5 p-8">
      <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
      <p className="text-sm leading-7 text-slate-600 dark:text-white/65">{t.body}</p>
      <div className="grid gap-3">
        {t.methods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setSelectedMethod(method)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              selectedMethod === method
                ? 'border-[#148F77] bg-[#148F77]/10'
                : 'border-slate-200/80 bg-white/75 dark:border-white/12 dark:bg-white/8'
            }`}
          >
            {method}
          </button>
        ))}
      </div>
      <Button
        className="rounded-2xl bg-[#148F77] text-white hover:bg-[#19a387]"
        onClick={() => {
          placeOrder()
          router.push(`/${locale}/pharmamarket/orders`)
        }}
      >
        {t.confirm}
      </Button>
    </GlassPanel>
  )
}
