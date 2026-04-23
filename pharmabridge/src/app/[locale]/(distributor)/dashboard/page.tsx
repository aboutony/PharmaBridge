import { DistributorLayout } from "@/components/layout/distributor-layout"

export default function DistributorDashboard() {
  return (
    <DistributorLayout>
      <div className="space-y-6">
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-sm text-text-secondary">Orders in progress</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-2xl font-bold text-success">$45,230</p>
            <p className="text-sm text-text-secondary">This month</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Pharmacies</h3>
            <p className="text-2xl font-bold text-accent">156</p>
            <p className="text-sm text-text-secondary">Active partners</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span>Order #1234 - Pharmacy Al-Rashid</span>
              <span className="text-sm text-text-secondary">Processing</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span>Order #1233 - Al-Sham Pharmacy</span>
              <span className="text-sm text-text-secondary">Shipped</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Order #1232 - City Pharmacy</span>
              <span className="text-sm text-text-secondary">Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </DistributorLayout>
  )
}