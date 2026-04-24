'use client'

import { FlaskConical } from 'lucide-react'
import { clientEnv, isDemoEnvironment } from '@/lib/env'
import { useLocale } from '@/lib/i18n'

export function DemoBanner() {
  const locale = useLocale()

  if (!clientEnv.NEXT_PUBLIC_ENABLE_DEMO_BANNER || !isDemoEnvironment()) {
    return null
  }

  return (
    <div className="border-b border-primary/15 bg-primary/10 px-4 py-2 text-sm text-primary">
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <FlaskConical className="h-4 w-4 shrink-0" />
        <span className="rounded-full border border-primary/30 bg-primary/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
          {locale === 'ar' ? 'الوضع التجريبي' : 'Demo mode'}
        </span>
        <p>
          {locale === 'ar'
            ? 'تم تفعيل بيئة العرض التجريبي. هذا الإصدار يستخدم بيانات أولية محاكية وآمنة للعروض التوضيحية وضمان الجودة.'
            : 'Demo environment enabled. This build uses seeded mock data and is safe for walkthroughs and QA.'}
        </p>
      </div>
    </div>
  )
}
