// Containts a few permanent components for the entire SPA
// NOTE: This feels easier to follow than putting these in components/ or pages/

import './assets/App.css';
import logo from './assets/logo.svg'

import { useReducer, useEffect } from 'react';
import { Routes, Route, Link } from  "react-router-dom"

import { fetchAPI } from './api';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Bookings from './pages/Bookings';
import Order from './pages/Order';
import Login from './pages/Login';

// *** CONSTANTS ***

// Hard code the number of days we'll generate for now
const N_DAYS = 5;

/**
 * Generates a static list of date strings yyyy-mm-dd base from 0 .. N_DAYS from today
 * @returns an array of objects containing and key and value.
 */
export function availableDays() {
  return Array.from(
    {length: N_DAYS},
    (x, i) => {
      var date = new Date();
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0]
    }
  );
}

/**
 * Generates a static list of times from 17:00 to 22:00
 * @returns an array of objects containing and id and value.
 */
export function reducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return {
        times: action.times.map(
          (x) => {
            const hr = x.getHours();
            return `${hr}:00`;
          }
        )
      };
    default:
      throw Error('Unknown action: ' + action);
  }
}

export function Header() {
  return <header>
      <img src={logo} alt="logo" />
      <nav className="navbar">
        <Link className="navlink" to="/">Home</Link>
        <Link className="navlink" to="/about">About</Link>
        <Link className="navlink" to="/menu">Menu</Link>
        <Link className="navlink" to="/bookings">Bookings</Link>
        <Link className="navlink" to="/order">Order</Link>
        <Link className="navlink" to="/login.html">Login</Link>
      </nav>
  </header>
}

export function Main() {
  const [state, dispatch] = useReducer(reducer, {times: []})

  // Only run this on initial load
  useEffect(() => {
    dispatch({
      type: 'fetch',
      times: fetchAPI(new Date())
    });
  }, [])

  return <main>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/about" element={ <About />} />
      <Route path="/menu" element={ <Menu />} />
      <Route path="/bookings"
        element={ <Bookings state={state} dispatch={dispatch} /> }
       />
      <Route path="/order" element={ <Order />} />
      <Route path="/login" element={ <Login />} />
      </Routes>
  </main>
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
  );
};
