import React from 'react'
import { Stack, Image, Box } from '@chakra-ui/react'

import restaurant from '../assets/restaurant.jpg'
import BookingForm from '../components/BookingForm'

export default function Bookings(props) {
  return (
    <Stack className='bookings' spacing='5em' align='center' direction='row'>
      <Box align='right'>
        <BookingForm {...props} />
      </Box>
      <Image align='right' id='bookingimg' maxWidth='60%' height='auto' src={restaurant} alt='Restaurant' filter='grayscale(1)' />
    </Stack>
  )
}
