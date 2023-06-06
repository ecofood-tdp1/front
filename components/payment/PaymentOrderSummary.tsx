import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useRouter } from 'next/router'
import { PaymentOrderPackItem } from './PaymentOrderItem'

type PaymentOrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const PaymentOrderSummaryItem = (props: PaymentOrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

interface Props {
  total: number
  packs: Pack[]
}

export const PaymentOrderSummary = (props: Props) => {
  const {
    packs,
  } = props

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Resumen</Heading>

      <Stack spacing="6">
        <Stack spacing="3">
          {packs.map((pack) => (
            <PaymentOrderPackItem pack={pack} />
          ))}
        </Stack>
        <PaymentOrderSummaryItem label="Subtotal" value={formatPrice(props.total)} />
        <PaymentOrderSummaryItem label="Descuento">
          <Link href="#" >
           $0 (0.0%)
          </Link>
        </PaymentOrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(props.total)}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md" >
        Confirmar
      </Button>
    </Stack>
  )
}
