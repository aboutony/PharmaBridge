'use client'

import { useEffect } from 'react'
import { clientEnv } from '@/lib/env'
import { installOfflineFetch, refreshOfflineState, syncQueuedRequests } from '@/lib/offline/manager'
import { useConnectivity } from '@/hooks/useConnectivity'
import { useOfflineStore } from '@/stores/offline'

export function useOfflineRuntime() {
  useConnectivity()
  const isOnline = useOfflineStore((state) => state.isOnline)
  const setInitialized = useOfflineStore((state) => state.setInitialized)

  useEffect(() => {
    if (!clientEnv.NEXT_PUBLIC_ENABLE_OFFLINE) {
      return
    }

    installOfflineFetch()
    refreshOfflineState().then(() => setInitialized(true))
  }, [setInitialized])

  useEffect(() => {
    if (!clientEnv.NEXT_PUBLIC_ENABLE_OFFLINE) {
      return
    }

    if (isOnline) {
      syncQueuedRequests()
    }
  }, [isOnline])

  useEffect(() => {
    if (!clientEnv.NEXT_PUBLIC_ENABLE_OFFLINE) {
      return
    }

    const intervalId = window.setInterval(() => {
      if (navigator.onLine) {
        syncQueuedRequests()
      }
    }, clientEnv.NEXT_PUBLIC_PIMS_SYNC_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [])
}
