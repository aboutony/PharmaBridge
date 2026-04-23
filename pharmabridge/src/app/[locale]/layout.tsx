import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { QueryProvider } from '@/components/ui/query-provider'
import { LocaleProvider } from '@/lib/i18n'
import { ThemeProviderWrapper } from '@/components/ui/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return {
    title: 'PharmaBridge',
    description: 'Unified Pharmaceutical Ecosystem Platform',
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const locales = ['ar', 'en']

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <div
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ThemeProviderWrapper
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LocaleProvider locale={locale} messages={messages}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </LocaleProvider>
      </ThemeProviderWrapper>
    </div>
  )
}
