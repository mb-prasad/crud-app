import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

describe('Home', () => {
  it('renders the Home heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Welcome Home')
  })
})
