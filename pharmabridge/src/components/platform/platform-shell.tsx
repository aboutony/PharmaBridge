import Link from 'next/link'
import { Package2 } from 'lucide-react'
import { GlassPanel } from '@/components/platform/glass-panel'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { isDemoEnvironment } from '@/lib/env'
import { getExperienceCopy, type AppLocale } from '@/lib/platform-content'

export function PlatformShell({
  locale,
  children,
}: {
  locale: AppLocale
  children: React.ReactNode
}) {
  const copy = getExperienceCopy(locale)
  const showDemoMode = isDemoEnvironment()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#0A0F1E_0%,#0D1729_50%,#132236_100%)] text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[#148F77] focus:px-4 focus:py-2 focus:text-white"
      >
        {locale === 'ar' ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-[-6%] h-[56rem] w-[56rem] rounded-full bg-[#148F77]/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-4%] h-[44rem] w-[44rem] rounded-full bg-[#2471A3]/20 blur-[120px]" />
        <div className="absolute right-[20%] top-[38%] h-[32rem] w-[32rem] rounded-full bg-[#1E8449]/12 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <header className="sticky top-0 z-50 px-4 pt-4 tablet:px-6 desktop:px-8">
        <GlassPanel level={2} className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 tablet:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#148F77_0%,#2471A3_100%)] shadow-[0_0_28px_rgba(20,143,119,0.28)]">
              <Package2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold">{locale === 'ar' ? copy.brandArabic : copy.brandEnglish}</span>
                {showDemoMode && (
                  <span className="rounded-full border border-[#148F77]/45 bg-[#148F77]/18 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8EF0D5]">
                    {locale === 'ar' ? 'الوضع التجريبي' : 'DEMO MODE'}
                  </span>
                )}
              </div>
              <span className="text-xs uppercase tracking-[0.24em] text-white/55">
                {locale === 'ar' ? 'منصة دوائية موحدة' : 'Unified Pharma OS'}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 desktop:flex">
            {copy.nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href={`/${locale}/auth/register`}
              className="hidden rounded-2xl bg-[#148F77] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(20,143,119,0.32)] transition hover:scale-[1.01] hover:bg-[#19a387] tablet:inline-flex"
            >
              {copy.requestDemo}
            </Link>
          </div>
        </GlassPanel>
      </header>

      <div className="pb-20">{children}</div>

      <footer className="px-4 pb-8 tablet:px-6 desktop:px-8">
        <GlassPanel level={1} className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 desktop:grid-cols-[1.2fr_2fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#148F77_0%,#2471A3_100%)]">
                  <Package2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{locale === 'ar' ? copy.brandArabic : copy.brandEnglish}</p>
                  <p className="text-sm text-white/55">{copy.footer.mission}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 tablet:grid-cols-3">
              {copy.footer.columns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                    {column.title}
                  </p>
                  <div className="flex flex-col gap-2">
                    {column.links.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm text-white/72 transition hover:text-white">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-4 text-sm text-white/55">
            {copy.footer.copyright}
          </div>
        </GlassPanel>
      </footer>
    </div>
  )
}
