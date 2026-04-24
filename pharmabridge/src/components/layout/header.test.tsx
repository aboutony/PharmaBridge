import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { Header } from './header'
import { LocaleProvider } from '@/lib/i18n'

describe('Header', () => {
  it('renders the provided title', () => {
    render(
      <LocaleProvider locale="en" messages={{ navigation: { dashboard: 'Dashboard' } }}>
        <Header title="PharmaBridge Marketplace" />
      </LocaleProvider>
    )

    expect(screen.getByText('PharmaBridge Marketplace')).toBeInTheDocument()
  })

  it('has no obvious accessibility violations', async () => {
    const { container } = render(
      <LocaleProvider locale="en" messages={{ navigation: { dashboard: 'Dashboard' } }}>
        <Header title="PharmaBridge Marketplace" />
      </LocaleProvider>
    )

    const result = await axe(container)
    expect(result.violations).toHaveLength(0)
  })
})
