'use client'

import { useEffect } from 'react'
import { useOfflineStore } from '@/stores/offline'

export function useConnectivity() {
  const setIsOnline = useOfflineStore((state) => state.setIsOnline)

  useEffect(() => {
    const updateStatus = () => {
      setIsOnline(navigator.onLine)
    }

    updateStatus()
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [setIsOnline])
}
