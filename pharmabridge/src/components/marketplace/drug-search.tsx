'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, MapPin, Clock, Truck, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface DrugSearchResult {
  pharmacyId: string
  pharmacyName: string
  location: string
  distance: number
  drugName: string
  price: number
  originalPrice: number
  stock: number
  requiresPrescription: boolean
  rating: number
  deliveryTime: string
  deliveryFee: number
  isOpen: boolean
  operatingHours: string
  contact: string
}

export function DrugAvailabilitySearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [submittedLocation, setSubmittedLocation] = useState('')
  const [submittedMaxPrice, setSubmittedMaxPrice] = useState('')

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['drug-search', submittedQuery, submittedLocation, submittedMaxPrice],
    queryFn: async () => {
      if (!submittedQuery.trim()) return []

      const params = new URLSearchParams()
      params.append('drug', submittedQuery)
      if (submittedLocation) params.append('location', submittedLocation)
      if (submittedMaxPrice) params.append('maxPrice', submittedMaxPrice)

      const response = await fetch(`/api/marketplace/search?${params}`)
      return response.json()
    },
    enabled: !!submittedQuery.trim(),
  })

  const handleSearch = () => {
    setSubmittedQuery(searchQuery.trim())
    setSubmittedLocation(location.trim())
    setSubmittedMaxPrice(maxPrice.trim())
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Find Your Medicine</h2>
        <p className="text-muted-foreground">Search for drugs and find the best prices at nearby pharmacies</p>
      </div>

      {/* Search Form */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Medicine Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="e.g., Paracetamol, Amoxicillin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full tablet:w-48">
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                placeholder="Your city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="w-full tablet:w-32">
              <label className="block text-sm font-medium mb-2">Max Price</label>
              <Input
                type="number"
                placeholder="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch} className="w-full tablet:w-auto">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {isLoading && (
        <div className="text-center py-8">Searching for medicines...</div>
      )}

      {searchResults && searchResults.length > 0 && (
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
          {searchResults.map((result: DrugSearchResult) => (
            <Card key={`${result.pharmacyId}-${result.drugName}`} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{result.pharmacyName}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {result.location} • {result.distance}km away
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(result.rating)}
                    <span className="text-sm ml-1">({result.rating})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Drug Info */}
                  <div>
                    <h4 className="font-semibold">{result.drugName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary">${result.price}</span>
                      {result.originalPrice > result.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${result.originalPrice}
                        </span>
                      )}
                      {result.requiresPrescription && (
                        <Badge variant="secondary" className="text-xs">
                          Rx Required
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Pharmacy Status */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {result.isOpen ? (
                        <span className="text-success">Open • {result.operatingHours}</span>
                      ) : (
                        <span className="text-danger">Closed</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      <span>{result.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="text-sm text-muted-foreground">
                    {result.stock > 50 ? 'In stock' : result.stock > 0 ? `Only ${result.stock} left` : 'Out of stock'}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{result.pharmacyName}</DialogTitle>
                          <DialogDescription>
                            Complete pharmacy information and ordering options
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Location:</strong> {result.location}
                            </div>
                            <div>
                              <strong>Contact:</strong> {result.contact}
                            </div>
                            <div>
                              <strong>Operating Hours:</strong> {result.operatingHours}
                            </div>
                            <div>
                              <strong>Delivery Fee:</strong> ${result.deliveryFee}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Order Now
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Call Pharmacy
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" className="flex-1" disabled={!result.isOpen || result.stock === 0}>
                      Order Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchResults && searchResults.length === 0 && submittedQuery && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No medicines found matching your search.</p>
          <p className="text-sm text-muted-foreground mt-2">Try different keywords or check spelling.</p>
        </div>
      )}
    </div>
  )
}
