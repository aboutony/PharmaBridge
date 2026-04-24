'use client'

import { useLocale } from '@/lib/i18n'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar'
    const newPath = pathname.replace(/^\/(ar|en)/, `/${nextLocale}`)
    router.push(newPath)
  }

  return (
    <Button
      variant="ghost"
      onClick={switchLocale}
      aria-label={locale === 'ar' ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
      className="rounded-2xl border border-white/10 bg-white/6 px-4 text-white/75 hover:bg-white/12 hover:text-white"
    >
      {locale === 'ar' ? 'الإنجليزية' : 'Arabic'}
    </Button>
  )
}
