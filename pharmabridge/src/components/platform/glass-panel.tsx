import { cn } from '@/lib/utils'

export function GlassPanel({
  children,
  className,
  level = 1,
  tone,
  interactive = false,
}: {
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3
  tone?: 'teal' | 'blue' | 'green' | 'amber' | 'purple'
  interactive?: boolean
}) {
  const levelClasses = {
    1: 'bg-white/72 backdrop-blur-2xl border border-slate-200/80 shadow-[0_16px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] dark:bg-white/[0.06] dark:border-white/[0.14] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.22)]',
    2: 'bg-white/84 backdrop-blur-[32px] border border-slate-200/90 shadow-[0_20px_52px_rgba(15,23,42,0.12),inset_0_2px_0_rgba(255,255,255,0.72)] dark:bg-white/[0.10] dark:border-white/[0.2] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45),inset_0_2px_0_rgba(255,255,255,0.30)]',
    3: 'bg-white/62 border border-slate-200/70 dark:bg-white/[0.03] dark:border-white/[0.07]',
  }

  const toneClasses = {
    teal: 'shadow-[0_0_40px_rgba(20,143,119,0.14)] dark:shadow-[0_0_40px_rgba(20,143,119,0.18)]',
    blue: 'shadow-[0_0_40px_rgba(36,113,163,0.14)] dark:shadow-[0_0_40px_rgba(36,113,163,0.18)]',
    green: 'shadow-[0_0_40px_rgba(30,132,73,0.14)] dark:shadow-[0_0_40px_rgba(30,132,73,0.18)]',
    amber: 'shadow-[0_0_40px_rgba(212,119,26,0.14)] dark:shadow-[0_0_40px_rgba(212,119,26,0.18)]',
    purple: 'shadow-[0_0_40px_rgba(108,52,131,0.14)] dark:shadow-[0_0_40px_rgba(108,52,131,0.22)]',
  }

  return (
    <div
      className={cn(
        'rounded-[28px] text-slate-950 dark:text-white/92',
        levelClasses[level],
        tone ? toneClasses[tone] : '',
        interactive &&
          'transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:dark:border-white/30',
        className,
      )}
    >
      {children}
    </div>
  )
}
