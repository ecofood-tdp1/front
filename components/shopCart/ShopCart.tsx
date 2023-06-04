import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'

interface Props {
  packs: Pack[]
}

export const ShopCart = (props: Props) => {
  const [packs, setPacks] = useState<Pack[]>(props.packs)


  return <Box
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading fontSize="2xl" fontWeight="extrabold">
          Mi Carrito ({packs.length} items)
        </Heading>

        <Stack spacing="6">
          {packs.map((pack) => (
            <CartItem pack={pack} />
          ))}
        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <CartOrderSummary total={packs.map(p => p.price.amount).reduce((x, y) => x + y)} />
        <HStack mt="6" fontWeight="semibold">
          <p>o</p>
          <Link color={mode('blue.500', 'blue.200')}>Seguir buscando</Link>
        </HStack>
      </Flex>
    </Stack>
  </Box>
}