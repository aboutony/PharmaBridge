import { http, HttpResponse } from 'msw'

// Auth handlers
export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    const email = String(body.email ?? '')
    const password = String(body.password ?? '')

    // Mock login validation
    if (email && password) {
      return HttpResponse.json({
        user: {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          userType: 'pharmacy',
        },
        token: 'mock-jwt-token-' + Date.now(),
      })
    } else {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>

    // Mock registration
    return HttpResponse.json({
      user: {
        id: String(Date.now()),
        email: String(body.email ?? ''),
        firstName: String(body.firstName ?? ''),
        lastName: String(body.lastName ?? ''),
        userType: String(body.userType ?? 'pharmacy'),
      },
      token: 'mock-jwt-token-' + Date.now(),
    })
  }),

  http.post('/api/auth/reset-password', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    const email = String(body.email ?? '')

    // Mock password reset
    if (email) {
      return HttpResponse.json({
        message: 'Password reset email sent',
      })
    } else {
      return HttpResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
  }),

  http.get('/api/auth/me', () => {
    // Mock current user endpoint
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        userType: 'pharmacy',
      },
    })
  }),
]
