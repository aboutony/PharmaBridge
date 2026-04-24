'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, CloudOff, RefreshCcw, Wifi } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { listConflicts, type ConflictRecord } from '@/lib/offline/db'
import { resolveConflict, syncQueuedRequests } from '@/lib/offline/manager'
import { useOfflineStore } from '@/stores/offline'
import { useLocale } from '@/lib/i18n'

export function OfflineStatus() {
  const locale = useLocale()
  const { isOnline, pendingCount, conflictCount, syncInFlight, lastSyncedAt, initialized } = useOfflineStore()
  const [conflicts, setConflicts] = useState<ConflictRecord[]>([])

  useEffect(() => {
    listConflicts().then(setConflicts)
  }, [conflictCount])

  if (!initialized) {
    return null
  }

  const statusTone = isOnline ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-900 border-amber-200'
  const t = locale === 'ar'
    ? {
        online: 'الوضع المتصل مفعل',
        offline: 'الوضع غير المتصل مفعل',
        onlineBody: 'البيانات المحفوظة متاحة الآن، وستتم مزامنة التغييرات المعلقة تلقائيًا.',
        offlineBody: 'يمكنك متابعة العمل على البيانات المحفوظة محليًا، وسيتم إرسال التغييرات الجديدة عند عودة الاتصال.',
        lastSync: 'آخر مزامنة',
        queued: 'معلقة',
        conflicts: 'تعارضات',
        syncNow: 'زامن الآن',
        syncLabel: 'مزامنة التغييرات غير المتصلة',
        resolve: 'معالجة التعارضات',
        resolveLabel: 'افتح مركز معالجة التعارضات',
        centerTitle: 'مركز تعارضات العمل غير المتصل',
        centerBody: 'راجع العناصر المعلقة التي تعذر دمجها تلقائيًا بعد عودة الاتصال.',
        none: 'لا توجد تعارضات تحتاج إلى معالجة.',
        retry: 'أعد محاولة التغيير المحلي',
        keepServer: 'اعتمد نسخة الخادم',
      }
    : {
        online: 'Online mode active',
        offline: 'Offline mode active',
        onlineBody: 'Cached data is available and queued updates will sync automatically.',
        offlineBody: 'You can keep browsing cached records. New changes will be queued for sync.',
        lastSync: 'Last sync',
        queued: 'queued',
        conflicts: 'conflicts',
        syncNow: 'Sync now',
        syncLabel: 'Sync offline changes',
        resolve: 'Resolve conflicts',
        resolveLabel: 'Open offline conflict center',
        centerTitle: 'Offline conflict center',
        centerBody: 'Review queued items that could not be merged automatically after reconnecting.',
        none: 'No conflicts need attention.',
        retry: 'Retry local change',
        keepServer: 'Keep server version',
      }

  return (
    <div className={`border-b px-4 py-3 text-sm ${statusTone}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="flex items-start gap-3">
          {isOnline ? <Wifi className="mt-0.5 h-4 w-4 shrink-0" /> : <CloudOff className="mt-0.5 h-4 w-4 shrink-0" />}
          <div className="space-y-1">
            <p className="font-medium">
              {isOnline ? t.online : t.offline}
            </p>
            <p className="text-xs opacity-90">
              {isOnline
                ? t.onlineBody
                : t.offlineBody}
            </p>
            {lastSyncedAt && (
              <p className="text-xs opacity-80">{t.lastSync}: {new Date(lastSyncedAt).toLocaleString(locale === 'ar' ? 'ar-SY' : 'en-US')}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{pendingCount} {t.queued}</Badge>
          <Badge variant="outline">{conflictCount} {t.conflicts}</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => syncQueuedRequests()}
            disabled={!isOnline || syncInFlight}
            aria-label={t.syncLabel}
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${syncInFlight ? 'animate-spin' : ''}`} />
            {t.syncNow}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" aria-label={t.resolveLabel}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                {t.resolve}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t.centerTitle}</DialogTitle>
                <DialogDescription>
                  {t.centerBody}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                {conflicts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t.none}</p>
                ) : (
                  conflicts.map((conflict) => (
                    <Card key={conflict.id}>
                      <CardContent className="space-y-3 p-4">
                        <div>
                          <p className="font-medium">{conflict.method} {conflict.url}</p>
                          <p className="text-sm text-muted-foreground">{conflict.message}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => resolveConflict(conflict.id, 'retry')}>
                            {t.retry}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => resolveConflict(conflict.id, 'server')}>
                            {t.keepServer}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
