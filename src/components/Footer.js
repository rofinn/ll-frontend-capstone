import React from 'react'
import { Text, VStack } from '@chakra-ui/react'

export default function Footer() {
  return (
    <footer>
      <VStack align='center' justify='center' wrap='wrap' w='100%' p='2em'>
        <Text>Main St, Cupertino, CA</Text>
        <Text>1-888-123-4567</Text>
      </VStack>
    </footer>
  )
}
