'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/platform/glass-panel'
import { formatCurrency, getPharmaMarketProduct, productText } from '@/lib/pharmamarket-data'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    title: 'السلة',
    empty: 'لا توجد منتجات في السلة حاليًا.',
    checkout: 'إتمام الشراء',
    remove: 'إزالة',
  },
  en: {
    title: 'Cart',
    empty: 'There are no products in the cart yet.',
    checkout: 'Proceed to checkout',
    remove: 'Remove',
  },
}

export function PharmaMarketCartView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const cart = usePharmaMarketStore((state) => state.cart)
  const updateQuantity = usePharmaMarketStore((state) => state.updateQuantity)
  const removeFromCart = usePharmaMarketStore((state) => state.removeFromCart)

  const items = cart
    .map((item) => {
      const product = getPharmaMarketProduct(item.productId)
      if (!product) return null
      return { item, product, text: productText(product, locale) }
    })
    .filter(Boolean)

  const total = items.reduce((sum, entry) => sum + entry!.product.price * entry!.item.quantity, 0)

  if (!items.length) {
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
      {items.map((entry) => (
        <GlassPanel key={entry!.product.id} level={1} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">{entry!.text.name}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{entry!.text.pharmacy}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => updateQuantity(entry!.product.id, entry!.item.quantity - 1)}>-</Button>
              <span className="min-w-8 text-center">{entry!.item.quantity}</span>
              <Button variant="outline" size="sm" onClick={() => updateQuantity(entry!.product.id, entry!.item.quantity + 1)}>+</Button>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-950 dark:text-white">{formatCurrency(locale, entry!.product.price * entry!.item.quantity)}</p>
              <Button variant="ghost" size="sm" onClick={() => removeFromCart(entry!.product.id)}>
                {t.remove}
              </Button>
            </div>
          </div>
        </GlassPanel>
      ))}
      <GlassPanel level={2} className="flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-2xl font-bold text-slate-950 dark:text-white">{formatCurrency(locale, total)}</p>
        <Link href={`/${locale}/pharmamarket/checkout`} className="rounded-2xl bg-[#148F77] px-5 py-3 text-sm font-semibold text-white">
          {t.checkout}
        </Link>
      </GlassPanel>
    </div>
  )
}
