import create from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'pharmacy' | 'distributor' | 'admin'
  phone?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (email: string, password: string, rememberMe: boolean) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, rememberMe: boolean) => {
        set({ isLoading: true, error: null })

        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000))

          // Mock successful login
          const mockUser: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            userType: 'pharmacy',
          }

          const mockToken = 'mock-jwt-token-' + Date.now()

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: 'Invalid credentials',
            isLoading: false,
          })
          throw error
        }
      },

      register: async (data: any) => {
        set({ isLoading: true, error: null })

        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1500))

          // Mock successful registration
          const mockUser: User = {
            id: String(Date.now()),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: data.userType,
            phone: data.phone,
          }

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: 'Registration failed',
            isLoading: false,
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'pharmabridge-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)