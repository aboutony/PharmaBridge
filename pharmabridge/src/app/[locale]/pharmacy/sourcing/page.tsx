import { DistributorLink } from "@/components/distributor/distributor-link"

export default function DistributorSourcing() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sourcing & Procurement</h2>
        <p className="text-muted-foreground">Manage your pharmaceutical supply chain</p>
      </div>

      <DistributorLink />
    </div>
  )
}