import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders main page', () => {
  render(
    <Router>
      <App />
    </Router>
  )
  const linkElement = screen.getByText(/Little Lemon Restaurant/i)
  expect(linkElement).toBeInTheDocument()
})
