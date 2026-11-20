import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About.jsx'

describe('About', () => {
  it('renders the About heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    )
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('About This App')
    expect(h1).not.toHaveTextContent('Welcome Home')
  })
})
