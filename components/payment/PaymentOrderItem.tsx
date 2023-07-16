import { Flex, Link, Box, Divider, Stack } from '@chakra-ui/react'
import { PriceTag } from '../shopCart/PriceTag'
import { CartProductMeta } from '../shopCart/CartProductMeta'
import { Pack } from '../../model/Pack'

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
                image={pack.imageURL}
            />

            {/* Desktop */}
            <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
                <Box  />
                <Box  />
                <PriceTag salePrice={pack.price.amount} price={pack.original_price.amount} currency={"USD"} />
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
                <PriceTag salePrice={pack.price.amount} price={pack.original_price.amount} currency={"USD"} />
            </Flex>
        </Flex>
        <Divider borderColor={'#c3c3c3'}/>
        </Stack>
    </Box>
  )
}
