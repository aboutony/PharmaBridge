import { http, HttpResponse } from 'msw'
import { mockData } from './data/mockData'

// Server-side MSW handlers (for SSR/SSG)
export const serverHandlers = [
  // Same handlers as browser but for server environment
  http.get('/api/pharmacies', () => {
    return HttpResponse.json(mockData.pharmacies)
  }),

  http.get('/api/drugs', () => {
    return HttpResponse.json(mockData.drugs)
  }),

  http.get('/api/distributors', () => {
    return HttpResponse.json(mockData.distributors)
  }),

  http.get('/api/orders', () => {
    return HttpResponse.json(mockData.orders)
  })
]