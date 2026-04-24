import { http, HttpResponse } from 'msw'

// Marketplace handlers
export const marketplaceHandlers = [
  // Drug availability search
  http.get('/api/marketplace/search', ({ request }) => {
    const url = new URL(request.url)
    const drug = url.searchParams.get('drug')
    const location = url.searchParams.get('location')
    const maxPrice = url.searchParams.get('maxPrice')

    // Mock search results
    const mockResults = [
      {
        pharmacyId: '1',
        pharmacyName: 'Pharmacy Al-Rashid',
        location: 'Damascus',
        distance: 2.3,
        drugName: drug || 'Paracetamol 500mg',
        price: 2.50,
        originalPrice: 3.00,
        stock: 150,
        requiresPrescription: false,
        rating: 4.5,
        deliveryTime: '30-45 min',
        deliveryFee: 2.00,
        isOpen: true,
        operatingHours: '8:00 AM - 10:00 PM',
        contact: '+963 11 123 4567'
      },
      {
        pharmacyId: '2',
        pharmacyName: 'Al-Sham Pharmacy',
        location: 'Aleppo',
        distance: 5.1,
        drugName: drug || 'Paracetamol 500mg',
        price: 2.75,
        originalPrice: 2.75,
        stock: 89,
        requiresPrescription: false,
        rating: 4.2,
        deliveryTime: '45-60 min',
        deliveryFee: 3.50,
        isOpen: true,
        operatingHours: '9:00 AM - 9:00 PM',
        contact: '+963 21 234 5678'
      },
      {
        pharmacyId: '3',
        pharmacyName: 'City Pharmacy',
        location: 'Homs',
        distance: 8.7,
        drugName: drug || 'Paracetamol 500mg',
        price: 2.25,
        originalPrice: 2.50,
        stock: 234,
        requiresPrescription: false,
        rating: 4.8,
        deliveryTime: '25-35 min',
        deliveryFee: 1.50,
        isOpen: false,
        operatingHours: '8:00 AM - 8:00 PM',
        contact: '+963 31 345 6789'
      }
    ]

    let filteredResults = mockResults

    // Filter by drug name
    if (drug) {
      filteredResults = filteredResults.filter(r =>
        r.drugName.toLowerCase().includes(drug.toLowerCase())
      )
    }

    // Filter by location
    if (location) {
      filteredResults = filteredResults.filter(r =>
        r.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Filter by max price
    if (maxPrice) {
      filteredResults = filteredResults.filter(r => r.price <= parseFloat(maxPrice))
    }

    return HttpResponse.json(filteredResults)
  }),

  // Get pharmacy details
  http.get('/api/marketplace/pharmacies/:id', ({ params }) => {
    const { id } = params

    const mockPharmacy = {
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
      deliveryFee: 2.00,
      minimumOrder: 5.00,
      estimatedDelivery: '30-45 minutes',
      image: '/api/placeholder/400/200',
      inventory: [
        {
          id: '1',
          name: 'Paracetamol 500mg',
          category: 'Pain Relief',
          price: 2.50,
          stock: 150,
          requiresPrescription: false,
          description: 'Effective pain relief medication'
        },
        {
          id: '2',
          name: 'Amoxicillin 500mg',
          category: 'Antibiotics',
          price: 8.75,
          stock: 75,
          requiresPrescription: true,
          description: 'Antibiotic medication - prescription required'
        }
      ]
    }

    return HttpResponse.json(mockPharmacy)
  }),

  // Create patient order
  http.post('/api/marketplace/orders', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>

    const mockOrder = {
      id: String(Date.now()),
      patientId: 'patient-1',
      pharmacyId: String(body.pharmacyId ?? ''),
      pharmacyName: String(body.pharmacyName ?? ''),
      items: Array.isArray(body.items) ? body.items : [],
      deliveryMethod: String(body.deliveryMethod ?? 'pickup'),
      deliveryAddress: body.deliveryAddress ?? null,
      prescriptionUploaded: Boolean(body.prescriptionUploaded),
      total: Number(body.total ?? 0),
      deliveryFee: Number(body.deliveryFee ?? 0),
      status: 'confirmed',
      estimatedDelivery: body.deliveryMethod === 'delivery' ? '45-60 minutes' : 'Ready for pickup in 30 minutes',
      createdAt: new Date().toISOString(),
      orderNumber: `ORD-${Date.now()}`
    }

    return HttpResponse.json(mockOrder, { status: 201 })
  }),

  // Upload prescription
  http.post('/api/marketplace/prescriptions/upload', async ({ request }) => {
    // Mock file upload
    const formData = await request.formData()
    const file = formData.get('prescription')

    if (!file) {
      return HttpResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Mock successful upload
    const mockUpload = {
      id: String(Date.now()),
      filename: 'prescription.jpg',
      url: `/api/uploads/prescriptions/${Date.now()}.jpg`,
      uploadedAt: new Date().toISOString(),
      status: 'processed'
    }

    return HttpResponse.json(mockUpload, { status: 201 })
  }),

  // Get patient orders
  http.get('/api/marketplace/patients/:id/orders', () => {
    const mockOrders = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        pharmacyName: 'Pharmacy Al-Rashid',
        status: 'delivered',
        total: 25.50,
        items: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 2.50 },
          { name: 'Vitamin C 1000mg', quantity: 1, price: 20.50 }
        ],
        deliveryMethod: 'delivery',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        pharmacyName: 'Al-Sham Pharmacy',
        status: 'preparing',
        total: 15.75,
        items: [
          { name: 'Ibuprofen 200mg', quantity: 1, price: 15.75 }
        ],
        deliveryMethod: 'pickup',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        estimatedReady: new Date(Date.now() + 20 * 60 * 1000).toISOString()
      }
    ]

    return HttpResponse.json(mockOrders)
  }),

  // Get patient profile
  http.get('/api/marketplace/patients/:id', ({ params }) => {
    const { id } = params

    const mockPatient = {
      id,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+963 933 123 456',
      dateOfBirth: '1990-05-15',
      address: {
        street: '123 Main Street',
        city: 'Damascus',
        postalCode: '10001'
      },
      medicalInfo: {
        allergies: ['Penicillin', 'Sulfa drugs'],
        chronicConditions: [],
        preferredPharmacy: 'Pharmacy Al-Rashid'
      },
      preferences: {
        deliveryNotifications: true,
        promotionalEmails: false,
        language: 'ar'
      }
    }

    return HttpResponse.json(mockPatient)
  })
]
