'use client'

import Link from 'next/link'
import { Bell, Heart, ReceiptText, ShoppingBag } from 'lucide-react'
import { GlassPanel } from '@/components/platform/glass-panel'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    favorites: 'المفضلة',
    cart: 'السلة',
    alerts: 'التنبيهات',
    orders: 'الطلبات',
  },
  en: {
    favorites: 'Favorites',
    cart: 'Cart',
    alerts: 'Alerts',
    orders: 'Orders',
  },
}

export function PharmaMarketStoreSummary({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const favorites = usePharmaMarketStore((state) => state.favorites.length)
  const cart = usePharmaMarketStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0))
  const alerts = usePharmaMarketStore((state) => state.alerts.length)
  const orders = usePharmaMarketStore((state) => state.orders.length)

  const items = [
    { label: t.favorites, value: favorites, href: `/${locale}/pharmamarket/favorites`, icon: Heart },
    { label: t.cart, value: cart, href: `/${locale}/pharmamarket/cart`, icon: ShoppingBag },
    { label: t.alerts, value: alerts, href: `/${locale}/pharmamarket/alerts`, icon: Bell },
    { label: t.orders, value: orders, href: `/${locale}/pharmamarket/orders`, icon: ReceiptText },
  ]

  return (
    <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <GlassPanel level={1} interactive className="p-5">
            <item.icon className="h-5 w-5 text-[#148F77]" />
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{item.value}</p>
          </GlassPanel>
        </Link>
      ))}
    </div>
  )
}
