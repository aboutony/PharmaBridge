'use client'

import { DemoBanner } from '@/components/system/demo-banner'
import { OfflineStatus } from '@/components/offline/offline-status'
import { useOfflineRuntime } from '@/hooks/useOfflineRuntime'

export function AppRuntime() {
  useOfflineRuntime()

  return (
    <>
      <DemoBanner />
      <OfflineStatus />
    </>
  )
}
