import { http, HttpResponse } from 'msw'

// Analytics handlers
export const analyticsHandlers = [
  // Pharmacy analytics
  http.get('/api/analytics/pharmacy/:id', ({ params }) => {
    const { id } = params

    const mockAnalytics = {
      pharmacyId: id,
      period: 'last_30_days',
      overview: {
        totalSales: 45230.50,
        totalOrders: 1247,
        averageOrderValue: 36.28,
        topProduct: 'Paracetamol 500mg',
        growthRate: 12.5,
      },
      salesData: [
        { date: '2024-03-01', sales: 1200.50, orders: 35 },
        { date: '2024-03-02', sales: 1450.75, orders: 42 },
        { date: '2024-03-03', sales: 980.25, orders: 28 },
        { date: '2024-03-04', sales: 1680.00, orders: 51 },
        { date: '2024-03-05', sales: 1320.80, orders: 38 },
        // ... more data points
      ],
      productPerformance: [
        { product: 'Paracetamol 500mg', sales: 8750.00, quantity: 1750, percentage: 19.3 },
        { product: 'Amoxicillin 500mg', sales: 6820.50, quantity: 1364, percentage: 15.1 },
        { product: 'Vitamin C 1000mg', sales: 5940.00, quantity: 1980, percentage: 13.1 },
        { product: 'Ibuprofen 200mg', sales: 5230.25, quantity: 1744, percentage: 11.6 },
        { product: 'Aspirin 100mg', sales: 4120.75, quantity: 1374, percentage: 9.1 },
      ],
      categoryBreakdown: [
        { category: 'Pain Relief', sales: 15200.50, percentage: 33.6 },
        { category: 'Antibiotics', sales: 12850.75, percentage: 28.4 },
        { category: 'Vitamins', sales: 8940.25, percentage: 19.8 },
        { category: 'Cardiovascular', sales: 5230.00, percentage: 11.6 },
        { category: 'Respiratory', sales: 3009.00, percentage: 6.6 },
      ],
      customerInsights: {
        newCustomers: 89,
        returningCustomers: 456,
        averageCustomerValue: 98.50,
        topCustomerSegments: ['Families', 'Seniors', 'Working Professionals'],
      }
    }

    return HttpResponse.json(mockAnalytics)
  }),

  // Distributor analytics
  http.get('/api/analytics/distributor/:id', ({ params }) => {
    const { id } = params

    const mockAnalytics = {
      distributorId: id,
      period: 'last_30_days',
      overview: {
        totalRevenue: 145230.75,
        totalOrders: 892,
        activePharmacies: 156,
        averageOrderValue: 162.8,
        marketShare: 23.5,
      },
      revenueData: [
        { date: '2024-03-01', revenue: 4200.50, orders: 28 },
        { date: '2024-03-02', revenue: 5100.75, orders: 34 },
        { date: '2024-03-03', revenue: 3800.25, orders: 22 },
        { date: '2024-03-04', revenue: 6200.00, orders: 41 },
        { date: '2024-03-05', revenue: 4800.80, orders: 31 },
        // ... more data points
      ],
      pharmacyPerformance: [
        { pharmacy: 'Pharmacy Al-Rashid', orders: 45, revenue: 7230.50, rating: 4.8 },
        { pharmacy: 'Al-Sham Pharmacy', orders: 38, revenue: 5890.25, rating: 4.6 },
        { pharmacy: 'City Pharmacy', orders: 52, revenue: 8940.00, rating: 4.9 },
        { pharmacy: 'Health Plus', orders: 29, revenue: 4560.75, rating: 4.4 },
        { pharmacy: 'MediCare', orders: 41, revenue: 6780.25, rating: 4.7 },
      ],
      productDemand: [
        { product: 'Paracetamol 500mg', demand: 1250, trend: 'increasing', growth: 15.2 },
        { product: 'Amoxicillin 500mg', demand: 890, trend: 'stable', growth: 2.1 },
        { product: 'Vitamin C 1000mg', demand: 1450, trend: 'increasing', growth: 22.8 },
        { product: 'Ibuprofen 200mg', demand: 780, trend: 'decreasing', growth: -5.3 },
        { product: 'Aspirin 100mg', demand: 620, trend: 'stable', growth: 0.8 },
      ],
      regionalPerformance: [
        { region: 'Damascus', revenue: 45230.50, orders: 289, growth: 18.5 },
        { region: 'Aleppo', revenue: 38750.25, orders: 234, growth: 12.3 },
        { region: 'Homs', revenue: 28940.00, orders: 156, growth: 8.7 },
        { region: 'Hama', revenue: 19850.75, orders: 123, growth: 15.2 },
        { region: 'Latakia', revenue: 12460.25, orders: 90, growth: 22.1 },
      ]
    }

    return HttpResponse.json(mockAnalytics)
  }),

  // Export analytics data
  http.get('/api/analytics/export/:type/:id', ({ params }) => {
    const { type, id } = params

    // Mock CSV export
    const csvData = `Date,Sales,Orders
2024-03-01,1200.50,35
2024-03-02,1450.75,42
2024-03-03,980.25,28
2024-03-04,1680.00,51
2024-03-05,1320.80,38`

    return new Response(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${type}-analytics-${id}.csv"`
      },
    })
  }),

  // Dashboard metrics for admin
  http.get('/api/analytics/admin/overview', () => {
    const mockOverview = {
      totalPharmacies: 2150,
      totalDistributors: 85,
      totalRevenue: 1285000.50,
      totalOrders: 15420,
      platformGrowth: 24.8,
      monthlyActiveUsers: 8920,
      averageOrderValue: 83.25,
      topPerformingRegion: 'Damascus',
      systemHealth: {
        uptime: 99.9,
        responseTime: 120,
        errorRate: 0.1,
      }
    }

    return HttpResponse.json(mockOverview)
  })
]