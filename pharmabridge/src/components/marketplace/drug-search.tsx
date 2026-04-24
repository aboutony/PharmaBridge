'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Clock, Truck, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { AppLocale } from '@/lib/platform-content'

interface DrugSearchResult {
  pharmacyId: string
  pharmacyName: string
  location: string
  distance: number
  drugName: string
  price: number
  originalPrice: number
  stock: number
  requiresPrescription: boolean
  rating: number
  deliveryTime: string
  deliveryFee: number
  isOpen: boolean
  operatingHours: string
  contact: string
}

const copy = {
  ar: {
    title: 'ابحث عن الدواء المناسب',
    subtitle: 'قارن التوفر والسعر والتنفيذ عبر شبكة الصيدليات المرتبطة.',
    medicine: 'اسم الدواء',
    location: 'المدينة',
    maxPrice: 'الحد الأقصى للسعر',
    help: 'اكتب اسم الدواء لمقارنة التوفر المحلي والأسعار.',
    placeholderDrug: 'مثال: باراسيتامول أو أموكسيسيلين',
    placeholderLocation: 'مدينتك',
    search: 'ابدأ البحث',
    loading: 'جارٍ البحث في الصيدليات...',
    error: 'تعذر تنفيذ البحث الآن.',
    noResults: 'لم يتم العثور على نتائج مطابقة.',
    spellingHint: 'جرّب كلمة بديلة أو تحقق من الإملاء.',
    details: 'عرض التفاصيل',
    order: 'اطلب الآن',
    call: 'اتصل بالصيدلية',
    locationLabel: 'الموقع',
    contactLabel: 'التواصل',
    hoursLabel: 'ساعات العمل',
    feeLabel: 'رسوم التوصيل',
    prescription: 'وصفة مطلوبة',
    open: 'مفتوحة',
    closed: 'مغلقة',
    inStock: 'متوفر',
    left: (count: number) => `المتبقي ${count}`,
    out: 'غير متوفر',
    away: 'كم',
    rating: (value: number) => `التقييم ${value} من 5`,
    detailsBody: 'معلومات الصيدلية وخيارات التنفيذ',
  },
  en: {
    title: 'Find your medicine',
    subtitle: 'Compare availability, pricing, and fulfillment across connected pharmacies.',
    medicine: 'Medicine name',
    location: 'Location',
    maxPrice: 'Max price',
    help: 'Enter a medicine name to compare nearby stock and pricing.',
    placeholderDrug: 'For example: Paracetamol or Amoxicillin',
    placeholderLocation: 'Your city',
    search: 'Search',
    loading: 'Searching connected pharmacies...',
    error: 'Unable to search medicines right now.',
    noResults: 'No matching results were found.',
    spellingHint: 'Try a different keyword or check the spelling.',
    details: 'View details',
    order: 'Order now',
    call: 'Call pharmacy',
    locationLabel: 'Location',
    contactLabel: 'Contact',
    hoursLabel: 'Operating hours',
    feeLabel: 'Delivery fee',
    prescription: 'Rx required',
    open: 'Open',
    closed: 'Closed',
    inStock: 'In stock',
    left: (count: number) => `Only ${count} left`,
    out: 'Out of stock',
    away: 'km away',
    rating: (value: number) => `Rated ${value} out of 5`,
    detailsBody: 'Pharmacy information and fulfillment options',
  },
}

export function DrugAvailabilitySearch({ locale }: { locale: AppLocale }) {
  const t = copy[locale]
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchResults, setSearchResults] = useState<DrugSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    const nextQuery = searchQuery.trim()
    const nextLocation = location.trim()
    const nextMaxPrice = maxPrice.trim()
    setSubmittedQuery(nextQuery)
    setError(null)

    if (!nextQuery) {
      setSearchResults([])
      return
    }

    const params = new URLSearchParams()
    params.append('drug', nextQuery)
    params.append('locale', locale)
    if (nextLocation) params.append('location', nextLocation)
    if (nextMaxPrice) params.append('maxPrice', nextMaxPrice)

    setIsLoading(true)

    try {
      const response = await fetch(`/api/marketplace/search?${params}`)
      if (!response.ok) throw new Error(t.error)
      const results = (await response.json()) as DrugSearchResult[]
      setSearchResults(results)
    } catch {
      setSearchResults([])
      setError(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">{t.title}</h2>
        <p className="text-white/65">{t.subtitle}</p>
      </div>

      <Card className="border-white/12 bg-white/6 text-white shadow-none backdrop-blur-xl">
        <CardContent className="pt-6">
          <form
            className="flex flex-col gap-4 tablet:flex-row tablet:items-end"
            aria-label={t.title}
            onSubmit={async (event) => {
              event.preventDefault()
              await handleSearch()
            }}
          >
            <div className="flex-1">
              <label htmlFor="medicine-name" className="mb-2 block text-sm font-medium text-white/80">{t.medicine}</label>
              <div className="relative">
                <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                <Input
                  id="medicine-name"
                  aria-describedby="medicine-search-help"
                  placeholder={t.placeholderDrug}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="border-white/12 bg-white/8 pl-10 text-white placeholder:text-white/35"
                />
              </div>
              <p id="medicine-search-help" className="mt-2 text-xs text-white/50">
                {t.help}
              </p>
            </div>
            <div className="w-full tablet:w-48">
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-white/80">{t.location}</label>
              <Input
                id="location"
                placeholder={t.placeholderLocation}
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="border-white/12 bg-white/8 text-white placeholder:text-white/35"
              />
            </div>
            <div className="w-full tablet:w-32">
              <label htmlFor="max-price" className="mb-2 block text-sm font-medium text-white/80">{t.maxPrice}</label>
              <Input
                id="max-price"
                type="number"
                placeholder="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="border-white/12 bg-white/8 text-white placeholder:text-white/35"
              />
            </div>
            <Button type="submit" className="w-full rounded-2xl bg-[#148F77] text-white hover:bg-[#19a387] tablet:w-auto" aria-label={t.search}>
              {t.search}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="py-8 text-center text-white/65" aria-live="polite">{t.loading}</div>
      )}

      {error && (
        <div className="rounded-2xl border border-[#C0392B]/25 bg-[#C0392B]/10 px-4 py-3 text-sm text-white" aria-live="polite">
          {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3" aria-live="polite">
          {searchResults.map((result) => (
            <Card key={`${result.pharmacyId}-${result.drugName}`} className="border-white/12 bg-white/6 text-white shadow-none backdrop-blur-xl transition hover:border-white/24">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg text-white">{result.pharmacyName}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-white/55">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {result.location} • {result.distance} {t.away}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1" aria-label={t.rating(result.rating)}>
                    <span className="text-[#84f0db]">★</span>
                    <span className="text-sm text-white/70">({result.rating})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{result.drugName}</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#84f0db]">${result.price}</span>
                      {result.originalPrice > result.price && (
                        <span className="text-sm text-white/40 line-through">${result.originalPrice}</span>
                      )}
                      {result.requiresPrescription && (
                        <Badge variant="secondary" className="border-white/12 bg-white/8 text-white">
                          {t.prescription}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/65">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {result.isOpen ? `${t.open} • ${result.operatingHours}` : t.closed}
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" aria-hidden="true" />
                      <span>{result.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="text-sm text-white/65">
                    {result.stock > 50 ? t.inStock : result.stock > 0 ? t.left(result.stock) : t.out}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 rounded-2xl border-white/12 bg-white/8 text-white hover:bg-white/12">
                          {t.details}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl border-white/12 bg-[#101a2d] text-white">
                        <DialogHeader>
                          <DialogTitle>{result.pharmacyName}</DialogTitle>
                          <DialogDescription className="text-white/60">
                            {t.detailsBody}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>{t.locationLabel}:</strong> {result.location}</div>
                            <div><strong>{t.contactLabel}:</strong> {result.contact}</div>
                            <div><strong>{t.hoursLabel}:</strong> {result.operatingHours}</div>
                            <div><strong>{t.feeLabel}:</strong> ${result.deliveryFee}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild className="flex-1 rounded-2xl bg-[#148F77] hover:bg-[#19a387]">
                              <Link href={`/${locale}/patient/dashboard?pharmacyId=${result.pharmacyId}&drug=${encodeURIComponent(result.drugName)}`}>
                              <DollarSign className="mr-2 h-4 w-4" aria-hidden="true" />
                              {t.order}
                              </Link>
                            </Button>
                            <Button asChild variant="outline" className="flex-1 rounded-2xl border-white/12 bg-white/8 text-white hover:bg-white/12">
                              <Link href={`tel:${result.contact.replace(/[^+\d]/g, '') || result.contact}`}>
                              {t.call}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      asChild
                      size="sm"
                      className={`flex-1 rounded-2xl ${!result.isOpen || result.stock === 0 ? 'cursor-not-allowed bg-[#2471A3]/50 hover:bg-[#2471A3]/50' : 'bg-[#2471A3] hover:bg-[#2f85bf]'}`}
                    >
                      <Link
                        aria-disabled={!result.isOpen || result.stock === 0}
                        href={!result.isOpen || result.stock === 0 ? '#' : `/${locale}/patient/dashboard?pharmacyId=${result.pharmacyId}&drug=${encodeURIComponent(result.drugName)}`}
                        onClick={(event) => {
                          if (!result.isOpen || result.stock === 0) {
                            event.preventDefault()
                          }
                        }}
                      >
                        {t.order}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchResults.length === 0 && submittedQuery && !isLoading && !error && (
        <div className="py-8 text-center" aria-live="polite">
          <Search className="mx-auto mb-4 h-12 w-12 text-white/40" aria-hidden="true" />
          <p className="text-white/70">{t.noResults}</p>
          <p className="mt-2 text-sm text-white/50">{t.spellingHint}</p>
        </div>
      )}
    </div>
  )
}
