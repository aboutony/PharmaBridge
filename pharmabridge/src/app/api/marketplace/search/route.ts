import { NextResponse } from 'next/server'

interface SearchResult {
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

const baseResults: SearchResult[] = [
  {
    pharmacyId: '1',
    pharmacyName: 'Pharmacy Al-Rashid',
    location: 'Damascus',
    distance: 2.3,
    drugName: 'Paracetamol 500mg',
    price: 2.5,
    originalPrice: 3,
    stock: 150,
    requiresPrescription: false,
    rating: 4.5,
    deliveryTime: '30-45 min',
    deliveryFee: 2,
    isOpen: true,
    operatingHours: '8:00 AM - 10:00 PM',
    contact: '+963 11 123 4567',
  },
  {
    pharmacyId: '2',
    pharmacyName: 'Al-Sham Pharmacy',
    location: 'Aleppo',
    distance: 5.1,
    drugName: 'Paracetamol 500mg',
    price: 2.75,
    originalPrice: 2.75,
    stock: 89,
    requiresPrescription: false,
    rating: 4.2,
    deliveryTime: '45-60 min',
    deliveryFee: 3.5,
    isOpen: true,
    operatingHours: '9:00 AM - 9:00 PM',
    contact: '+963 21 234 5678',
  },
  {
    pharmacyId: '3',
    pharmacyName: 'City Pharmacy',
    location: 'Homs',
    distance: 8.7,
    drugName: 'Amoxicillin 500mg',
    price: 8.25,
    originalPrice: 8.75,
    stock: 43,
    requiresPrescription: true,
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 1.5,
    isOpen: false,
    operatingHours: '8:00 AM - 8:00 PM',
    contact: '+963 31 345 6789',
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const drug = (searchParams.get('drug') ?? '').trim().toLowerCase()
  const location = (searchParams.get('location') ?? '').trim().toLowerCase()
  const locale = searchParams.get('locale') === 'ar' ? 'ar' : 'en'
  const maxPrice = Number(searchParams.get('maxPrice') ?? '')

  let results = baseResults.map((result) => ({
    ...result,
    pharmacyName:
      locale === 'ar'
        ? result.pharmacyId === '1'
          ? 'صيدلية الراشد'
          : result.pharmacyId === '2'
            ? 'صيدلية الشام'
            : 'صيدلية المدينة'
        : result.pharmacyName,
    location:
      locale === 'ar'
        ? result.pharmacyId === '1'
          ? 'دمشق'
          : result.pharmacyId === '2'
            ? 'حلب'
            : 'حمص'
        : result.location,
    drugName: drug
      ? locale === 'ar'
        ? drug
        : `${drug.charAt(0).toUpperCase()}${drug.slice(1)}`
      : locale === 'ar'
        ? result.pharmacyId === '3'
          ? 'أموكسيسيلين 500mg'
          : 'باراسيتامول 500mg'
        : result.drugName,
    deliveryTime:
      locale === 'ar'
        ? result.pharmacyId === '1'
          ? '30-45 دقيقة'
          : result.pharmacyId === '2'
            ? '45-60 دقيقة'
            : '25-35 دقيقة'
        : result.deliveryTime,
    operatingHours:
      locale === 'ar'
        ? result.pharmacyId === '2'
          ? '9:00 ص - 9:00 م'
          : result.pharmacyId === '3'
            ? '8:00 ص - 8:00 م'
            : '8:00 ص - 10:00 م'
        : result.operatingHours,
  }))

  if (drug) {
    results = results.filter((result) => result.drugName.toLowerCase().includes(drug))
  }

  if (location) {
    results = results.filter((result) => result.location.toLowerCase().includes(location))
  }

  if (!Number.isNaN(maxPrice) && maxPrice > 0) {
    results = results.filter((result) => result.price <= maxPrice)
  }

  return NextResponse.json(results)
}
