'use client'

import { useTranslations } from '@/lib/i18n'
import { ChevronLeft, Home } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const router = useRouter()

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-text-secondary", className)}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <button
              onClick={() => router.push(item.href!)}
              className="hover:text-text-primary transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-text-primary font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

interface BackNavigationProps {
  onBack?: () => void
  className?: string
}

export function BackNavigation({ onBack, className }: BackNavigationProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={cn("flex items-center gap-2", className)}
    >
      <ChevronLeft className="w-4 h-4" />
      Back
    </Button>
  )
}
