import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocaleProvider } from '@/lib/i18n'
import { DemoBanner } from './demo-banner'

describe('DemoBanner', () => {
  it('renders demo guidance', () => {
    render(
      <LocaleProvider locale="en" messages={{}}>
        <DemoBanner />
      </LocaleProvider>,
    )
    expect(screen.getByText(/Demo environment enabled/i)).toBeInTheDocument()
  })
})
