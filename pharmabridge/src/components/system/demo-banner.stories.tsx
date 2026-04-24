import type { Meta, StoryObj } from '@storybook/react'
import { DemoBanner } from './demo-banner'

const meta = {
  title: 'System/DemoBanner',
  component: DemoBanner,
  tags: ['autodocs'],
} satisfies Meta<typeof DemoBanner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
