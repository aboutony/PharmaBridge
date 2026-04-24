import Link from 'next/link'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { type ActionItem, type AppLocale, getExperienceCopy, getModuleOverview, isArabic } from '@/lib/platform-content'

function ActionLink({ action, locale }: { action: ActionItem; locale: AppLocale }) {
  const baseClasses =
    action.variant === 'secondary'
      ? 'border border-slate-200/80 bg-white/75 hover:bg-white dark:border-white/20 dark:bg-white/8 dark:hover:bg-white/14'
      : action.variant === 'ghost'
        ? 'border border-transparent bg-transparent text-slate-700 hover:border-slate-200 hover:bg-white/70 dark:text-white/75 dark:hover:border-white/14 dark:hover:bg-white/8'
        : 'bg-[#148F77] shadow-[0_0_22px_rgba(20,143,119,0.28)] hover:bg-[#19a387]'

  return (
    <Link
      href={action.href}
      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold ${action.variant === 'primary' ? 'text-white' : 'text-slate-800 dark:text-white'} transition ${baseClasses}`}
    >
      {action.label}
      {locale === 'ar' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
    </Link>
  )
}

export function ModulePage({
  locale,
  moduleKey,
  children,
}: {
  locale: AppLocale
  moduleKey: keyof ReturnType<typeof getModuleOverview>
  children?: React.ReactNode
}) {
  const copy = getExperienceCopy(locale)
  const moduleContent = getModuleOverview(locale)[moduleKey]
  const rtl = isArabic(locale)

  return (
    <PlatformShell locale={locale}>
      <main id="main-content" className="px-4 pt-10 tablet:px-6 desktop:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <GlassPanel level={2} className="overflow-hidden px-6 py-8 tablet:px-10">
            <div className="grid gap-8 desktop:grid-cols-[1.2fr_0.8fr] desktop:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-600 dark:border-white/14 dark:bg-white/6 dark:text-white/60">
                  <Sparkles className="h-3.5 w-3.5" />
                  {copy.modules.title}
                </div>
                <h1 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white tablet:text-5xl">
                  {moduleContent.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-white/68">{moduleContent.summary}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {moduleContent.actions.map((action) => (
                    <ActionLink key={action.href + action.label} action={action} locale={locale} />
                  ))}
                </div>
              </div>

              <GlassPanel level={1} className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                  {pickSide(locale, 'الوحدات المرتبطة', 'Connected modules')}
                </p>
                <div className="mt-4 grid gap-3">
                  {copy.modules.items.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-4 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/6 dark:text-white/75 dark:hover:border-white/24 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-950 dark:text-white">{item.name}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-white/55">{item.description}</p>
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">{item.phase}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </GlassPanel>

          <section className="grid gap-4 tablet:grid-cols-3">
            {moduleContent.stats.map((stat) => (
              <GlassPanel key={stat.title} level={1} tone={stat.tone} className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">{stat.title}</p>
                <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/58">{stat.caption}</p>
              </GlassPanel>
            ))}
          </section>

          <section className="grid gap-4 tablet:grid-cols-3">
            {moduleContent.details.map((detail) => (
              <GlassPanel key={detail.title} level={1} interactive className="p-6">
                <p className="text-lg font-semibold text-slate-950 dark:text-white">{detail.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/62">{detail.body}</p>
                {detail.href && (
                  <Link href={detail.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#60A8D4] hover:text-white">
                    {pickSide(locale, 'افتح المسار', 'Open path')}
                    {rtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </Link>
                )}
              </GlassPanel>
            ))}
          </section>

          {children}
        </div>
      </main>
    </PlatformShell>
  )
}

function pickSide(locale: AppLocale, arabic: string, english: string) {
  return locale === 'ar' ? arabic : english
}
