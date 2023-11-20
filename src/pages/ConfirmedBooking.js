import React from 'react'
import { Flex, Stack, Box, Heading, Table, Tbody, Tr, Td } from '@chakra-ui/react'

import restaurant from '../assets/restaurant.jpg'
import { SCHEMA } from '../components/BookingForm'

// NOTE: Since updating / deleting bookings wasn't part of the assignment we'll just
// error if someone manually navigates to `localhost:3000/confirmed` outside of the UI
export function BookingError() {
  return (
    <Box p='2em' align='left' bg='grey.50' borderRadius='16px'>
      <Heading as='h1' fontSize='4xl' color='yellow.500'>
        Booking Not Found
      </Heading>
      <Heading>Please give us a call</Heading>
    </Box>
  )
}

export function BookingDetails({ name, email, datetime, guests, occasion, requests }) {
  return (
    <Box p='2em' align='left' bg='grey.50' borderRadius='16px'>
      <Box p='2em'>
        <Heading as='h1'>Booking Confirmed!</Heading>
        <Heading>Please check your inbox</Heading>
      </Box>
      <Table variant='unstyled'>
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>{name}</Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{email}</Td>
          </Tr>
          <Tr>
            <Td>Time</Td>
            <Td>{datetime.toLocaleString()}</Td>
          </Tr>
          <Tr>
            <Td>Guests</Td>
            <Td>{guests}</Td>
          </Tr>
          <Tr>
            <Td>Occasion</Td>
            <Td>{occasion}</Td>
          </Tr>
          <Tr>
            <Td>Requests</Td>
            <Td>{requests}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}

export function ValidatedBooking(props) {
  if (SCHEMA.isValidSync(props)) {
    return <BookingDetails {...props} />
  } else {
    return <BookingError />
  }
}

export default function ConfirmedBooking(props) {
  return (
    <Flex w={'full'} backgroundImage={`url(${restaurant})`} backgroundSize={'cover'} backgroundPosition={'center center'}>
      <Stack maxW='3xl' p='2em'>
        <ValidatedBooking {...props} />
      </Stack>
    </Flex>
  )
}
