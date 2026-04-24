'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassPanel } from '@/components/platform/glass-panel'
import type { AppLocale } from '@/lib/platform-content'
import { usePharmaMarketStore } from '@/stores/pharmamarket'

const copy = {
  ar: {
    title: 'الوصفات الطبية',
    body: 'حمّل وصفة الطبيب للمنتجات المقيدة. ستظهر لاحقًا داخل السداد والطلب.',
    choose: 'اختر الملف',
    note: 'ملاحظة للصيدلي',
    upload: 'رفع الوصفة',
  },
  en: {
    title: 'Prescriptions',
    body: 'Upload the doctor prescription for controlled items. It remains visible during checkout and pharmacist review.',
    choose: 'Choose file',
    note: 'Note for pharmacist',
    upload: 'Upload prescription',
  },
}

export function PharmaMarketPrescriptionsView({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [note, setNote] = useState('')
  const prescriptions = usePharmaMarketStore((state) => state.prescriptions)
  const addPrescription = usePharmaMarketStore((state) => state.addPrescription)

  return (
    <div className="space-y-6">
      <GlassPanel level={2} className="p-6">
        <p className="text-3xl font-bold text-slate-950 dark:text-white">{t.title}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{t.body}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
          />
          <Button className="rounded-2xl" variant="outline" onClick={() => fileRef.current?.click()}>
            {t.choose}
          </Button>
          {fileName ? <span className="self-center text-sm text-slate-600 dark:text-white/65">{fileName}</span> : null}
        </div>
        <Input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t.note}
          className="mt-4 border-slate-200/80 bg-white/80 text-slate-900 dark:border-white/12 dark:bg-white/8 dark:text-white"
        />
        <Button
          className="mt-4 rounded-2xl bg-[#148F77] text-white hover:bg-[#19a387]"
          onClick={() => {
            if (!fileName) return
            addPrescription(fileName, note)
            setFileName('')
            setNote('')
            if (fileRef.current) fileRef.current.value = ''
          }}
          disabled={!fileName}
        >
          {t.upload}
        </Button>
      </GlassPanel>

      <div className="grid gap-4">
        {prescriptions.map((prescription) => (
          <GlassPanel key={prescription.id} level={1} className="p-5">
            <p className="text-lg font-semibold text-slate-950 dark:text-white">{prescription.fileName}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{prescription.note || '-'}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-white/45">
              {new Date(prescription.uploadedAt).toLocaleString(locale === 'ar' ? 'ar-SY' : 'en-US')}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  )
}
