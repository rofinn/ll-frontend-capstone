import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Image, Stack, Text, Spacer } from '@chakra-ui/react'

import logo from '../assets/logo.svg'

const LINKS = {
  Home: '/',
  Bookings: '/bookings',
  Menu: '/menu'
}

export function Logo(props) {
  return (
    <Box as={Link} to='/' {...props}>
      <Image src={logo} alt='logo' />
    </Box>
  )
}

export function Item({ children, to = '/', ...rest }) {
  return (
    <Text as={Link} to={to} color='green.800' _hover={{ color: 'green.600' }} display='block' fontSize='xl' {...rest}>
      {children}
    </Text>
  )
}

export function NavBar({ children }) {
  return (
    <Box display={{ base: 'block', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
      <Stack spacing={8} direction={['column', 'row', 'row', 'row']}>
        {children}
      </Stack>
    </Box>
  )
}

export default function Header(props) {
  return (
    <header>
      <Flex as='nav' align='center' justify={['center', 'space-between', 'flex-end', 'flex-end']} wrap='wrap' w='100%' p='2em' {...props}>
        <Logo />
        <Spacer />
        <NavBar>
          {Object.keys(LINKS).map((i) => (
            <Item key={i} to={LINKS[i]}>
              {i}
            </Item>
          ))}
        </NavBar>
      </Flex>
    </header>
  )
}
