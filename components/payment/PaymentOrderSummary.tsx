import {
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useRouter } from 'next/router'
import { PaymentOrderPackItem } from './PaymentOrderItem'
import { CheckCircleIcon } from '@chakra-ui/icons'

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

const submitButton = (finished: boolean, isLoading: boolean, submit: () => void) => {
  if (finished) {
    return  <IconButton aria-label='Send email' colorScheme="green" size="lg" fontSize="md" icon={<CheckCircleIcon boxSize={8}/>} />
  } else {
    return  <Button colorScheme="blue" size="lg" fontSize="md" isLoading={isLoading} onClick={submit} loadingText='Procesando pago...'>
              Confirmar
            </Button>
  }
}

interface Props {
  total: number
  isLoading: boolean
  packs: Pack[]
  finished: boolean
  submit: () => void
}

export const PaymentOrderSummary = (props: Props) => {
  const {
    packs,
    isLoading,
    finished,
    submit
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
        {submitButton(finished, isLoading, submit)}
    </Stack>
  )
}