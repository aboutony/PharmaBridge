import { http, HttpResponse } from 'msw'
import { mockData } from '../data/mockData'

// Pharmacy endpoints
export const pharmacyHandlers = [
  http.get('/api/pharmacies', () => {
    return HttpResponse.json(mockData.pharmacies)
  }),

  http.get('/api/pharmacies/:id', ({ params }) => {
    const { id } = params
    const pharmacy = mockData.pharmacies.find(p => p.id === id)
    return pharmacy ? HttpResponse.json(pharmacy) : HttpResponse.json({ error: 'Pharmacy not found' }, { status: 404 })
  }),

  http.post('/api/pharmacies', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    const newPharmacy: typeof mockData.pharmacies[number] = {
      id: String(mockData.pharmacies.length + 1),
      name: String(body.name ?? 'New Pharmacy'),
      location: String(body.location ?? 'Unknown'),
      inventoryCount: Number(body.inventoryCount ?? 0),
    }
    mockData.pharmacies.push(newPharmacy)
    return HttpResponse.json(newPharmacy, { status: 201 })
  })
]

// Drug endpoints
export const drugHandlers = [
  http.get('/api/drugs', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    let drugs = mockData.drugs

    if (category) {
      drugs = drugs.filter(d => d.category === category)
    }

    return HttpResponse.json(drugs)
  }),

  http.get('/api/drugs/:id', ({ params }) => {
    const { id } = params
    const drug = mockData.drugs.find(d => d.id === id)
    return drug ? HttpResponse.json(drug) : HttpResponse.json({ error: 'Drug not found' }, { status: 404 })
  })
]

// Distributor endpoints
export const distributorHandlers = [
  http.get('/api/distributors', () => {
    return HttpResponse.json(mockData.distributors)
  }),

  http.get('/api/distributors/:id', ({ params }) => {
    const { id } = params
    const distributor = mockData.distributors.find(d => d.id === id)
    return distributor ? HttpResponse.json(distributor) : HttpResponse.json({ error: 'Distributor not found' }, { status: 404 })
  })
]

// Order endpoints
export const orderHandlers = [
  http.get('/api/orders', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    let orders = mockData.orders

    if (status) {
      orders = orders.filter(o => o.status === status)
    }

    return HttpResponse.json(orders)
  }),

  http.post('/api/orders', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    const newOrder: typeof mockData.orders[number] = {
      id: String(mockData.orders.length + 1),
      status: 'pending',
      pharmacyId: String(body.pharmacyId ?? ''),
      distributorId: String(body.distributorId ?? ''),
      total: Number(body.total ?? 0),
    }
    mockData.orders.push(newOrder)
    return HttpResponse.json(newOrder, { status: 201 })
  })
]
