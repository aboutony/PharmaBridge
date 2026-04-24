import type { Meta, StoryObj } from '@storybook/react'
import { LanguageToggle } from './language-toggle'

const meta = {
  title: 'UI/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageToggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
