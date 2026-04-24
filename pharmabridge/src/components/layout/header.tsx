'use client'

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  className?: string
}

export function Header({ title, className }: HeaderProps) {
  return (
    <header className={cn("border-b border-border bg-surface px-4 py-3 tablet:px-6 desktop:px-8", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
