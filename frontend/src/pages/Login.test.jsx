import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login.jsx'

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  )

describe('Login', () => {
  it('renders the Login heading', () => {
    renderLogin()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Login')
  })

  it('renders a labelled email field', () => {
    renderLogin()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
  })

  it('renders a labelled password field', () => {
    renderLogin()
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('accepts typed email and password and has a submit button', async () => {
    const user = userEvent.setup()
    renderLogin()
    const email = screen.getByLabelText('Email')
    const password = screen.getByLabelText('Password')
    await user.type(email, 'jane@example.com')
    await user.type(password, 's3cret-pass')
    expect(email).toHaveValue('jane@example.com')
    expect(password).toHaveValue('s3cret-pass')
    const button = screen.getByRole('button', { name: 'Login' })
    expect(button).toHaveAttribute('type', 'submit')
    expect(button.closest('form')).not.toBeNull()
  })
})

describe('Login forgot password', () => {
  it('renders a Forgot password link to /reset-password', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute(
      'href',
      '/reset-password',
    )
  })
})
