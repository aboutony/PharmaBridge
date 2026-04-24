'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { pharmamarketProducts } from '@/lib/pharmamarket-data'

export interface CartItem {
  productId: string
  quantity: number
}

export interface AlertSubscription {
  productId: string
  city: string
  whatsapp: boolean
  sms: boolean
}

export interface UploadedPrescription {
  id: string
  fileName: string
  note: string
  uploadedAt: string
}

export interface OrderRecord {
  id: string
  createdAt: string
  items: CartItem[]
  total: number
  status: 'placed' | 'preparing' | 'ready'
}

interface PharmaMarketState {
  favorites: string[]
  cart: CartItem[]
  alerts: AlertSubscription[]
  prescriptions: UploadedPrescription[]
  orders: OrderRecord[]
  customerCity: string
  addFavorite: (productId: string) => void
  removeFavorite: (productId: string) => void
  toggleFavorite: (productId: string) => void
  addToCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  saveAlert: (alert: AlertSubscription) => void
  removeAlert: (productId: string) => void
  addPrescription: (fileName: string, note: string) => void
  placeOrder: () => string
  reorder: (orderId: string) => void
  setCustomerCity: (city: string) => void
}

function ensureFavoriteProductIds(ids: string[]) {
  const validIds = new Set(pharmamarketProducts.map((product) => product.id))
  return ids.filter((id) => validIds.has(id))
}

export const usePharmaMarketStore = create<PharmaMarketState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],
      alerts: [],
      prescriptions: [],
      orders: [],
      customerCity: 'Damascus',
      addFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId) ? state.favorites : [...state.favorites, productId],
        })),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== productId),
        })),
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),
      addToCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId)
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }

          return {
            cart: [...state.cart, { productId, quantity: 1 }],
          }
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.productId !== productId)
              : state.cart.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ cart: [] }),
      saveAlert: (alert) =>
        set((state) => ({
          alerts: [...state.alerts.filter((item) => item.productId !== alert.productId), alert],
        })),
      removeAlert: (productId) =>
        set((state) => ({
          alerts: state.alerts.filter((item) => item.productId !== productId),
        })),
      addPrescription: (fileName, note) =>
        set((state) => ({
          prescriptions: [
            {
              id: `rx-${Date.now()}`,
              fileName,
              note,
              uploadedAt: new Date().toISOString(),
            },
            ...state.prescriptions,
          ],
        })),
      placeOrder: () => {
        const state = get()
        const total = state.cart.reduce((sum, item) => {
          const product = pharmamarketProducts.find((entry) => entry.id === item.productId)
          return sum + (product?.price ?? 0) * item.quantity
        }, 0)

        const orderId = `PM-${Date.now()}`
        set({
          orders: [
            {
              id: orderId,
              createdAt: new Date().toISOString(),
              items: state.cart,
              total,
              status: 'placed',
            },
            ...state.orders,
          ],
          cart: [],
        })
        return orderId
      },
      reorder: (orderId) =>
        set((state) => {
          const order = state.orders.find((entry) => entry.id === orderId)
          if (!order) return state
          return { cart: order.items }
        }),
      setCustomerCity: (city) => set({ customerCity: city }),
    }),
    {
      name: 'pharmamarket-store',
      partialize: (state) => ({
        favorites: ensureFavoriteProductIds(state.favorites),
        cart: state.cart,
        alerts: state.alerts,
        prescriptions: state.prescriptions,
        orders: state.orders,
        customerCity: state.customerCity,
      }),
    },
  ),
)
