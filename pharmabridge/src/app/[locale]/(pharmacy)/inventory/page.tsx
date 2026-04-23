import { PharmacyLayout } from "@/components/layout/pharmacy-layout"

export default function PharmacyInventory() {
  return (
    <PharmacyLayout title="Inventory Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
            Add Item
          </button>
        </div>
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">Drug Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3">Paracetamol 500mg</td>
                <td className="px-4 py-3">Pain Relief</td>
                <td className="px-4 py-3">150</td>
                <td className="px-4 py-3">$2.50</td>
                <td className="px-4 py-3">
                  <button className="text-primary hover:underline">Edit</button>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3">Amoxicillin 500mg</td>
                <td className="px-4 py-3">Antibiotics</td>
                <td className="px-4 py-3">75</td>
                <td className="px-4 py-3">$8.75</td>
                <td className="px-4 py-3">
                  <button className="text-primary hover:underline">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PharmacyLayout>
  )
}