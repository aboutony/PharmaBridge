import { setupWorker } from 'msw'
import { pharmacyHandlers } from './apiHandlers'
import { drugHandlers } from './apiHandlers'
import { distributorHandlers } from './apiHandlers'
import { orderHandlers } from './apiHandlers'

// Combine all handlers
const handlers = [
  ...pharmacyHandlers,
  ...drugHandlers,
  ...distributorHandlers,
  ...orderHandlers
]

// Create the worker
export const worker = setupWorker(...handlers)