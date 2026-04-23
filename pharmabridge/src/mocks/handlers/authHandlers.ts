import { http, HttpResponse } from 'msw'

// Auth handlers
export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json()

    // Mock login validation
    if (body.email && body.password) {
      return HttpResponse.json({
        user: {
          id: '1',
          email: body.email,
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
    const body = await request.json()

    // Mock registration
    return HttpResponse.json({
      user: {
        id: String(Date.now()),
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        userType: body.userType,
      },
      token: 'mock-jwt-token-' + Date.now(),
    })
  }),

  http.post('/api/auth/reset-password', async ({ request }) => {
    const body = await request.json()

    // Mock password reset
    if (body.email) {
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