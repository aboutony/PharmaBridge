import type { Meta, StoryObj } from '@storybook/react'
import { ResponsiveTable } from './responsive-table'

const meta = {
  title: 'UI/ResponsiveTable',
  component: ResponsiveTable,
  tags: ['autodocs'],
} satisfies Meta<typeof ResponsiveTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => (
    <ResponsiveTable
      columns={[
        { key: 'name', label: 'Medicine' },
        { key: 'stock', label: 'Stock' },
        { key: 'status', label: 'Status' },
      ]}
      data={[
        { name: 'Paracetamol 500mg', stock: 120, status: 'Healthy' },
        { name: 'Amoxicillin 500mg', stock: 18, status: 'Low stock' },
      ]}
    />
  ),
}
