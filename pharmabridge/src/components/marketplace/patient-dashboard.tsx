'use client'

import { useQuery } from '@tanstack/react-query'
import { Package, Clock, MapPin, CheckCircle, XCircle, Truck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Order {
  id: string
  orderNumber: string
  pharmacyName: string
  status: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  deliveryMethod: string
  createdAt: string
  deliveredAt?: string
  estimatedReady?: string
}

export function PatientDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['patient-orders'],
    queryFn: async () => {
      const response = await fetch('/api/marketplace/patients/1/orders')
      return response.json()
    },
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />
      case 'preparing':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-danger" />
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'delivered':
        return 'default'
      case 'cancelled':
        return 'destructive'
      case 'ready':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading your orders...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Orders</h2>
        <p className="text-muted-foreground">Track your medicine orders and prescriptions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {orders?.filter((o: Order) => o.status === 'delivered').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {orders?.filter((o: Order) => ['pending', 'preparing', 'ready'].includes(o.status)).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orders?.reduce((sum: number, order: Order) => sum + order.total, 0).toFixed(2) || '0.00'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and track all your medicine orders</CardDescription>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order: Order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium">Order #{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.pharmacyName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${order.total.toFixed(2)}</p>
                      <Badge variant={getStatusVariant(order.status)} className="mt-1">
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {item.quantity}× {item.name}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-muted-foreground">
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      {order.deliveryMethod === 'delivery' ? (
                        <Truck className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      <span className="capitalize">{order.deliveryMethod}</span>
                    </div>

                    {order.status === 'delivered' && order.deliveredAt && (
                      <p className="text-success">
                        Delivered {new Date(order.deliveredAt).toLocaleDateString()}
                      </p>
                    )}

                    {order.status === 'ready' && order.estimatedReady && (
                      <p className="text-warning">
                        Ready by {new Date(order.estimatedReady).toLocaleTimeString()}
                      </p>
                    )}

                    {['pending', 'preparing'].includes(order.status) && (
                      <p className="text-muted-foreground">
                        Processing...
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {['pending', 'preparing'].includes(order.status) && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button size="sm">
                        Confirm Pickup
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start by searching for medicines and placing your first order
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}