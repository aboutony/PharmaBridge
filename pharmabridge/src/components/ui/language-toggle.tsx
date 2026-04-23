'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar'
    // Replace locale prefix in current path
    const newPath = pathname.replace(/^\/(ar|en)/, '/' + nextLocale)
    router.push(newPath)
  }

  return (
    <Button variant="ghost" onClick={switchLocale}>
      {locale === 'ar' ? 'English' : 'العربية'}
    </Button>
  )
}