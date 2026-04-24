'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { GlassPanel } from '@/components/platform/glass-panel'
import { pharmamarketProducts } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { PharmaMarketProductCard } from './product-card'

const copy = {
  ar: {
    title: 'كتالوج فارماماركت',
    subtitle: 'استكشف المنتجات حسب الدواء أو التصنيف أو اسم الصيدلية.',
    search: 'ابحث عن دواء أو صيدلية',
  },
  en: {
    title: 'PharmaMarket catalog',
    subtitle: 'Browse products by medicine, category, or pharmacy.',
    search: 'Search medicine or pharmacy',
  },
}

export function PharmaMarketCatalogView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return pharmamarketProducts

    return pharmamarketProducts.filter((product) => {
      const values = [
        product.name[locale],
        product.description[locale],
        product.category[locale],
        product.pharmacy[locale],
      ]
      return values.some((value) => value.toLowerCase().includes(normalized))
    })
  }, [locale, query])

  return (
    <div className="space-y-6">
      <GlassPanel level={2} className="p-6">
        <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{t.subtitle}</p>
        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/40" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search}
            className="border-slate-200/80 bg-white/75 pl-10 text-slate-900 dark:border-white/12 dark:bg-white/8 dark:text-white"
          />
        </div>
      </GlassPanel>

      <div className="grid gap-4 desktop:grid-cols-3">
        {filtered.map((product) => (
          <PharmaMarketProductCard key={product.id} locale={locale} product={product} />
        ))}
      </div>
    </div>
  )
}
