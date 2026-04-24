'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLocale } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const nextLabel =
    locale === 'ar'
      ? theme === 'dark'
        ? 'التبديل إلى الوضع الفاتح'
        : 'التبديل إلى الوضع الداكن'
      : theme === 'dark'
        ? 'Switch to light mode'
        : 'Switch to dark mode'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={nextLabel}
      className="rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/6 dark:text-white/75 dark:hover:bg-white/12 dark:hover:text-white"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{locale === 'ar' ? 'تبديل المظهر' : 'Toggle theme'}</span>
    </Button>
  )
}
