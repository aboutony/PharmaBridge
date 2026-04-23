'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCart, Package, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DistributorInventoryItem {
  id: string
  name: string
  stock: number
  price: number
  minOrder: number
}

interface InventoryCategory {
  name: string
  items: DistributorInventoryItem[]
}

interface DistributorInventory {
  distributorId: string
  lastUpdated: string
  categories: InventoryCategory[]
}

interface LiveInventoryProps {
  distributorId: string
  distributorName: string
}

export function LiveInventory({ distributorId, distributorName }: LiveInventoryProps) {
  const { data: inventory, isLoading } = useQuery<DistributorInventory>({
    queryKey: ['distributor-inventory', distributorId],
    queryFn: async () => {
      const response = await fetch(`/api/distributors/${distributorId}/inventory`)
      return response.json()
    },
  })

  const [cart, setCart] = useState<Record<string, number>>({})

  const addToCart = (itemId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity
    }))
  }

  const getStockStatus = (stock: number, minOrder: number) => {
    if (stock === 0) return { status: 'Out of Stock', variant: 'destructive' as const }
    if (stock < minOrder * 2) return { status: 'Limited', variant: 'secondary' as const }
    return { status: 'Available', variant: 'default' as const }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading inventory...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{distributorName} - Live Inventory</h3>
          <p className="text-sm text-muted-foreground">
            Last updated: {inventory?.lastUpdated ? new Date(inventory.lastUpdated).toLocaleString() : 'Unknown'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          <span className="font-medium">
            {Object.keys(cart).length} items in cart
          </span>
          {Object.keys(cart).length > 0 && (
            <Button size="sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Place Order
            </Button>
          )}
        </div>
      </div>

      {inventory?.categories?.map((category) => (
        <Card key={category.name}>
          <CardHeader>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
              {category.items.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.minOrder)
                const cartQuantity = cart[item.id] || 0

                return (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <Badge variant={stockStatus.variant} className="text-xs">
                        {stockStatus.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Stock: {item.stock}</span>
                      <span>Min: {item.minOrder}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(item.id, item.minOrder)}
                        disabled={item.stock < item.minOrder}
                      >
                        Add {item.minOrder}
                      </Button>
                      {cartQuantity > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {cartQuantity} in cart
                        </Badge>
                      )}
                    </div>

                    {item.stock < item.minOrder && (
                      <div className="flex items-center gap-2 text-sm text-warning">
                        <AlertTriangle className="w-4 h-4" />
                        Below minimum order quantity
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          No inventory data available
        </div>
      )}
    </div>
  )
}
