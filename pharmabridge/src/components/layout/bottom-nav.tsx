'use client'

import { useTranslations } from 'next-intl'
import { Home, Package, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface BottomNavProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function BottomNav({ activeTab = 'dashboard', onTabChange }: BottomNavProps) {
  const t = useTranslations('navigation')

  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'inventory', icon: Package, label: t('inventory') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-2">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 min-h-[3rem]"
            onClick={() => onTabChange?.(tab.id)}
          >
            <tab.icon size={20} />
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}