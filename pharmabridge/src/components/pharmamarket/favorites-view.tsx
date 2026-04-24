'use client'

import Link from 'next/link'
import { GlassPanel } from '@/components/platform/glass-panel'
import { pharmamarketProducts } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'
import { PharmaMarketProductCard } from './product-card'

const copy = {
  ar: {
    title: 'المفضلة',
    empty: 'لا توجد عناصر محفوظة بعد. أضف المنتجات التي تريد الرجوع إليها لاحقًا.',
    catalog: 'اذهب إلى الكتالوج',
  },
  en: {
    title: 'Favorites',
    empty: 'No saved items yet. Add products you want to revisit later.',
    catalog: 'Go to catalog',
  },
}

export function PharmaMarketFavoritesView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const favorites = usePharmaMarketStore((state) => state.favorites)
  const products = pharmamarketProducts.filter((product) => favorites.includes(product.id))

  if (!products.length) {
    return (
      <GlassPanel level={2} className="p-8 text-center">
        <p className="text-2xl font-bold text-slate-950 dark:text-white">{t.title}</p>
        <p className="mt-3 text-slate-600 dark:text-white/65">{t.empty}</p>
        <Link href={`/${locale}/pharmamarket/catalog`} className="mt-5 inline-flex rounded-2xl bg-[#148F77] px-5 py-3 text-sm font-semibold text-white">
          {t.catalog}
        </Link>
      </GlassPanel>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
      <div className="grid gap-4 desktop:grid-cols-3">
        {products.map((product) => (
          <PharmaMarketProductCard key={product.id} locale={locale} product={product} />
        ))}
      </div>
    </div>
  )
}
