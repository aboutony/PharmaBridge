import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './header'
import { PublicLayout } from './public-layout'

const meta = {
  title: 'Layout/PublicLayout',
  component: PublicLayout,
  tags: ['autodocs'],
} satisfies Meta<typeof PublicLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <PublicLayout header={<Header title="Public Experience" />}>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Marketplace landing section</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This layout keeps public-facing content centered and responsive.
        </p>
      </div>
    </PublicLayout>
  ),
}
