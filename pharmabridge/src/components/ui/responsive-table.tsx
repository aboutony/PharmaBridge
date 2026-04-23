'use client'

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Array<{
    key: keyof T
    label: string
    render?: (value: T[keyof T], item: T) => React.ReactNode
  }>
  mobileCardFields?: Array<{
    key: keyof T
    label: string
  }>
}

export function ResponsiveTable<T extends object>({
  data,
  columns,
  mobileCardFields = []
}: ResponsiveTableProps<T>) {
  return (
    <div className="w-full">
      {/* Desktop/Table: Standard table */}
      <div className="hidden tablet:block">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-bg-muted">
              {columns.map((col) => (
                <th key={col.key as string} className="border border-border p-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-border">
                {columns.map((col) => {
                  const record = item as Record<string, unknown>

                  return (
                  <td key={col.key as string} className="border border-border p-3">
                    {col.render ? col.render(record[col.key as string] as T[keyof T], item) : String(record[col.key as string] ?? '')}
                  </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card list */}
      <div className="tablet:hidden space-y-4">
        {data.map((item, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4">
            {mobileCardFields.map((field) => {
              const record = item as Record<string, unknown>

              return (
              <div key={field.key as string} className="flex justify-between py-2">
                <span className="font-medium">{field.label}:</span>
                <span>{String(record[field.key as string] ?? '')}</span>
              </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
