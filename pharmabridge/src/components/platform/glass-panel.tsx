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
    1: 'bg-white/[0.06] backdrop-blur-2xl border border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.22)]',
    2: 'bg-white/[0.10] backdrop-blur-[32px] border border-white/[0.2] shadow-[0_16px_48px_rgba(0,0,0,0.45),inset_0_2px_0_rgba(255,255,255,0.30)]',
    3: 'bg-white/[0.03] border border-white/[0.07]',
  }

  const toneClasses = {
    teal: 'shadow-[0_0_40px_rgba(20,143,119,0.18)]',
    blue: 'shadow-[0_0_40px_rgba(36,113,163,0.18)]',
    green: 'shadow-[0_0_40px_rgba(30,132,73,0.18)]',
    amber: 'shadow-[0_0_40px_rgba(212,119,26,0.18)]',
    purple: 'shadow-[0_0_40px_rgba(108,52,131,0.22)]',
  }

  return (
    <div
      className={cn(
        'rounded-[28px] text-white/92',
        levelClasses[level],
        tone ? toneClasses[tone] : '',
        interactive && 'transition duration-200 hover:-translate-y-0.5 hover:border-white/30',
        className,
      )}
    >
      {children}
    </div>
  )
}
