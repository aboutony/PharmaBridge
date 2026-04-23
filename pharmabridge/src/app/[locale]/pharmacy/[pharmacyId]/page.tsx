import { PharmacyStorefront } from "@/components/marketplace/pharmacy-storefront"

interface PharmacyPageProps {
  params: {
    locale: string
    pharmacyId: string
  }
}

export default function PharmacyPage({ params }: PharmacyPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PharmacyStorefront pharmacyId={params.pharmacyId} />
    </div>
  )
}