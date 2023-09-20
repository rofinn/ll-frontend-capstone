import logo from './Logo.svg';

export default function Header(props) {
    return <header>
        <img src={logo} alt="logo" />
        <nav>
            <ul>
                <li><a href="/home.html">Home</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/menu.html">Menu</a></li>
                <li><a href="/reservations.html">Reservations</a></li>
                <li><a href="/order.html">Order</a></li>
                <li><a href="/login.html">Login</a></li>
            </ul>
        </nav>
    </header>
}
