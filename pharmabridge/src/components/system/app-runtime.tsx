'use client'

import { OfflineStatus } from '@/components/offline/offline-status'
import { useOfflineRuntime } from '@/hooks/useOfflineRuntime'

export function AppRuntime() {
  useOfflineRuntime()

  return <OfflineStatus />
}
