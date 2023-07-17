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
import { GetPacksFromShoppingCart, RemovePackFromShoppingCart } from '../../repository/UserRepository'
import { v4 as uuidv4 } from 'uuid';
import { Pack } from '../../model/Pack'

interface Props {
  packs: Pack[]
}

export const ShopCart = (props: Props) => {
  const [packs, setPacks] = useState<Pack[]>(props.packs)

  async function onClickDeleteCartItem(pack: Pack) {
    await RemovePackFromShoppingCart(pack._id)
    setPacks(await GetPacksFromShoppingCart())
  }


  return <Box
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
    mb={20}
  >
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">

        <Flex alignItems="center" justifyContent="center" mb={2}>
          <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
            Mi carrito ({packs.length} items)
          </Heading>
        </Flex>

        <Stack spacing="6">
          {packs.map((pack) => (
            <CartItem key={uuidv4()} pack={pack} onClickDelete={onClickDeleteCartItem} />
          ))}
        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <CartOrderSummary
          subtotal={packs.length == 0 ? 0 : packs.map(p => p.original_price.amount).reduce((x, y) => x + y)}
          total={packs.length == 0 ? 0 : packs.map(p => p.price.amount).reduce((x, y) => x + y)} />
        <HStack mt="6" fontWeight="semibold">
          <p>o</p>
          <Link color={mode('blue.500', 'blue.200')} href={"/"} >Seguir buscando</Link>
        </HStack>
      </Flex>
    </Stack>
  </Box>
}
