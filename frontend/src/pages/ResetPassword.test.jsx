import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ResetPassword from './ResetPassword.jsx'

const renderPage = () =>
  render(
    <MemoryRouter>
      <ResetPassword />
    </MemoryRouter>,
  )

describe('ResetPassword', () => {
  it('renders the Reset Password heading and email form', () => {
    renderPage()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Reset Password')
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    const button = screen.getByRole('button', { name: 'Reset Password' })
    expect(button).toHaveAttribute('type', 'submit')
    expect(button.closest('form')).not.toBeNull()
  })

  it('renders a Forgot password link', () => {
    renderPage()
    expect(screen.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute(
      'href',
      '/reset-password',
    )
  })
})
