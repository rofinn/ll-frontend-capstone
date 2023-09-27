// Containts a few permanent components for the entire SPA
// NOTE: This feels easier to follow than putting these in components/ or pages/

import './assets/App.css';
import logo from './assets/logo.svg'

import { Routes, Route, Link } from  "react-router-dom"

import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Order from './pages/Order';
import Login from './pages/Login';

function Header() {
  return <header>
      <img src={logo} alt="logo" />
      <nav className="navbar">
        <Link className="navlink" to="/">Home</Link>
        <Link className="navlink" to="/about">About</Link>
        <Link className="navlink" to="/menu">Menu</Link>
        <Link className="navlink" to="/reservations">Reservations</Link>
        <Link className="navlink" to="/order">Order</Link>
        <Link className="navlink" to="/login.html">Login</Link>
      </nav>
  </header>
}

function Main() {
  return <main>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/about" element={ <About />} />
      <Route path="/menu" element={ <Menu />} />
      <Route path="/reservations" element={ <Reservations /> } />
      <Route path="/order" element={ <Order />} />
      <Route path="/login" element={ <Login />} />
      </Routes>
  </main>
}

function Footer() {
  return <footer></footer>
}

function App() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

export default App;
