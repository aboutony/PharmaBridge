import { http, HttpResponse } from 'msw'

// Inventory handlers
export const inventoryHandlers = [
  http.get('/api/inventory', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const category = url.searchParams.get('category')
    const lowStock = url.searchParams.get('lowStock')

    let inventory = [
      {
        id: '1',
        drugId: '1',
        drugName: 'Paracetamol 500mg',
        category: 'Pain Relief',
        stock: 150,
        minStock: 50,
        maxStock: 500,
        expiryDate: '2026-12-31',
        batchNumber: 'BATCH001',
        supplier: 'MedSupply Co.',
        price: 2.50,
        location: 'Shelf A1',
      },
      {
        id: '2',
        drugId: '2',
        drugName: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        stock: 25, // Low stock
        minStock: 50,
        maxStock: 200,
        expiryDate: '2026-08-15', // Expiring soon
        batchNumber: 'BATCH002',
        supplier: 'PharmaLink',
        price: 8.75,
        location: 'Shelf B2',
      },
      {
        id: '3',
        drugId: '3',
        drugName: 'Vitamin C 1000mg',
        category: 'Vitamins',
        stock: 200,
        minStock: 100,
        maxStock: 300,
        expiryDate: '2027-03-20',
        batchNumber: 'BATCH003',
        supplier: 'HealthCorp',
        price: 5.00,
        location: 'Shelf C1',
      },
    ]

    // Filter by search
    if (search) {
      inventory = inventory.filter(item =>
        item.drugName.toLowerCase().includes(search.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by category
    if (category) {
      inventory = inventory.filter(item => item.category === category)
    }

    // Filter low stock
    if (lowStock === 'true') {
      inventory = inventory.filter(item => item.stock <= item.minStock)
    }

    return HttpResponse.json(inventory)
  }),

  http.get('/api/inventory/:id', ({ params }) => {
    const { id } = params
    // Mock single inventory item
    const item = {
      id,
      drugId: '1',
      drugName: 'Paracetamol 500mg',
      category: 'Pain Relief',
      stock: 150,
      minStock: 50,
      maxStock: 500,
      expiryDate: '2026-12-31',
      batchNumber: 'BATCH001',
      supplier: 'MedSupply Co.',
      price: 2.50,
      location: 'Shelf A1',
    }
    return HttpResponse.json(item)
  }),

  http.post('/api/inventory', async ({ request }) => {
    const body = await request.json()
    const newItem = {
      id: String(Date.now()),
      ...body,
    }
    return HttpResponse.json(newItem, { status: 201 })
  }),

  http.put('/api/inventory/:id', async ({ request, params }) => {
    const { id } = params
    const body = await request.json()
    const updatedItem = {
      id,
      ...body,
    }
    return HttpResponse.json(updatedItem)
  }),

  http.delete('/api/inventory/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({ message: 'Item deleted' })
  }),

  // Inventory alerts
  http.get('/api/inventory/alerts', () => {
    const alerts = [
      {
        id: '1',
        type: 'low_stock',
        message: 'Amoxicillin 500mg stock is below minimum level',
        itemId: '2',
        severity: 'warning',
      },
      {
        id: '2',
        type: 'expiring_soon',
        message: 'Amoxicillin 500mg expires in 4 months',
        itemId: '2',
        severity: 'warning',
      },
      {
        id: '3',
        type: 'expired',
        message: 'Old batch of Vitamin C has expired',
        itemId: '3',
        severity: 'danger',
      },
    ]
    return HttpResponse.json(alerts)
  }),

  // Dashboard metrics
  http.get('/api/inventory/metrics', () => {
    const metrics = {
      totalItems: 1250,
      totalValue: 15420.50,
      lowStockItems: 5,
      expiringItems: 12,
      outOfStockItems: 2,
      categories: {
        'Pain Relief': 150,
        'Antibiotics': 75,
        'Vitamins': 200,
        'Cardiovascular': 120,
        'Respiratory': 80,
      }
    }
    return HttpResponse.json(metrics)
  })
]