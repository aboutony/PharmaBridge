'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Plus, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveTable } from '@/components/ui/responsive-table'
import { BarcodeScanner, useBarcodeScanner } from './barcode-scanner'

interface InventoryItem {
  id: string
  drugName: string
  category: string
  stock: number
  minStock: number
  expiryDate: string
  batchNumber: string
  price: number
}

export function DrugCatalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const { scannedCode, error, handleScan, handleError, reset } = useBarcodeScanner()

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory', searchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)

      const response = await fetch(`/api/inventory?${params}`)
      return response.json()
    },
  })

  // Handle barcode scan
  useState(() => {
    if (scannedCode) {
      setSearchTerm(scannedCode)
      setShowScanner(false)
      reset()
    }
  })

  const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Cardiovascular', 'Respiratory']

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock === 0) return { status: 'Out of Stock', variant: 'destructive' as const }
    if (item.stock <= item.minStock) return { status: 'Low Stock', variant: 'secondary' as const }
    return { status: 'In Stock', variant: 'default' as const }
  }

  const getExpiryStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const monthsUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)

    if (monthsUntilExpiry < 0) return { status: 'Expired', variant: 'destructive' as const }
    if (monthsUntilExpiry <= 3) return { status: 'Expiring Soon', variant: 'secondary' as const }
    return { status: 'Valid', variant: 'default' as const }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Drug Catalog</h2>
          <p className="text-muted-foreground">Manage your pharmacy inventory</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowScanner(!showScanner)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            Scan Barcode
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by drug name or batch number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === (category === 'All' ? '' : category) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barcode Scanner */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onError={handleError}
        />
      )}

      {/* Scanned Code Alert */}
      {scannedCode && (
        <Card className="border-success">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-success">Barcode scanned successfully!</p>
                <p className="text-sm text-muted-foreground">Code: {scannedCode}</p>
              </div>
              <Button onClick={reset} variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            {inventory?.length || 0} items found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading inventory...</div>
          ) : (
            <ResponsiveTable
              data={inventory || []}
              columns={[
                {
                  key: 'drugName',
                  label: 'Drug Name',
                },
                {
                  key: 'category',
                  label: 'Category',
                },
                {
                  key: 'stock',
                  label: 'Stock',
                  render: (value, item: InventoryItem) => (
                    <div className="flex items-center gap-2">
                      <span>{value}</span>
                      <Badge variant={getStockStatus(item).variant} className="text-xs">
                        {getStockStatus(item).status}
                      </Badge>
                    </div>
                  ),
                },
                {
                  key: 'expiryDate',
                  label: 'Expiry',
                  render: (value) => (
                    <Badge variant={getExpiryStatus(value).variant} className="text-xs">
                      {getExpiryStatus(value).status}
                    </Badge>
                  ),
                },
                {
                  key: 'price',
                  label: 'Price',
                  render: (value) => `$${value}`,
                },
                {
                  key: 'batchNumber',
                  label: 'Batch',
                },
              ]}
              mobileCardFields={[
                { key: 'drugName', label: 'Drug' },
                { key: 'stock', label: 'Stock' },
                { key: 'expiryDate', label: 'Expiry' },
              ]}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}