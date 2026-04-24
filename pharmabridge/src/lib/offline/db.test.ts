import { beforeEach, describe, expect, it } from 'vitest'
import {
  cacheResponse,
  clearOfflineStores,
  getCachedResponse,
  getOfflineCounts,
  queueRequest,
  removeConflict,
  removeQueuedRequest,
  saveConflict,
} from './db'

describe('offline db helpers', () => {
  beforeEach(async () => {
    await clearOfflineStores()
  })

  it('caches read responses', async () => {
    await cacheResponse({
      url: '/api/marketplace/search?drug=Paracetamol',
      status: 200,
      headers: { 'content-type': 'application/json' },
      body: '[{"drugName":"Paracetamol"}]',
      updatedAt: new Date().toISOString(),
    })

    const record = await getCachedResponse('/api/marketplace/search?drug=Paracetamol')
    expect(record?.body).toContain('Paracetamol')
  })

  it('tracks queued requests and conflicts', async () => {
    await queueRequest({
      id: 'queued-1',
      url: '/api/inventory/1',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: '{"stock":25}',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attempts: 0,
    })

    await saveConflict({
      id: 'conflict-1',
      requestId: 'queued-1',
      url: '/api/inventory/1',
      method: 'PUT',
      message: 'Conflict while syncing',
      localPayload: '{"stock":25}',
      serverPayload: '{"stock":30}',
      createdAt: new Date().toISOString(),
    })

    await expect(getOfflineCounts()).resolves.toEqual({ pendingCount: 1, conflictCount: 1 })

    await removeQueuedRequest('queued-1')
    await removeConflict('conflict-1')
    await expect(getOfflineCounts()).resolves.toEqual({ pendingCount: 0, conflictCount: 0 })
  })
})
