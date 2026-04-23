import { AdminLayout } from "@/components/layout/admin-layout"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Total Pharmacies</h3>
            <p className="text-2xl font-bold text-primary">2,150</p>
            <p className="text-sm text-text-secondary">Active in platform</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Distributors</h3>
            <p className="text-2xl font-bold text-success">85</p>
            <p className="text-sm text-text-secondary">Registered</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Monthly Orders</h3>
            <p className="text-2xl font-bold text-accent">15,420</p>
            <p className="text-sm text-text-secondary">This month</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-2xl font-bold text-warning">$285,000</p>
            <p className="text-sm text-text-secondary">This month</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">System Overview</h3>
          <div className="grid gap-4 tablet:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Platform Health</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>API Response Time</span>
                  <span className="text-success">120ms</span>
                </div>
                <div className="flex justify-between">
                  <span>System Uptime</span>
                  <span className="text-success">99.9%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-1 text-sm">
                <div>New pharmacy registered</div>
                <div>New distributor onboarded</div>
                <div>System maintenance completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}