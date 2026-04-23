import { PharmacyLayout } from "@/components/layout/pharmacy-layout"

export default function PharmacyDashboard() {
  return (
    <PharmacyLayout>
      <div className="space-y-6">
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Inventory</h3>
            <p className="text-2xl font-bold text-primary">1,250</p>
            <p className="text-sm text-text-secondary">Items in stock</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Orders</h3>
            <p className="text-2xl font-bold text-success">15</p>
            <p className="text-sm text-text-secondary">Pending orders</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-2xl font-bold text-accent">$12,450</p>
            <p className="text-sm text-text-secondary">This month</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span>New order received</span>
              <span className="text-sm text-text-secondary">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span>Inventory updated</span>
              <span className="text-sm text-text-secondary">4 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Payment received</span>
              <span className="text-sm text-text-secondary">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </PharmacyLayout>
  )
}