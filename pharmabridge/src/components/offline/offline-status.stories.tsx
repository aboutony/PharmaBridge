import type { Meta, StoryObj } from '@storybook/react'
import { OfflineStatus } from './offline-status'
import { useOfflineStore } from '@/stores/offline'

const meta = {
  title: 'System/OfflineStatus',
  component: OfflineStatus,
  tags: ['autodocs'],
} satisfies Meta<typeof OfflineStatus>

export default meta

type Story = StoryObj<typeof meta>

export const OfflineQueued: Story = {
  render: () => {
    useOfflineStore.setState({
      initialized: true,
      isOnline: false,
      pendingCount: 3,
      conflictCount: 1,
      syncInFlight: false,
      lastSyncedAt: null,
    })

    return <OfflineStatus />
  },
}
