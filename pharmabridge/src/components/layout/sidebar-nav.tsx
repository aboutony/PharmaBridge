'use client'

import { useTranslations } from '@/lib/i18n'
import { Home, Package, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarNavProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function SidebarNav({ activeTab = 'dashboard', onTabChange }: SidebarNavProps) {
  const t = useTranslations('navigation')

  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'inventory', icon: Package, label: t('inventory') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className="w-full justify-start gap-3 h-12"
            onClick={() => onTabChange?.(tab.id)}
          >
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}
