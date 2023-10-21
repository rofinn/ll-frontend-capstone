export default function ConfirmedBooking({
    name, email, date, time, guests, occasion, requests
}) {
    return (
        <>
            <h1>Booking Confirmed for {name}</h1>
            <h2>A confirmation code has been sent to {email}</h2>
            <p>
                Date: {date}<br/>
                Time: {time}<br/>
                Guests: {guests}<br/>
                Occasion: {occasion}<br/>
                Requests: {requests}<br/>
            </p>
        </>
    )
}
