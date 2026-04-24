'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassPanel } from '@/components/platform/glass-panel'
import { getPharmaMarketProduct, pharmamarketProducts, productText } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    title: 'تنبيهات التوفر',
    body: 'اختر المنتج والمدينة وقناة الإشعار. سنجهز التنبيه عبر واتساب و/أو SMS عند توفر المنتج.',
    city: 'المدينة',
    save: 'حفظ التنبيه',
    whatsapp: 'واتساب',
    sms: 'SMS',
    saved: 'التنبيه محفوظ',
    remove: 'إزالة',
  },
  en: {
    title: 'Availability alerts',
    body: 'Choose the product, city, and channel. The portal will be ready to notify customers by WhatsApp and/or SMS once it becomes available.',
    city: 'City',
    save: 'Save alert',
    whatsapp: 'WhatsApp',
    sms: 'SMS',
    saved: 'Alert saved',
    remove: 'Remove',
  },
}

export function PharmaMarketAlertsView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const searchParams = useSearchParams()
  const initialProduct = searchParams.get('product')
  const [selectedProductId, setSelectedProductId] = useState(getPharmaMarketProduct(initialProduct ?? '')?.id ?? pharmamarketProducts[0].id)
  const [city, setCity] = useState(locale === 'ar' ? 'دمشق' : 'Damascus')
  const [whatsapp, setWhatsapp] = useState(true)
  const [sms, setSms] = useState(false)
  const alerts = usePharmaMarketStore((state) => state.alerts)
  const saveAlert = usePharmaMarketStore((state) => state.saveAlert)
  const removeAlert = usePharmaMarketStore((state) => state.removeAlert)

  const selectedProduct = useMemo(
    () => pharmamarketProducts.find((product) => product.id === selectedProductId) ?? pharmamarketProducts[0],
    [selectedProductId],
  )

  return (
    <div className="space-y-6">
      <GlassPanel level={2} className="p-6">
        <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{t.body}</p>
        <div className="mt-5 grid gap-4 tablet:grid-cols-2">
          <select
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            className="min-h-11 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-slate-900 dark:border-white/12 dark:bg-white/8 dark:text-white"
          >
            {pharmamarketProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name[locale]}
              </option>
            ))}
          </select>
          <Input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder={t.city}
            className="border-slate-200/80 bg-white/80 text-slate-900 dark:border-white/12 dark:bg-white/8 dark:text-white"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-white/75">
            <input type="checkbox" checked={whatsapp} onChange={(event) => setWhatsapp(event.target.checked)} />
            {t.whatsapp}
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-white/75">
            <input type="checkbox" checked={sms} onChange={(event) => setSms(event.target.checked)} />
            {t.sms}
          </label>
        </div>
        <Button
          className="mt-5 rounded-2xl bg-[#148F77] text-white hover:bg-[#19a387]"
          onClick={() => saveAlert({ productId: selectedProduct.id, city, whatsapp, sms })}
        >
          {t.save}
        </Button>
      </GlassPanel>

      <div className="grid gap-4">
        {alerts.map((alert) => {
          const product = getPharmaMarketProduct(alert.productId)
          if (!product) return null
          const text = productText(product, locale)
          return (
            <GlassPanel key={alert.productId} level={1} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">{text.name}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-white/65">
                    {alert.city} • {alert.whatsapp ? t.whatsapp : ''} {alert.whatsapp && alert.sms ? '+ ' : ''}{alert.sms ? t.sms : ''}
                  </p>
                </div>
                <Button variant="outline" className="rounded-2xl" onClick={() => removeAlert(alert.productId)}>
                  {t.remove}
                </Button>
              </div>
            </GlassPanel>
          )
        })}
      </div>
    </div>
  )
}
