import { setupWorker } from 'msw'
import { pharmacyHandlers } from './handlers/apiHandlers'
import { drugHandlers } from './handlers/apiHandlers'
import { distributorHandlers } from './handlers/apiHandlers'
import { orderHandlers } from './handlers/apiHandlers'
import { authHandlers } from './handlers/authHandlers'
import { inventoryHandlers } from './handlers/inventoryHandlers'

// Combine all handlers
const handlers = [
  ...pharmacyHandlers,
  ...drugHandlers,
  ...distributorHandlers,
  ...orderHandlers,
  ...authHandlers,
  ...inventoryHandlers,
]

// Create the worker
export const worker = setupWorker(...handlers)