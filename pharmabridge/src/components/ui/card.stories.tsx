import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Inventory Alert</CardTitle>
        <CardDescription>Review the latest low-stock medicines.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">12 items are below their minimum thresholds.</p>
      </CardContent>
    </Card>
  ),
}
