// TODO - Take text and images a props if we need more than one.
import React from 'react'
import background from '../assets/restaurant-chef-B.jpg'

import { Link } from 'react-router-dom'
import { Heading, Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Flex w={'full'} h={'100vh'} backgroundImage={`url(${background})`} backgroundSize={'cover'} backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack maxW={'4xl'} align={'flex-start'} p='5em'>
          <Heading fontSize='4xl' color='yellow.400'>
            Little Lemon Restaurant
          </Heading>
        </Stack>
        <Stack maxW={'4xl'} align={'flex-end'} spacing={12}>
          <Text fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })} color='white'>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
          <Stack direction={'row'} align={'flex-end'}>
            <Button as={Link} to='/bookings'>
              Book now
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}
