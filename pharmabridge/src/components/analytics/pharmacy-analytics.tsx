'use client'

import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, TrendingUp } from 'lucide-react'

interface PharmacyAnalyticsProps {
  pharmacyId: string
}

interface SalesDatum {
  date: string
  sales: number
  orders: number
}

interface ProductPerformanceItem {
  product: string
  quantity: number
  sales: number
  percentage: number
}

interface CategoryBreakdownItem {
  category: string
  sales: number
  percentage: number
}

interface PharmacyAnalyticsData {
  overview: {
    totalSales: number
    growthRate: number
    totalOrders: number
    averageOrderValue: number
    topProduct: string
  }
  salesData: SalesDatum[]
  productPerformance: ProductPerformanceItem[]
  categoryBreakdown: CategoryBreakdownItem[]
  customerInsights: {
    newCustomers: number
    returningCustomers: number
    averageCustomerValue: number
    topCustomerSegments: string[]
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function PharmacyAnalytics({ pharmacyId }: PharmacyAnalyticsProps) {
  const { data: analytics, isLoading } = useQuery<PharmacyAnalyticsData>({
    queryKey: ['pharmacy-analytics', pharmacyId],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/pharmacy/${pharmacyId}`)
      return response.json()
    },
  })

  const handleExport = async (format: 'csv') => {
    try {
      const response = await fetch(`/api/analytics/export/pharmacy/${pharmacyId}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pharmacy-analytics-${pharmacyId}.${format}`
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
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.overview.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.overview.growthRate}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.averageOrderValue.toFixed(2)} avg order value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{analytics.overview.topProduct}</div>
            <p className="text-xs text-muted-foreground">
              Best performing item
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.customerInsights.newCustomers}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Daily sales performance over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`$${value}`, name === 'sales' ? 'Sales' : 'Orders']} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 tablet:grid-cols-2">
        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products by sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.productPerformance.map((product, index: number) => (
                <div key={product.product} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{product.product}</p>
                      <p className="text-sm text-muted-foreground">{product.quantity} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${product.sales.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{product.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ payload }) => {
                    const item = payload as CategoryBreakdownItem | undefined
                    return item ? `${item.category} ${item.percentage}%` : ''
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {analytics.categoryBreakdown.map((entry, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
          <CardDescription>Customer behavior and segmentation analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 tablet:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.customerInsights.returningCustomers}</div>
              <p className="text-sm text-muted-foreground">Returning Customers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{analytics.customerInsights.averageCustomerValue.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Avg Customer Value</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{analytics.customerInsights.newCustomers}</div>
              <p className="text-sm text-muted-foreground">New Customers</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Top Customer Segments</h4>
            <div className="flex flex-wrap gap-2">
              {analytics.customerInsights.topCustomerSegments.map((segment: string) => (
                <Badge key={segment} variant="secondary">
                  {segment}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
