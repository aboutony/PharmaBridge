import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as {
    pharmacyId?: string
    pharmacyName?: string
    items?: Array<{ id: string; quantity: number }>
    deliveryMethod?: string
    deliveryAddress?: string | null
    prescriptionUploaded?: boolean
    total?: number
    deliveryFee?: number
  }

  const order = {
    id: String(Date.now()),
    patientId: 'patient-1',
    pharmacyId: body.pharmacyId ?? '',
    pharmacyName: body.pharmacyName ?? '',
    items: body.items ?? [],
    deliveryMethod: body.deliveryMethod ?? 'pickup',
    deliveryAddress: body.deliveryAddress ?? null,
    prescriptionUploaded: Boolean(body.prescriptionUploaded),
    total: Number(body.total ?? 0),
    deliveryFee: Number(body.deliveryFee ?? 0),
    status: 'confirmed',
    estimatedDelivery:
      body.deliveryMethod === 'delivery'
        ? '45-60 minutes'
        : 'Ready for pickup in 30 minutes',
    createdAt: new Date().toISOString(),
    orderNumber: `ORD-${Date.now()}`,
  }

  return NextResponse.json(order, { status: 201 })
}
