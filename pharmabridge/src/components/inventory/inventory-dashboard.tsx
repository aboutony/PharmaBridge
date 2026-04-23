'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Package, TrendingUp, DollarSign } from 'lucide-react'

export function InventoryDashboard() {
  // Fetch inventory metrics
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['inventory-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/metrics')
      return response.json()
    },
  })

  // Fetch alerts
  const { data: alerts } = useQuery({
    queryKey: ['inventory-alerts'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/alerts')
      return response.json()
    },
  })

  if (isLoading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              In inventory
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics?.totalValue?.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">
              Inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{metrics?.lowStockItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              Items below minimum
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{metrics?.expiringItems || 0}</div>
            <p className="text-xs text-muted-foreground">
              Within 6 months
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Important notifications about your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts?.map((alert: any) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'danger' ? 'text-danger' : 'text-warning'
                  }`} />
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">Item ID: {alert.itemId}</p>
                  </div>
                </div>
                <Badge variant={alert.severity === 'danger' ? 'destructive' : 'secondary'}>
                  {alert.type.replace('_', ' ')}
                </Badge>
              </div>
            )) || (
              <p className="text-muted-foreground">No alerts at this time</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory by Category</CardTitle>
          <CardDescription>Distribution of items across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics?.categories && Object.entries(metrics.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(count as number / metrics.totalItems) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}