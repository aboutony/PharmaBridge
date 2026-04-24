import { openDB } from 'idb'

export interface CachedResponseRecord {
  url: string
  status: number
  headers: Record<string, string>
  body: string
  updatedAt: string
}

export interface QueuedRequestRecord {
  id: string
  url: string
  method: string
  headers: Record<string, string>
  body: string | null
  createdAt: string
  updatedAt: string
  attempts: number
}

export interface ConflictRecord {
  id: string
  requestId: string
  url: string
  method: string
  message: string
  localPayload: string | null
  serverPayload: string | null
  createdAt: string
}

const DB_NAME = 'pharmabridge-offline'
const DB_VERSION = 1

async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache', { keyPath: 'url' })
      }

      if (!db.objectStoreNames.contains('queue')) {
        db.createObjectStore('queue', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('conflicts')) {
        db.createObjectStore('conflicts', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' })
      }
    },
  })
}

export async function cacheResponse(record: CachedResponseRecord) {
  const db = await getDb()
  await db.put('cache', record)
}

export async function getCachedResponse(url: string) {
  const db = await getDb()
  return db.get('cache', url) as Promise<CachedResponseRecord | undefined>
}

export async function queueRequest(record: QueuedRequestRecord) {
  const db = await getDb()
  await db.put('queue', record)
}

export async function listQueuedRequests() {
  const db = await getDb()
  const requests = (await db.getAll('queue')) as QueuedRequestRecord[]
  return requests.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

export async function updateQueuedRequest(record: QueuedRequestRecord) {
  const db = await getDb()
  await db.put('queue', record)
}

export async function removeQueuedRequest(id: string) {
  const db = await getDb()
  await db.delete('queue', id)
}

export async function saveConflict(record: ConflictRecord) {
  const db = await getDb()
  await db.put('conflicts', record)
}

export async function listConflicts() {
  const db = await getDb()
  const conflicts = (await db.getAll('conflicts')) as ConflictRecord[]
  return conflicts.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function removeConflict(id: string) {
  const db = await getDb()
  await db.delete('conflicts', id)
}

export async function setMeta(key: string, value: string) {
  const db = await getDb()
  await db.put('meta', { key, value })
}

export async function getMeta(key: string) {
  const db = await getDb()
  const record = await db.get('meta', key) as { key: string; value: string } | undefined
  return record?.value
}

export async function getOfflineCounts() {
  const [pendingCount, conflictCount] = await Promise.all([
    listQueuedRequests().then((items) => items.length),
    listConflicts().then((items) => items.length),
  ])

  return { pendingCount, conflictCount }
}

export async function clearOfflineStores() {
  const db = await getDb()
  await Promise.all([
    db.clear('cache'),
    db.clear('queue'),
    db.clear('conflicts'),
    db.clear('meta'),
  ])
}
