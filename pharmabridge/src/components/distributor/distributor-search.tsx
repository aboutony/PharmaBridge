'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, MapPin, Star, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Distributor {
  id: string
  name: string
  location: string
  rating: number
  categories: string[]
  contact: string
  email: string
  description: string
  inventory: {
    total: number
    available: number
    lowStock: number
  }
}

interface DistributorSearchProps {
  onSelectDistributor?: (distributor: Distributor) => void
}

export function DistributorSearch({ onSelectDistributor }: DistributorSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const { data: distributors, isLoading } = useQuery({
    queryKey: ['distributors-search', searchQuery, locationFilter, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchQuery) params.append('q', searchQuery)
      if (locationFilter) params.append('location', locationFilter)
      if (categoryFilter) params.append('category', categoryFilter)

      const response = await fetch(`/api/distributors/search?${params}`)
      return response.json()
    },
  })

  const locations = ['All', 'Damascus', 'Aleppo', 'Homs', 'Hama', 'Latakia', 'Beirut']
  const categories = ['All', 'Pharmaceuticals', 'Medical Supplies', 'Vaccines', 'Medical Equipment']

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Find Distributors</h2>
          <p className="text-muted-foreground">Search and connect with pharmaceutical distributors</p>
        </div>
      </div>

      {/* Search Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 tablet:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search distributors, categories, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={locationFilter} onValueChange={(value) => setLocationFilter(value === 'All' ? '' : value)}>
              <SelectTrigger className="w-full tablet:w-48">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value === 'All' ? '' : value)}>
              <SelectTrigger className="w-full tablet:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading distributors...</div>
        ) : distributors?.length > 0 ? (
          distributors.map((distributor: Distributor) => (
            <Card key={distributor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{distributor.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {distributor.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(distributor.rating)}
                    <span className="text-sm font-medium ml-1">{distributor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{distributor.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {distributor.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">{distributor.inventory.total}</div>
                    <div className="text-xs text-muted-foreground">Total Items</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-success">{distributor.inventory.available}</div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-warning">{distributor.inventory.lowStock}</div>
                    <div className="text-xs text-muted-foreground">Low Stock</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onSelectDistributor?.(distributor)}
                  >
                    View Inventory
                  </Button>
                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No distributors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}