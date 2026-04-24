import Link from 'next/link'
import { Bell, Heart, ShoppingBag, ShieldCheck, Truck, Upload } from 'lucide-react'
import { GlassPanel } from '@/components/platform/glass-panel'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import type { AppLocale } from '@/lib/platform-content'

const navCopy = {
  ar: {
    brand: 'فارماماركت',
    sub: 'بوابة المرضى',
    home: 'الرئيسية',
    catalog: 'الكتالوج',
    favorites: 'المفضلة',
    prescriptions: 'الوصفات',
    alerts: 'التنبيهات',
    cart: 'السلة',
    orders: 'طلباتي',
    bridge: 'عودة إلى المنصة',
  },
  en: {
    brand: 'PharmaMarket',
    sub: 'Consumer Portal',
    home: 'Home',
    catalog: 'Catalog',
    favorites: 'Favorites',
    prescriptions: 'Prescriptions',
    alerts: 'Alerts',
    cart: 'Cart',
    orders: 'Orders',
    bridge: 'Back to platform',
  },
}

export function PharmaMarketShell({
  locale,
  children,
}: {
  locale: AppLocale
  children: React.ReactNode
}) {
  const copy = navCopy[locale]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#E5F7F1_0%,#F4FAFC_38%,#EAF3F8_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top,#10243D_0%,#0A1222_48%,#09101C_100%)] dark:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-5%] top-[-8%] h-[34rem] w-[34rem] rounded-full bg-[#148F77]/12 blur-[120px] dark:bg-[#148F77]/20" />
        <div className="absolute bottom-[-12%] right-[-4%] h-[30rem] w-[30rem] rounded-full bg-[#2471A3]/12 blur-[120px] dark:bg-[#2471A3]/20" />
      </div>

      <header className="sticky top-0 z-40 px-4 pt-4 tablet:px-6 desktop:px-8">
        <GlassPanel level={2} className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#148F77_0%,#2471A3_100%)] text-white shadow-[0_0_20px_rgba(20,143,119,0.25)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold">{copy.brand}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-white/55">{copy.sub}</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {[
              { href: `/${locale}/pharmamarket`, label: copy.home },
              { href: `/${locale}/pharmamarket/catalog`, label: copy.catalog },
              { href: `/${locale}/pharmamarket/favorites`, label: copy.favorites, icon: Heart },
              { href: `/${locale}/pharmamarket/prescriptions`, label: copy.prescriptions, icon: Upload },
              { href: `/${locale}/pharmamarket/alerts`, label: copy.alerts, icon: Bell },
              { href: `/${locale}/pharmamarket/cart`, label: copy.cart, icon: ShoppingBag },
              { href: `/${locale}/pharmamarket/orders`, label: copy.orders, icon: Truck },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-2 text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-white/12 dark:bg-white/8 dark:text-white/75 dark:hover:border-white/24 dark:hover:text-white"
              >
                {item.icon ? <item.icon className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href={`/${locale}`}
              className="rounded-full bg-[#148F77] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#19a387]"
            >
              {copy.bridge}
            </Link>
          </div>
        </GlassPanel>
      </header>

      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 tablet:px-6 desktop:px-8">
        {children}
      </main>
    </div>
  )
}
