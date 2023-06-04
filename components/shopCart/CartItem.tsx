import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue, Box } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'

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
        image={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Veg_Chow_mein.jpg/640px-Veg_Chow_mein.jpg"}
      />

      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <Box  />
        <Box  />
        <PriceTag price={pack.price.amount} currency={"USD"} />
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
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <Box  />
        <Box  />
        <PriceTag price={pack.price.amount} currency={"USD"} />
      </Flex>
    </Flex>
  )
}
