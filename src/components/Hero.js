// TODO - Take text and images a props if we need more than one.
import background from  '../assets/restaurant-chef-B.jpg'

export default function Hero() {
    return (
        <div className="hero" style={{backgroundImage: `url(${background})`}}>
            <div className="hero-header">
                <h1>Little Lemon Restaurant</h1>
                <h2>Cupertino</h2>
            </div>
            <div className="hero-body">
                <h3>
                    We are a family owned Mediterranean restaurant, <br/>
                    focused on traditional recipes served with a modern twist.
                </h3>
            </div>
        </div>
    )
}
