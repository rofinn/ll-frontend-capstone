import React from 'react'
import { Stack, Box, Flex } from '@chakra-ui/react'

import restaurant from '../assets/restaurant.jpg'
import BookingForm from '../components/BookingForm'

export default function Bookings(props) {
  return (
    <Flex w={'full'} backgroundImage={`url(${restaurant})`} backgroundSize={'cover'} backgroundPosition={'center center'}>
      <Stack maxW='3xl' p='2em' bgGradient={'linear(to-r, blackAlpha.900, transparent)'}>
        <Box p='1em' align='left' bg='grey.50' borderRadius='16px'>
          <BookingForm {...props} />
        </Box>
      </Stack>
    </Flex>
  )
}
