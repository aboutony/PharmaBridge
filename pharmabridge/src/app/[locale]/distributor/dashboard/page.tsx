import { DistributorLink } from "@/components/distributor/distributor-link"

export default function DistributorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your distributor dashboard</p>
      </div>

      <DistributorLink />
    </div>
  )
}