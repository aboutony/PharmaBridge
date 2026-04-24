'use client'

import { clientEnv } from '@/lib/env'
import { useOfflineStore } from '@/stores/offline'
import {
  cacheResponse,
  getCachedResponse,
  getMeta,
  getOfflineCounts,
  listConflicts,
  listQueuedRequests,
  queueRequest,
  removeConflict,
  removeQueuedRequest,
  saveConflict,
  setMeta,
  updateQueuedRequest,
  type CachedResponseRecord,
  type ConflictRecord,
  type QueuedRequestRecord,
} from '@/lib/offline/db'

const OFFLINE_MANAGER_FLAG = '__pharmabridgeOfflineFetchInstalled'
const ORIGINAL_FETCH_FLAG = '__pharmabridgeOriginalFetch'

declare global {
  interface Window {
    [OFFLINE_MANAGER_FLAG]?: boolean
    [ORIGINAL_FETCH_FLAG]?: typeof fetch
  }
}

function normalizeHeaders(headers: Headers) {
  const output: Record<string, string> = {}

  headers.forEach((value, key) => {
    output[key] = value
  })

  return output
}

function createQueuedResponse(record: QueuedRequestRecord) {
  return new Response(
    JSON.stringify({
      queued: true,
      offline: true,
      requestId: record.id,
      message: 'Request queued while offline and will sync automatically.',
    }),
    {
      status: 202,
      headers: {
        'Content-Type': 'application/json',
        'X-PharmaBridge-Offline': 'queued',
      },
    }
  )
}

async function cacheSuccessfulGet(url: string, response: Response) {
  if (!response.ok) {
    return
  }

  const clone = response.clone()
  const body = await clone.text()

  const record: CachedResponseRecord = {
    url,
    status: response.status,
    headers: normalizeHeaders(response.headers),
    body,
    updatedAt: new Date().toISOString(),
  }

  await cacheResponse(record)
}

function createCachedResponse(record: CachedResponseRecord) {
  return new Response(record.body, {
    status: record.status,
    headers: {
      ...record.headers,
      'X-PharmaBridge-Offline': 'cache',
    },
  })
}

function buildQueuedRequest(request: Request, body: string | null): QueuedRequestRecord {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    url: request.url,
    method: request.method.toUpperCase(),
    headers: normalizeHeaders(request.headers),
    body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    attempts: 0,
  }
}

async function readBodyForQueue(request: Request) {
  if (request.method.toUpperCase() === 'GET' || request.method.toUpperCase() === 'HEAD') {
    return null
  }

  return request.clone().text()
}

export async function refreshOfflineState() {
  const { pendingCount, conflictCount } = await getOfflineCounts()
  const lastSyncedAt = await getMeta('lastSyncedAt')

  useOfflineStore.getState().setCounts({ pendingCount, conflictCount })
  useOfflineStore.getState().setLastSyncedAt(lastSyncedAt ?? null)
}

export function installOfflineFetch() {
  if (typeof window === 'undefined' || !clientEnv.NEXT_PUBLIC_ENABLE_OFFLINE) {
    return
  }

  if (window[OFFLINE_MANAGER_FLAG]) {
    return
  }

  window[ORIGINAL_FETCH_FLAG] = window.fetch.bind(window)

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init)
    const method = request.method.toUpperCase()
    const isReadRequest = method === 'GET'
    const originalFetch = window[ORIGINAL_FETCH_FLAG] ?? window.fetch.bind(window)

    if (!navigator.onLine) {
      if (isReadRequest) {
        const cachedRecord = await getCachedResponse(request.url)
        if (cachedRecord) {
          return createCachedResponse(cachedRecord)
        }
      } else {
        const queuedRecord = buildQueuedRequest(request, await readBodyForQueue(request))
        await queueRequest(queuedRecord)
        await refreshOfflineState()
        return createQueuedResponse(queuedRecord)
      }
    }

    try {
      const response = await originalFetch(request)

      if (isReadRequest) {
        await cacheSuccessfulGet(request.url, response)
      }

      if (!isReadRequest && response.status === 409) {
        const conflict: ConflictRecord = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          requestId: 'live-conflict',
          url: request.url,
          method,
          message: 'Server rejected the mutation due to a state conflict.',
          localPayload: await readBodyForQueue(request),
          serverPayload: await response.clone().text(),
          createdAt: new Date().toISOString(),
        }
        await saveConflict(conflict)
        await refreshOfflineState()
      }

      return response
    } catch (error) {
      if (isReadRequest) {
        const cachedRecord = await getCachedResponse(request.url)
        if (cachedRecord) {
          return createCachedResponse(cachedRecord)
        }
      } else {
        const queuedRecord = buildQueuedRequest(request, await readBodyForQueue(request))
        await queueRequest(queuedRecord)
        await refreshOfflineState()
        return createQueuedResponse(queuedRecord)
      }

      throw error
    }
  }

  window[OFFLINE_MANAGER_FLAG] = true
}

export async function syncQueuedRequests() {
  if (typeof window === 'undefined' || !navigator.onLine) {
    return
  }

  const originalFetch = window[ORIGINAL_FETCH_FLAG] ?? window.fetch.bind(window)
  const queuedRequests = await listQueuedRequests()

  if (!queuedRequests.length) {
    await refreshOfflineState()
    return
  }

  const offlineStore = useOfflineStore.getState()
  offlineStore.setSyncInFlight(true)

  try {
    for (const queuedRequest of queuedRequests) {
      const response = await originalFetch(queuedRequest.url, {
        method: queuedRequest.method,
        headers: queuedRequest.headers,
        body: queuedRequest.body,
      })

      if (response.status === 409) {
        await saveConflict({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          requestId: queuedRequest.id,
          url: queuedRequest.url,
          method: queuedRequest.method,
          message: 'Conflict detected while replaying an offline change.',
          localPayload: queuedRequest.body,
          serverPayload: await response.clone().text(),
          createdAt: new Date().toISOString(),
        })
        await removeQueuedRequest(queuedRequest.id)
        continue
      }

      if (!response.ok) {
        await updateQueuedRequest({
          ...queuedRequest,
          attempts: queuedRequest.attempts + 1,
          updatedAt: new Date().toISOString(),
        })
        continue
      }

      await removeQueuedRequest(queuedRequest.id)
    }

    await setMeta('lastSyncedAt', new Date().toISOString())
  } finally {
    offlineStore.setSyncInFlight(false)
    await refreshOfflineState()
  }
}

export async function resolveConflict(conflictId: string, strategy: 'server' | 'retry') {
  const conflicts = await listConflicts()
  const conflict = conflicts.find((item) => item.id === conflictId)

  if (!conflict) {
    return
  }

  if (strategy === 'retry') {
    await queueRequest({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      url: conflict.url,
      method: conflict.method,
      headers: { 'Content-Type': 'application/json' },
      body: conflict.localPayload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attempts: 0,
    })
  }

  await removeConflict(conflictId)
  await refreshOfflineState()
}
