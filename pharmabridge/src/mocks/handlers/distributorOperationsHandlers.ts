import { http, HttpResponse } from 'msw'

// Distributor operations handlers
export const distributorOperationsHandlers = [
  // Enhanced distributor search with filters
  http.get('/api/distributors/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    const location = url.searchParams.get('location')
    const category = url.searchParams.get('category')

    let distributors = [
      {
        id: '1',
        name: 'MedSupply Co.',
        location: 'Damascus',
        rating: 4.5,
        categories: ['Pharmaceuticals', 'Medical Supplies'],
        contact: '+963 11 123 4567',
        email: 'contact@medsupply.sy',
        description: 'Leading pharmaceutical distributor in Syria',
        inventory: {
          total: 1250,
          available: 980,
          lowStock: 15
        }
      },
      {
        id: '2',
        name: 'PharmaLink',
        location: 'Beirut',
        rating: 4.2,
        categories: ['Pharmaceuticals', 'Vaccines'],
        contact: '+961 1 234 567',
        email: 'info@pharmalink.lb',
        description: 'Regional pharmaceutical distribution network',
        inventory: {
          total: 890,
          available: 756,
          lowStock: 8
        }
      },
      {
        id: '3',
        name: 'HealthCorp Distributors',
        location: 'Aleppo',
        rating: 4.8,
        categories: ['Medical Equipment', 'Pharmaceuticals'],
        contact: '+963 21 345 678',
        email: 'sales@healthcorp.sy',
        description: 'Complete healthcare distribution solutions',
        inventory: {
          total: 650,
          available: 589,
          lowStock: 3
        }
      }
    ]

    // Filter by search query
    if (query) {
      distributors = distributors.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.description.toLowerCase().includes(query.toLowerCase()) ||
        d.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      )
    }

    // Filter by location
    if (location) {
      distributors = distributors.filter(d => d.location === location)
    }

    // Filter by category
    if (category) {
      distributors = distributors.filter(d => d.categories.includes(category))
    }

    return HttpResponse.json(distributors)
  }),

  // Get distributor inventory
  http.get('/api/distributors/:id/inventory', ({ params }) => {
    const { id } = params

    const mockInventory = {
      distributorId: id,
      lastUpdated: new Date().toISOString(),
      categories: [
        {
          name: 'Pain Relief',
          items: [
            { id: '1', name: 'Paracetamol 500mg', stock: 500, price: 2.50, minOrder: 10 },
            { id: '2', name: 'Ibuprofen 200mg', stock: 300, price: 1.80, minOrder: 15 }
          ]
        },
        {
          name: 'Antibiotics',
          items: [
            { id: '3', name: 'Amoxicillin 500mg', stock: 200, price: 8.75, minOrder: 5 },
            { id: '4', name: 'Azithromycin 250mg', stock: 150, price: 12.50, minOrder: 3 }
          ]
        },
        {
          name: 'Cardiovascular',
          items: [
            { id: '5', name: 'Amlodipine 5mg', stock: 180, price: 3.25, minOrder: 10 },
            { id: '6', name: 'Losartan 50mg', stock: 120, price: 4.50, minOrder: 8 }
          ]
        }
      ]
    }

    return HttpResponse.json(mockInventory)
  }),

  // Create order
  http.post('/api/orders', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>

    const newOrder = {
      id: String(Date.now()),
      pharmacyId: String(body.pharmacyId ?? ''),
      distributorId: String(body.distributorId ?? ''),
      items: Array.isArray(body.items) ? body.items : [],
      total: Number(body.total ?? 0),
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    }

    return HttpResponse.json(newOrder, { status: 201 })
  }),

  // Get order details
  http.get('/api/orders/:id', ({ params }) => {
    const { id } = params

    const mockOrder = {
      id,
      distributorId: '1',
      distributorName: 'MedSupply Co.',
      pharmacyId: '1',
      pharmacyName: 'Pharmacy Al-Rashid',
      status: 'processing',
      items: [
        { id: '1', name: 'Paracetamol 500mg', quantity: 50, price: 2.50, total: 125.00 },
        { id: '3', name: 'Amoxicillin 500mg', quantity: 20, price: 8.75, total: 175.00 }
      ],
      subtotal: 300.00,
      tax: 45.00,
      shipping: 15.00,
      total: 360.00,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: 'TRK' + id
    }

    return HttpResponse.json(mockOrder)
  }),

  // Get pharmacy orders
  http.get('/api/pharmacies/:id/orders', ({ params }) => {
    const { id } = params

    const mockOrders = [
      {
        id: '1',
        distributorName: 'MedSupply Co.',
        status: 'delivered',
        total: 450.00,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        itemsCount: 5
      },
      {
        id: '2',
        distributorName: 'PharmaLink',
        status: 'processing',
        total: 275.50,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        itemsCount: 3
      },
      {
        id: '3',
        distributorName: 'HealthCorp Distributors',
        status: 'shipped',
        total: 180.25,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        itemsCount: 2
      }
    ]

    return HttpResponse.json(mockOrders)
  }),

  // Get credit information
  http.get('/api/pharmacies/:id/credit', ({ params }) => {
    const { id } = params

    const mockCredit = {
      pharmacyId: id,
      creditLimit: 5000.00,
      availableCredit: 3200.00,
      usedCredit: 1800.00,
      outstandingPayments: 450.00,
      paymentDueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      creditScore: 85
    }

    return HttpResponse.json(mockCredit)
  }),

  // Get payment history
  http.get('/api/pharmacies/:id/payments', ({ params }) => {
    const { id } = params

    const mockPayments = [
      {
        id: '1',
        orderId: '1',
        amount: 450.00,
        status: 'paid',
        paymentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        method: 'bank_transfer'
      },
      {
        id: '2',
        orderId: '2',
        amount: 275.50,
        status: 'pending',
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        method: 'credit'
      }
    ]

    return HttpResponse.json(mockPayments)
  })
]
