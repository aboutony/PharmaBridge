import { PharmacyLayout } from "@/components/layout/pharmacy-layout"
import { InventoryDashboard } from "@/components/inventory/inventory-dashboard"

export default function PharmacyDashboard() {
  return (
    <PharmacyLayout>
      <InventoryDashboard />
    </PharmacyLayout>
  )
}