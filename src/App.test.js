import React from 'react'
import { ThemeProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, queryByAttribute, fireEvent, waitFor, within, act } from '@testing-library/react'

import App from './App'
import theme from './theme'

// Use a static current time for every run since the mocked available slots are based on
// the timespan from the current time.
beforeAll(() => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date(2023, 10, 10, 8))
})
afterAll(() => {
  jest.useRealTimers()
})

// Clear our session storage between each test
// Log new Date as a way to debug when setSystemTime isn't working above
beforeEach(() => {
  // console.log("new Date(): ", new Date());
  window.sessionStorage.clear()
  // https://github.com/chakra-ui/chakra-ui/issues/6036#issuecomment-1128368254
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
})

function TestApp(props) {
  return (
    <MemoryRouter {...props}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  )
}

const getById = queryByAttribute.bind(null, 'id')
const getByAriaLabel = queryByAttribute.bind(null, 'aria-label')

describe('App', () => {
  test('renders main page', () => {
    render(<TestApp />)
    const headingElement = screen.getByText('Little Lemon Restaurant')
    expect(headingElement).toBeInTheDocument()

    const buttonElement = screen.getByText('Book now')
    expect(buttonElement).toBeInTheDocument()
  })

  test('Navigation', async () => {
    render(<TestApp history={history} />).container

    // Go to booking page
    fireEvent.click(screen.getByText('Book now'))
    expect(screen.getByText('Requests (optional)')).toBeInTheDocument()

    const homeLink = screen.getByText(/Home/i)
    expect(homeLink).toBeInTheDocument()
    fireEvent.click(homeLink)
    expect(screen.getByText('Little Lemon Restaurant'))

    const menuLink = screen.getByText('Menu')
    expect(menuLink).toBeInTheDocument()
    fireEvent.click(menuLink)
    expect(screen.getByText('Page currently under construction')).toBeInTheDocument()
  })

  test('Manual /confirmed to empty booking', () => {
    render(<TestApp initialEntries={['/confirmed']} />)
    const errorElement = screen.getByText('Booking Not Found')
    expect(errorElement).toBeInTheDocument()
  })

  test('Happy booking path', async () => {
    const dom = render(<TestApp />).container

    // Identify Booking link in header and navigate to booking page
    const bookingLink = screen.getByText('Bookings')
    expect(bookingLink).toBeInTheDocument()
    fireEvent.click(bookingLink)

    // Get the booking form element and check all our elements are there
    const bookingForm = getById(dom, 'bookingform')
    expect(bookingForm).toBeInTheDocument()

    // Select a day
    const datepickerMonth = getByAriaLabel(dom, 'month 2023-11')
    const datepickerDay = getByAriaLabel(datepickerMonth, 'Choose Tuesday, November 14th, 2023')
    expect(datepickerDay).toBeInTheDocument()

    // Change the easy events
    await act(async () => {
      fireEvent.change(getById(dom, 'name'), { target: { value: 'Fred' } })
      fireEvent.change(getById(dom, 'email'), { target: { value: 'fred@mail.com' } })
      fireEvent.change(getById(dom, 'guests'), { target: { value: '2' } })
      fireEvent.click(datepickerDay)
    })

    // Extract the time to select
    const datepickerTimes = getByAriaLabel(dom, 'Time')
    const datepickerTime = within(datepickerTimes).getByText('5:00 PM')
    expect(datepickerTime).toBeInTheDocument()
    expect(datepickerTime).toHaveAttribute('tabindex', '0')

    await act(async () => {
      fireEvent.click(datepickerTime)
      fireEvent.click(screen.getByText(/Book it/i))
    })

    await waitFor(() => {
      expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument()
      expect(screen.getByText('Please check your inbox')).toBeInTheDocument()
      expect(screen.getByText('Fred')).toBeInTheDocument()
      expect(screen.getByText('fred@mail.com')).toBeInTheDocument()
      // Since CI may be running with a different locale which would format the date differently
      // we call toLocaleString() in our test.
      const datetime = new Date(2023, 10, 14, 17)
      expect(screen.getByText(datetime.toLocaleString())).toBeInTheDocument()
    })
  })
})
