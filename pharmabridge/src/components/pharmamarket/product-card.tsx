'use client'

import Link from 'next/link'
import { Bell, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GlassPanel } from '@/components/platform/glass-panel'
import { formatCurrency, productText, type PharmaMarketProduct } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const cardCopy = {
  ar: {
    addToCart: 'أضف إلى السلة',
    notify: 'أبلغني',
    details: 'التفاصيل',
    favorite: 'المفضلة',
    out: 'غير متوفر الآن',
    rx: 'وصفة مطلوبة',
  },
  en: {
    addToCart: 'Add to cart',
    notify: 'Notify me',
    details: 'Details',
    favorite: 'Favorite',
    out: 'Unavailable now',
    rx: 'Rx required',
  },
}

export function PharmaMarketProductCard({
  locale,
  product,
}: {
  locale: AppLocale
  product: PharmaMarketProduct
}) {
  const copy = cardCopy[locale]
  const text = productText(product, locale)
  const favorites = usePharmaMarketStore((state) => state.favorites)
  const addToCart = usePharmaMarketStore((state) => state.addToCart)
  const toggleFavorite = usePharmaMarketStore((state) => state.toggleFavorite)
  const isFavorite = favorites.includes(product.id)

  return (
    <GlassPanel level={1} interactive className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">{text.category}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{text.name}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{text.pharmacy}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(product.id)}
          aria-label={copy.favorite}
          className="rounded-full border border-slate-200/70 bg-white/70 text-slate-700 hover:bg-white dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-[#C0392B]' : ''}`} />
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {text.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="border-slate-200/70 bg-white/70 text-slate-700 dark:border-white/12 dark:bg-white/8 dark:text-white/80">
            {tag}
          </Badge>
        ))}
        {product.requiresPrescription ? (
          <Badge variant="secondary" className="border-[#C0392B]/25 bg-[#C0392B]/10 text-[#C0392B] dark:text-[#F3A6A0]">
            {copy.rx}
          </Badge>
        ) : null}
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-white/68">{text.description}</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-2xl font-extrabold text-slate-950 dark:text-white">{formatCurrency(locale, product.price)}</p>
          {product.originalPrice ? (
            <p className="text-sm text-slate-400 line-through dark:text-white/40">{formatCurrency(locale, product.originalPrice)}</p>
          ) : null}
        </div>
        <p className="text-sm text-slate-500 dark:text-white/55">{text.city}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <Button
          onClick={() => addToCart(product.id)}
          disabled={!product.inStock}
          className="flex-1 rounded-2xl bg-[#148F77] text-white hover:bg-[#19a387] disabled:bg-slate-300 dark:disabled:bg-slate-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? copy.addToCart : copy.out}
        </Button>
        <Button asChild variant="outline" className="rounded-2xl border-slate-200/80 bg-white/70 text-slate-700 hover:bg-white dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12">
          <Link href={`/${locale}/pharmamarket/product/${product.slug}`}>{copy.details}</Link>
        </Button>
        {!product.inStock ? (
          <Button asChild variant="outline" className="rounded-2xl border-slate-200/80 bg-white/70 text-slate-700 hover:bg-white dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12">
            <Link href={`/${locale}/pharmamarket/alerts?product=${product.slug}`}>
              <Bell className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </GlassPanel>
  )
}
