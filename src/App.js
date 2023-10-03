// Containts a few permanent components for the entire SPA
// NOTE: This feels easier to follow than putting these in components/ or pages/

import './assets/App.css';
import logo from './assets/logo.svg'

import { useReducer } from 'react';
import { Routes, Route, Link } from  "react-router-dom"

import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Bookings from './pages/Bookings';
import Order from './pages/Order';
import Login from './pages/Login';

/**
 * Generates a static list of times from 17:00 to 22:00
 * @returns an array of objects containing and id and value.
 */
export function updateTimes(state, action) {
  if (action.type === 'get_available_times' && 'date' in action) {
    const date = action.date
    var times = [];

    // Opted to include the date in the times to make sure everything is working.
    for (let i = 17; i <= 22; i++) {
        times.push(date + "T" + i + ":00")
    }

    return times
  }

    throw Error('Unknown action: ' + action);
}

export const initializeTimes = () => ["Select a time"]

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
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, initializeTimes())

  return <main>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/about" element={ <About />} />
      <Route path="/menu" element={ <Menu />} />
      <Route path="/bookings"
        element={ <Bookings availableTimes={availableTimes} dispatchTimes={dispatchTimes} /> }
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
