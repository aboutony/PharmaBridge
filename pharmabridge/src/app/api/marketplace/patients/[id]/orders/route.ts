import { NextResponse } from 'next/server'

export async function GET() {
  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      pharmacyName: 'Pharmacy Al-Rashid',
      status: 'delivered',
      total: 25.5,
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 2.5 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 20.5 },
      ],
      deliveryMethod: 'delivery',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deliveredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      pharmacyName: 'Al-Sham Pharmacy',
      status: 'preparing',
      total: 15.75,
      items: [{ name: 'Ibuprofen 200mg', quantity: 1, price: 15.75 }],
      deliveryMethod: 'pickup',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      estimatedReady: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
    },
  ]

  return NextResponse.json(orders)
}
