import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Add more context...',
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
