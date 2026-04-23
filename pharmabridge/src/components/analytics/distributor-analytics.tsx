'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react'

interface DistributorAnalyticsProps {
  distributorId: string
}

export function DistributorAnalytics({ distributorId }: DistributorAnalyticsProps) {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['distributor-analytics', distributorId],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/distributor/${distributorId}`)
      return response.json()
    },
  })

  const handleExport = async (format: 'csv') => {
    try {
      const response = await fetch(`/api/analytics/export/distributor/${distributorId}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `distributor-analytics-${distributorId}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading analytics...</div>
  }

  if (!analytics) {
    return <div className="text-center py-8">No analytics data available</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Business intelligence and performance metrics</p>
        </div>
        <Button onClick={() => handleExport('csv')} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.overview.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.marketShare}% market share
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              ${analytics.overview.averageOrderValue.toFixed(2)} avg order
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pharmacies</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.activePharmacies}</div>
            <p className="text-xs text-muted-foreground">
              Partner pharmacies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.2%</div>
            <p className="text-xs text-muted-foreground">
              This quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Daily revenue performance over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 tablet:grid-cols-2">
        {/* Pharmacy Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pharmacies</CardTitle>
            <CardDescription>Pharmacies by order volume and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.pharmacyPerformance.map((pharmacy: any, index: number) => (
                <div key={pharmacy.pharmacy} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{pharmacy.pharmacy}</p>
                      <p className="text-sm text-muted-foreground">{pharmacy.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${pharmacy.revenue.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{pharmacy.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Product Demand Trends</CardTitle>
            <CardDescription>Popular products and demand patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.productDemand.map((product: any) => (
                <div key={product.product} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{product.product}</p>
                    <p className="text-sm text-muted-foreground">{product.demand} units demanded</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      product.trend === 'increasing' ? 'default' :
                      product.trend === 'decreasing' ? 'destructive' : 'secondary'
                    }>
                      {product.trend}
                    </Badge>
                    <p className="text-sm mt-1">
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
          <CardDescription>Revenue and order distribution by region</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.regionalPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'Revenue' : 'Orders']} />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}