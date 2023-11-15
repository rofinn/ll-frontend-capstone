import {Stack, Image, Box} from '@chakra-ui/react';

import restaurant from  '../assets/restaurant.jpg'

export default function ConfirmedBooking({
    name, email, datetime, guests, occasion, requests
}) {
    return (
        <Stack className='bookings' spacing='5em' align='center' direction='row'>
            <Box align='left' >
                <h1>Confirmed</h1>
                <h2>Please check your inbox</h2>
                <p>
                    Name: {name}<br/>
                    Email: {email}<br/>
                    Time: {datetime.toLocaleString()}<br/>
                    Guests: {guests}<br/>
                    Occasion: {occasion}<br/>
                    Requests: {requests}<br/>
                </p>
            </Box>
            <Image id="bookingimg" maxWidth='60%' height='auto' src={restaurant} alt="Restaurant"/>
        </Stack>
    )
}
