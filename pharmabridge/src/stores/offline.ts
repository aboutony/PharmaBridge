import { create } from 'zustand'

interface OfflineState {
  isOnline: boolean
  pendingCount: number
  conflictCount: number
  syncInFlight: boolean
  lastSyncedAt: string | null
  initialized: boolean
  setIsOnline: (isOnline: boolean) => void
  setCounts: (counts: { pendingCount: number; conflictCount: number }) => void
  setSyncInFlight: (syncInFlight: boolean) => void
  setLastSyncedAt: (lastSyncedAt: string | null) => void
  setInitialized: (initialized: boolean) => void
}

export const useOfflineStore = create<OfflineState>((set) => ({
  isOnline: true,
  pendingCount: 0,
  conflictCount: 0,
  syncInFlight: false,
  lastSyncedAt: null,
  initialized: false,
  setIsOnline: (isOnline) => set({ isOnline }),
  setCounts: ({ pendingCount, conflictCount }) => set({ pendingCount, conflictCount }),
  setSyncInFlight: (syncInFlight) => set({ syncInFlight }),
  setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),
  setInitialized: (initialized) => set({ initialized }),
}))
