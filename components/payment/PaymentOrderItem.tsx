import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue, Box, Divider, Stack } from '@chakra-ui/react'
import { PriceTag } from '../shopCart/PriceTag'
import { CartProductMeta } from '../shopCart/CartProductMeta'

type PaymentOrderPackItemProps = {
  pack: Pack
}

export const PaymentOrderPackItem = (props: PaymentOrderPackItemProps) => {
  const {
    pack,
  } = props

  return (
    <Box>
        <Stack spacing="3">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <CartProductMeta
                name={pack.name}
                description={pack.description}
                image={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Veg_Chow_mein.jpg/640px-Veg_Chow_mein.jpg"}
            />

            {/* Desktop */}
            <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
                <Box  />
                <Box  />
                <PriceTag price={pack.price.amount} currency={"USD"} />
            </Flex>

            {/* Mobile */}
            <Flex
                mt="4"
                align="center"
                width="full"
                justify="space-between"
                display={{ base: 'flex', md: 'none' }}
            >
                <Link fontSize="sm" textDecor="underline">
                Delete
                </Link>
                <Box  />
                <Box  />
                <PriceTag price={pack.price.amount} currency={"USD"} />
            </Flex>
        </Flex>
        <Divider borderColor={'#c3c3c3'}/>
        </Stack>
    </Box>
  )
}
