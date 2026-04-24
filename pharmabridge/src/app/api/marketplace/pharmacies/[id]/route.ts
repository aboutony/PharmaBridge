import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const pharmacy = {
    id,
    name: 'Pharmacy Al-Rashid',
    location: 'Damascus, Syria',
    rating: 4.5,
    totalReviews: 127,
    isOpen: true,
    operatingHours: '8:00 AM - 10:00 PM',
    contact: '+963 11 123 4567',
    email: 'contact@alrashid-pharmacy.sy',
    description: 'Your trusted neighborhood pharmacy for over 20 years',
    services: ['Prescription filling', 'Health consultations', 'Home delivery', '24/7 Emergency'],
    deliveryFee: 2,
    minimumOrder: 5,
    estimatedDelivery: '30-45 minutes',
    image: '/api/placeholder/400/200',
    inventory: [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        category: 'Pain Relief',
        price: 2.5,
        stock: 150,
        requiresPrescription: false,
        description: 'Effective pain relief medication',
      },
      {
        id: '2',
        name: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        price: 8.75,
        stock: 75,
        requiresPrescription: true,
        description: 'Antibiotic medication - prescription required',
      },
    ],
  }

  return NextResponse.json(pharmacy)
}
