// Containts a few permanent components for the entire SPA
// NOTE: This feels easier to follow than putting these in components/ or pages/

import './assets/App.css'
import logo from './assets/logo.svg'

import React, { useReducer, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import { fetchAPI, submitAPI } from './api'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Bookings from './pages/Bookings'
import ConfirmedBooking from './pages/ConfirmedBooking'

/**
 * Generates a static list of times from 17:00 to 22:00
 * @returns an array of objects containing and id and value.
 */
export function reducer(state, action) {
  // console.log(action.times);
  switch (action.type) {
    case 'fetch':
      return {
        times: action.times.map((x) => {
          const hr = x.getHours()
          return `${hr}:00`
        })
      }
    default:
      throw Error('Unknown action: ' + action)
  }
}

export function Header() {
  return (
    <header>
      <img src={logo} alt='logo' />
      <nav className='navbar'>
        <Link className='navlink' to='/'>
          Home
        </Link>
        <Link className='navlink' to='/menu'>
          Menu
        </Link>
        <Link className='navlink' to='/bookings'>
          Bookings
        </Link>
      </nav>
    </header>
  )
}

export function Main() {
  const [state, dispatch] = useReducer(reducer, { times: [] })
  const [formData, setFormData] = useState(null)
  const navigate = useNavigate()

  // Only run this on initial load
  useEffect(() => {
    dispatch({
      type: 'fetch',
      times: fetchAPI(new Date())
    })
  }, [])

  // The BookingForm component just needs to call setFormData, so we can handle the
  // API and routing here.
  useEffect(() => {
    const confirmed = formData && submitAPI(formData)
    if (confirmed) {
      navigate('/confirmed')
    }
  }, [formData, navigate])

  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/bookings' element={<Bookings state={state} dispatch={dispatch} setter={setFormData} />} />
        <Route path='/confirmed' element={<ConfirmedBooking {...formData} />} />
      </Routes>
    </main>
  )
}

export function Footer() {
  return <footer></footer>
}

export default function App() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  )
}
