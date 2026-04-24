import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    title: 'PharmaBridge Marketplace',
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
