import { http, HttpResponse } from 'msw'

// Mock data models
export const mockData = {
  pharmacies: [
    { id: '1', name: 'Pharmacy Al-Rashid', location: 'Damascus', inventoryCount: 1250 },
    { id: '2', name: 'Al-Sham Pharmacy', location: 'Aleppo', inventoryCount: 980 },
    { id: '3', name: 'City Pharmacy', location: 'Homs', inventoryCount: 1450 },
  ],
  drugs: [
    { id: '1', name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 150, price: 2.50 },
    { id: '2', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 75, price: 8.75 },
    { id: '3', name: 'Vitamin C 1000mg', category: 'Vitamins', stock: 200, price: 5.00 },
  ],
  distributors: [
    { id: '1', name: 'MedSupply Co.', location: 'Damascus', rating: 4.5 },
    { id: '2', name: 'PharmaLink', location: 'Beirut', rating: 4.2 },
  ],
  orders: [
    { id: '1', pharmacyId: '1', distributorId: '1', status: 'pending', total: 450.00 },
    { id: '2', pharmacyId: '2', distributorId: '2', status: 'completed', total: 275.50 },
  ]
}