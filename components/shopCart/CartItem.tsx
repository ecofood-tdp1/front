import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue, Box, Button } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { Pack } from '../../model/Pack'

type CartItemProps = {
  pack: Pack
  onClickDelete: (pack: Pack) => void
}

export const CartItem = (props: CartItemProps) => {
  const {
    pack,
    onClickDelete,
  } = props

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta
        name={pack.name}
        description={pack.description}
        image={pack.imageURL}
      />

      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <Box />
        <Box />
        <PriceTag salePrice={pack.price.amount} price={pack.original_price.amount} currency={"ARS"} />
        <CloseButton aria-label={`Delete ${pack.name} from cart`} onClick={() => onClickDelete(pack)} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <CloseButton aria-label={`Delete ${pack.name} from cart`} onClick={() => onClickDelete(pack)} />
        <Box />
        <Box />
        <PriceTag salePrice={pack.price.amount} price={pack.original_price.amount} currency={"ARS"} />
      </Flex>
    </Flex>
  )
}
