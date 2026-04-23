'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { MapPin, Truck, Clock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PrescriptionUpload } from './prescription-upload'
import { Badge } from '@/components/ui/badge'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  requiresPrescription: boolean
}

interface OrderPlacementProps {
  pharmacyId: string
  pharmacyName: string
  items: OrderItem[]
  onOrderComplete: (order: any) => void
}

export function OrderPlacement({
  pharmacyId,
  pharmacyName,
  items,
  onOrderComplete
}: OrderPlacementProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = deliveryMethod === 'delivery' ? 2.50 : 0
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + deliveryFee + tax

  const requiresPrescription = items.some(item => item.requiresPrescription)

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await fetch('/api/marketplace/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
      return response.json()
    },
    onSuccess: (order) => {
      onOrderComplete(order)
    },
  })

  const handlePlaceOrder = () => {
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter a delivery address')
      return
    }

    if (requiresPrescription && !prescriptionUploaded) {
      alert('Please upload a prescription for prescription-required items')
      return
    }

    const orderData = {
      pharmacyId,
      pharmacyName,
      items,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress : null,
      specialInstructions,
      subtotal,
      deliveryFee,
      tax,
      total,
      prescriptionUploaded,
    }

    placeOrderMutation.mutate(orderData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your order from {pharmacyName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price} × {item.quantity}
                    {item.requiresPrescription && (
                      <Badge variant="secondary" className="ml-2 text-xs">Rx Required</Badge>
                    )}
                  </p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Method */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={deliveryMethod} onValueChange={(value: 'pickup' | 'delivery') => setDeliveryMethod(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Pickup</div>
                    <div className="text-sm text-muted-foreground">Ready in 30 minutes</div>
                  </div>
                  <Badge variant="outline">Free</Badge>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-muted-foreground">45-60 minutes</div>
                  </div>
                  <Badge variant="outline">${deliveryFee.toFixed(2)}</Badge>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {deliveryMethod === 'delivery' && (
            <div className="mt-4">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your full delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Special Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Special Instructions (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any special instructions for your order..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Prescription Upload */}
      {requiresPrescription && (
        <PrescriptionUpload
          onUpload={(file) => setPrescriptionUploaded(true)}
        />
      )}

      {/* Place Order */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${total.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                {deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'} • Est. {deliveryMethod === 'delivery' ? '45-60 min' : '30 min'}
              </p>
            </div>
            <Button
              size="lg"
              onClick={handlePlaceOrder}
              disabled={placeOrderMutation.isPending ||
                       (deliveryMethod === 'delivery' && !deliveryAddress.trim()) ||
                       (requiresPrescription && !prescriptionUploaded)}
            >
              {placeOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}