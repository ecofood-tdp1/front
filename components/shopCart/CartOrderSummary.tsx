import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useRouter } from 'next/router'

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="md">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ?
        <Text
          color={mode('gray.600', 'gray.400')}
          fontWeight="medium">{value}
        </Text> : children}
    </Flex>
  )
}

interface Props {
  total: number
  subtotal: number
}

export const CartOrderSummary = (props: Props) => {
  const router = useRouter()

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Resumen</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(props.subtotal)} />
        <OrderSummaryItem label="Te ahorrás" >
          <Text fontSize={"17px"} fontWeight={"bold"} color={mode('green.600', 'green.500')} >
            {formatPrice(props.subtotal - props.total)} {props.subtotal == 0 ? "" : "(" + Math.round(100 * (props.subtotal - props.total) / props.subtotal) + "%)"}
          </Text>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(props.total)}
          </Text>
        </Flex>
      </Stack>
      <Button onClick={() => router.push('/payment')} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Ir a pagar
      </Button>
    </Stack>
  )
}
