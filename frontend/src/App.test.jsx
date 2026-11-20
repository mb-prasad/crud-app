import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('App', () => {
  it('renders Home at / and About at /about', () => {
    const { unmount } = renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome Home')
    unmount()
    renderAt('/about')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About This App')
  })

  it('navigates to About when the About link is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/')
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    const about = screen.getByRole('link', { name: 'About' })
    expect(about).toHaveAttribute('href', '/about')
    await user.click(about)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About This App')
  })
})

describe('App login route', () => {
  it('navigates to Login when the Login link is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const link = screen.getByRole('link', { name: 'Login' })
    expect(link).toHaveAttribute('href', '/login')
    await user.click(link)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Login')
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('renders the Login page when starting at /login', () => {
    renderAt('/login')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Login')
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })
})
