'use client'

import Link from 'next/link'
import { Bell, Heart, ShoppingCart, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    cart: 'أضف إلى السلة',
    favorite: 'أضف إلى المفضلة',
    alert: 'أنشئ تنبيه',
    upload: 'ارفع وصفة',
  },
  en: {
    cart: 'Add to cart',
    favorite: 'Add to favorites',
    alert: 'Create alert',
    upload: 'Upload prescription',
  },
}

export function PharmaMarketProductActions({
  locale,
  productId,
  requiresPrescription,
  inStock,
}: {
  locale: AppLocale
  productId: string
  requiresPrescription?: boolean
  inStock: boolean
}) {
  const t = copy[locale]
  const addToCart = usePharmaMarketStore((state) => state.addToCart)
  const toggleFavorite = usePharmaMarketStore((state) => state.toggleFavorite)

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        className="rounded-2xl bg-[#148F77] text-white hover:bg-[#19a387]"
        onClick={() => addToCart(productId)}
        disabled={!inStock}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {t.cart}
      </Button>
      <Button variant="outline" className="rounded-2xl" onClick={() => toggleFavorite(productId)}>
        <Heart className="mr-2 h-4 w-4" />
        {t.favorite}
      </Button>
      <Button asChild variant="outline" className="rounded-2xl">
        <Link href={`/${locale}/pharmamarket/alerts?product=${productId}`}>
          <Bell className="mr-2 h-4 w-4" />
          {t.alert}
        </Link>
      </Button>
      {requiresPrescription ? (
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href={`/${locale}/pharmamarket/prescriptions`}>
            <Upload className="mr-2 h-4 w-4" />
            {t.upload}
          </Link>
        </Button>
      ) : null}
    </div>
  )
}
