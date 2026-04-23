import { CreditAndPayments } from "@/components/pharmacy/credit-payments"

export default function PharmacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your pharmacy settings and preferences</p>
      </div>

      <CreditAndPayments />
    </div>
  )
}