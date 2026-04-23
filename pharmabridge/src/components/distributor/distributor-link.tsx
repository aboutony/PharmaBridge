'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Eye, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DistributorSearch } from './distributor-search'
import { LiveInventory } from './live-inventory'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

interface Order {
  id: string
  distributorName: string
  status: string
  total: number
  createdAt: string
  itemsCount: number
}

export function DistributorLink() {
  const [selectedDistributor, setSelectedDistributor] = useState<any>(null)
  const [showInventory, setShowInventory] = useState(false)
  const queryClient = useQueryClient()

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['pharmacy-orders'],
    queryFn: async () => {
      const response = await fetch('/api/pharmacies/1/orders')
      return response.json()
    },
  })

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pharmacy-orders'] })
      setSelectedDistributor(null)
      setShowInventory(false)
    },
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />
      case 'processing':
        return <Package className="w-4 h-4 text-blue-500" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-orange-500" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-danger" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
      case 'processing':
        return 'secondary'
      case 'shipped':
        return 'outline'
      case 'delivered':
        return 'default'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <h2 className="text-2xl font-bold">DistributorLink</h2>
          <p className="text-muted-foreground">Connect with distributors and place orders</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Find Distributors
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Search Distributors</DialogTitle>
              <DialogDescription>
                Find and connect with pharmaceutical distributors in your area
              </DialogDescription>
            </DialogHeader>
            <DistributorSearch
              onSelectDistributor={(distributor) => {
                setSelectedDistributor(distributor)
                setShowInventory(true)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Live Inventory Modal */}
      {selectedDistributor && showInventory && (
        <Dialog open={showInventory} onOpenChange={setShowInventory}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedDistributor.name} - Live Inventory</DialogTitle>
              <DialogDescription>
                Browse available products and place orders
              </DialogDescription>
            </DialogHeader>
            <LiveInventory
              distributorId={selectedDistributor.id}
              distributorName={selectedDistributor.name}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Track your distributor orders and deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <div className="text-center py-8">Loading orders...</div>
          ) : orders?.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order: Order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.distributorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.itemsCount} items • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No orders yet. Start by finding distributors above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}