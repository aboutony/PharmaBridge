import Link from 'next/link'
import { ArrowLeft, ArrowRight, Brain, ChartColumn, Link2, PackageSearch, ShoppingCart, Sparkles, UserRoundPlus, WifiOff } from 'lucide-react'
import { GlassPanel } from '@/components/platform/glass-panel'
import { PlatformShell } from '@/components/platform/platform-shell'
import { getExperienceCopy, getModuleOverview, isArabic, type AppLocale } from '@/lib/platform-content'

const moduleIcons = {
  pims: PackageSearch,
  'distributor-link': Link2,
  'pharma-market': ShoppingCart,
  'bridge-intel': ChartColumn,
  pharmai: Brain,
  enablement: UserRoundPlus,
}

export function PlatformHome({ locale }: { locale: AppLocale }) {
  const copy = getExperienceCopy(locale)
  const modules = getModuleOverview(locale)
  const rtl = isArabic(locale)
  const Arrow = rtl ? ArrowLeft : ArrowRight

  return (
    <PlatformShell locale={locale}>
      <main id="main-content" className="px-4 pt-10 tablet:px-6 desktop:px-8">
        <div className="section-shell flex flex-col gap-8">
          <section className="grid min-h-[min(100vh,56rem)] gap-8 py-8 desktop:grid-cols-[1.1fr_0.9fr] desktop:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
                <Sparkles className="h-4 w-4" />
                {copy.hero.eyebrow}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] text-glass-primary tablet:text-7xl">
                  {copy.hero.title}
                </h1>
                <p className="max-w-3xl text-xl leading-9 text-glass-secondary">
                  {copy.hero.subtitle}
                </p>
                <p className="max-w-2xl text-base leading-8 text-glass-secondary">
                  {copy.hero.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[copy.hero.primaryCta, copy.hero.secondaryCta].map((action, index) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      index === 0
                        ? 'inline-flex items-center gap-2 rounded-2xl bg-[#148F77] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(20,143,119,0.32)] transition hover:scale-[1.01] hover:bg-[#19a387]'
                        : 'inline-flex items-center gap-2 rounded-2xl border border-white/18 bg-white/8 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/12'
                    }
                  >
                    {action.label}
                    <Arrow className="h-4 w-4" />
                  </Link>
                ))}
              </div>

              <div className="grid gap-4 tablet:grid-cols-4">
                {copy.hero.stats.map((stat) => (
                  <GlassPanel key={stat.label} level={1} className="p-5">
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-glass-secondary">{stat.label}</p>
                  </GlassPanel>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <GlassPanel level={2} tone="teal" className="overflow-hidden p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                      {locale === 'ar' ? 'إدارة مخزون الصيدلية' : 'PIMS'}
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">
                      {modules.pims.title}
                    </p>
                  </div>
                  <Link href={`/${locale}/pharmacy/dashboard`} className="rounded-full bg-[#148F77]/18 px-3 py-1 text-xs font-semibold text-[#84f0db]">
                    {locale === 'ar' ? 'افتح الوحدة' : 'Open module'}
                  </Link>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    {
                      title: locale === 'ar' ? 'أموكسيسيلين 500mg' : 'Amoxicillin 500mg',
                      stock: locale === 'ar' ? 'مخزون منخفض' : 'Low stock',
                      value: '12',
                    },
                    {
                      title: locale === 'ar' ? 'باراسيتامول 500mg' : 'Paracetamol 500mg',
                      stock: locale === 'ar' ? 'جاهز للبيع' : 'Ready to sell',
                      value: '320',
                    },
                    {
                      title: locale === 'ar' ? 'أوميبرازول 20mg' : 'Omeprazole 20mg',
                      stock: locale === 'ar' ? 'قرب انتهاء' : 'Near expiry',
                      value: '18',
                    },
                  ].map((item, index) => (
                    <GlassPanel key={item.title} level={1} className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-xs text-glass-secondary">{item.stock}</p>
                        </div>
                        <div className="rounded-2xl bg-white/8 px-3 py-2 text-lg font-bold text-white">{item.value}</div>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${
                            index === 0 ? 'bg-[#D4771A]' : index === 1 ? 'bg-[#1E8449]' : 'bg-[#C0392B]'
                          }`}
                          style={{ width: `${index === 0 ? 35 : index === 1 ? 88 : 22}%` }}
                        />
                      </div>
                    </GlassPanel>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel level={1} tone="blue" className="p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                  {locale === 'ar' ? 'ربط الموزعين' : 'DistributorLink'}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{modules.distributorLink.summary}</p>
                <div className="mt-4 grid gap-3">
                  {[
                    locale === 'ar'
                      ? { name: 'موزع دمشق فارما', meta: 'متوفر فورًا • ساعتان', price: '12,500 ل.س' }
                      : { name: 'Damascus Pharma', meta: 'In stock • 2 hours', price: '12,500 SYP' },
                    locale === 'ar'
                      ? { name: 'الشام الطبية', meta: 'مخزون متوسط • 24 ساعة', price: '11,800 ل.س' }
                      : { name: 'AlSham Medical', meta: 'Limited stock • 24 hours', price: '11,800 SYP' },
                  ].map((offer) => (
                    <Link key={offer.name} href={`/${locale}/distributor/dashboard`} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 transition hover:border-white/24 hover:bg-white/10">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">{offer.name}</p>
                          <p className="mt-1 text-xs text-glass-secondary">{offer.meta}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#84f0db]">{offer.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </section>

          <section className="grid gap-4 desktop:grid-cols-4" id="reality">
            {copy.reality.items.map((item) => (
              <GlassPanel key={item.title} level={1} className="border border-[#C0392B]/30 bg-[#C0392B]/8 p-6">
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.body}</p>
              </GlassPanel>
            ))}
          </section>

          <section id="ecosystem" className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-glass-muted">{copy.modules.title}</p>
              <h2 className="text-3xl font-bold text-glass-primary tablet:text-4xl">
                {locale === 'ar' ? 'الرحلة الموحدة بين كل وحدات المنصة' : 'One connected journey across every module'}
              </h2>
            </div>
            <div className="grid gap-4 desktop:grid-cols-3">
              {copy.modules.items.map((item) => {
                const Icon = moduleIcons[item.key as keyof typeof moduleIcons] ?? Sparkles
                return (
                  <Link key={item.key} href={item.href}>
                    <GlassPanel level={1} tone={item.tone} interactive className="h-full p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xl font-semibold text-white">{item.name}</p>
                            <p className="mt-3 text-sm leading-7 text-glass-secondary">{item.description}</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-white/12 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
                          {item.phase}
                        </span>
                      </div>
                    </GlassPanel>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-glass-muted">{copy.howItWorks.title}</p>
              <h2 className="text-3xl font-bold text-glass-primary tablet:text-4xl">
                {locale === 'ar' ? 'من التنبيه إلى القرار ثم التنفيذ' : 'From alert to decision to execution'}
              </h2>
            </div>
            <div className="grid gap-4 desktop:grid-cols-3">
              {copy.howItWorks.steps.map((step, index) => (
                <GlassPanel key={step.title} level={1} className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/8 text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-5 text-xl font-semibold text-white">{step.title}</p>
                  <p className="mt-3 text-sm leading-7 text-glass-secondary">{step.body}</p>
                </GlassPanel>
              ))}
            </div>
          </section>

          <section className="grid gap-6 desktop:grid-cols-[1.15fr_0.85fr]" id="pharmacies">
            <GlassPanel level={2} tone="amber" className="p-6 tablet:p-8">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.2em] text-glass-muted">
                  {locale === 'ar' ? 'للصيدليات' : 'For pharmacies'}
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {locale === 'ar' ? 'لوحة تشغيل تربط المخزون بالتوريد والتحليل' : 'An operating board that ties stock to sourcing and insight'}
                </h2>
                <div className="grid gap-3">
                  {modules.pims.details.map((detail) => (
                    <Link key={detail.title} href={detail.href ?? `/${locale}/pharmacy/dashboard`} className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 transition hover:bg-white/10">
                      <p className="font-semibold text-white">{detail.title}</p>
                      <p className="mt-2 text-sm leading-7 text-glass-secondary">{detail.body}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </GlassPanel>
            <GlassPanel level={1} tone="teal" className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-glass-muted">
                {locale === 'ar' ? 'الإجراء التالي' : 'Next move'}
              </p>
              <div className="mt-4 space-y-3">
                {modules.pims.actions.map((action) => (
                  <Link key={action.href} href={action.href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                    {action.label}
                    <Arrow className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </GlassPanel>
          </section>

          <section className="grid gap-6 desktop:grid-cols-[0.85fr_1.15fr]" id="distributors">
            <GlassPanel level={1} tone="blue" className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-glass-muted">
                {locale === 'ar' ? 'جاهزية الموزع' : 'Distributor readiness'}
              </p>
              <div className="mt-4 space-y-3">
                {modules.enablement.details.map((detail) => (
                  <Link key={detail.title} href={detail.href ?? `/${locale}/distributor/enablement`} className="block rounded-2xl border border-white/10 bg-white/6 px-4 py-4 transition hover:bg-white/10">
                    <p className="font-semibold text-white">{detail.title}</p>
                    <p className="mt-2 text-sm leading-7 text-glass-secondary">{detail.body}</p>
                  </Link>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel level={2} tone="teal" className="p-6 tablet:p-8">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.2em] text-glass-muted">
                  {locale === 'ar' ? 'للموزعين' : 'For distributors'}
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {locale === 'ar' ? 'تجربة موحدة من عرض الكتالوج إلى تنفيذ الطلب' : 'One route from catalog exposure to fulfilled order'}
                </h2>
                <div className="grid gap-3">
                  {modules.distributorLink.details.map((detail) => (
                    <Link key={detail.title} href={detail.href ?? `/${locale}/distributor/dashboard`} className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 transition hover:bg-white/10">
                      <p className="font-semibold text-white">{detail.title}</p>
                      <p className="mt-2 text-sm leading-7 text-glass-secondary">{detail.body}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </section>

          <section id="intelligence" className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
            {copy.trust.items.map((item, index) => (
              <GlassPanel key={item.title} level={1} className="p-6" tone={index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'teal' : 'purple'}>
                {index === 0 && <WifiOff className="h-5 w-5 text-white/70" />}
                <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-glass-secondary">{item.body}</p>
              </GlassPanel>
            ))}
          </section>

          <section className="grid gap-4 tablet:grid-cols-4">
            {copy.socialProof.stats.map((stat) => (
              <GlassPanel key={stat.label} level={3} className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-glass-muted">{stat.label}</p>
                <p className="mt-4 text-5xl font-extrabold text-white">{stat.value}</p>
              </GlassPanel>
            ))}
          </section>

          <section id="waitlist" className="py-6">
            <GlassPanel level={2} tone="teal" className="mx-auto max-w-3xl px-8 py-10 text-center">
              <h2 className="text-4xl font-bold text-white">{copy.cta.title}</h2>
              <p className="mt-4 text-base leading-8 text-glass-secondary">{copy.cta.body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[copy.cta.primary, copy.cta.secondary].map((action, index) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      index === 0
                        ? 'inline-flex items-center gap-2 rounded-2xl bg-[#148F77] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(20,143,119,0.32)] transition hover:bg-[#19a387]'
                        : 'inline-flex items-center gap-2 rounded-2xl bg-[#2471A3] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(36,113,163,0.25)] transition hover:bg-[#2f85bf]'
                    }
                  >
                    {action.label}
                    <Arrow className="h-4 w-4" />
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-sm text-glass-secondary">{copy.cta.waitlist}</p>
            </GlassPanel>
          </section>
        </div>
      </main>
    </PlatformShell>
  )
}
