import { Cairo, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { LocaleProvider } from '@/lib/i18n'
import { ThemeProviderWrapper } from '@/components/ui/theme-provider'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
})

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return {
    title: locale === 'ar' ? 'فارمابريدج' : 'PharmaBridge',
    description:
      locale === 'ar'
        ? 'منصة تشغيل دوائي موحدة للصيدليات والموزعين والمرضى والذكاء التجاري.'
        : 'A unified pharmaceutical operating system for pharmacies, distributors, patients, and intelligence.',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!['ar', 'en'].includes(locale)) {
    notFound()
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <div
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${plusJakartaSans.variable} ${cairo.variable} min-h-full antialiased`}
    >
      <ThemeProviderWrapper attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <LocaleProvider locale={locale} messages={messages}>
          {children}
        </LocaleProvider>
      </ThemeProviderWrapper>
    </div>
  )
}
