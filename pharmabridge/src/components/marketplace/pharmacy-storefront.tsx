'use client'

import { useQuery } from '@tanstack/react-query'
import { Star, MapPin, Phone, Mail, Clock, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PharmacyDetails {
  id: string
  name: string
  location: string
  rating: number
  totalReviews: number
  isOpen: boolean
  operatingHours: string
  contact: string
  email: string
  description: string
  services: string[]
  deliveryFee: number
  minimumOrder: number
  estimatedDelivery: string
  image: string
  inventory: Array<{
    id: string
    name: string
    category: string
    price: number
    stock: number
    requiresPrescription: boolean
    description: string
  }>
}

interface PharmacyStorefrontProps {
  pharmacyId: string
}

export function PharmacyStorefront({ pharmacyId }: PharmacyStorefrontProps) {
  const { data: pharmacy, isLoading } = useQuery<PharmacyDetails>({
    queryKey: ['pharmacy-details', pharmacyId],
    queryFn: async () => {
      const response = await fetch(`/api/marketplace/pharmacies/${pharmacyId}`)
      return response.json()
    },
  })

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

  if (isLoading) {
    return <div className="text-center py-8">Loading pharmacy details...</div>
  }

  if (!pharmacy) {
    return <div className="text-center py-8">Pharmacy not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Pharmacy Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col tablet:flex-row gap-6">
            {/* Pharmacy Image */}
            <div className="w-full tablet:w-64 h-48 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Pharmacy Image</span>
            </div>

            {/* Pharmacy Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{pharmacy.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    {renderStars(pharmacy.rating)}
                    <span className="font-medium">{pharmacy.rating}</span>
                    <span className="text-muted-foreground">({pharmacy.totalReviews} reviews)</span>
                  </div>
                  <Badge variant={pharmacy.isOpen ? 'default' : 'secondary'}>
                    {pharmacy.isOpen ? 'Open' : 'Closed'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{pharmacy.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{pharmacy.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{pharmacy.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{pharmacy.email}</span>
                </div>
              </div>

              <p className="text-muted-foreground">{pharmacy.description}</p>

              {/* Services */}
              <div>
                <h3 className="font-medium mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {pharmacy.services.map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Delivery Fee: </span>
                  <span className="font-medium">${pharmacy.deliveryFee}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Min Order: </span>
                  <span className="font-medium">${pharmacy.minimumOrder}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Delivery: </span>
                  <span className="font-medium">{pharmacy.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy Content Tabs */}
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="info">More Info</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
            {pharmacy.inventory.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${item.price}</span>
                      {item.requiresPrescription && (
                        <Badge variant="secondary">Rx Required</Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                    </div>

                    <p className="text-sm">{item.description}</p>

                    <Button
                      className="w-full"
                      disabled={item.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Reviews feature coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Operating Hours</h4>
                <p className="text-sm text-muted-foreground">{pharmacy.operatingHours}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Delivery Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Minimum order: ${pharmacy.minimumOrder}</li>
                  <li>• Delivery fee: ${pharmacy.deliveryFee}</li>
                  <li>• Estimated delivery: {pharmacy.estimatedDelivery}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Phone: {pharmacy.contact}</p>
                  <p>Email: {pharmacy.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
