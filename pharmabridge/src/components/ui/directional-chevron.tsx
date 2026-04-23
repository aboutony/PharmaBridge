'use client'

import { useLocale } from '@/lib/i18n'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DirectionalChevronProps {
  className?: string
}

export function DirectionalChevron({ className }: DirectionalChevronProps) {
  const locale = useLocale()
  return (
    <ChevronRight
      className={cn(
        className,
        locale === 'ar' && 'rotate-180'   // Mirror for RTL
      )}
    />
  )
}
