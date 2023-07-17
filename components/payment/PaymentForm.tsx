import {
    Flex,
    Box,
    HStack,
    Stack,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Link,
    useColorModeValue as mode,
    InputRightElement,
    InputGroup,
    IconButton,
  } from '@chakra-ui/react';
  import { useState } from 'react';
import { PaymentOrderSummary } from './PaymentOrderSummary';
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { PostPayment } from '../../repository/PaymentRepository';
import { PostOrder } from '../../repository/OrderRepository';
import { useRouter } from 'next/router'
import { RemovePackFromShoppingCart } from '../../repository/UserRepository';
import { PaymentMethodRadio } from './PaymentMethodRadio';
import { Pack } from '../../model/Pack';

  interface Props {
    packs: Pack[]
  }

  export const PaymentForm = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [finished, setFinished] = useState(false);
    const [creditCard, setCreditCard] = useState("")
    const [cardHolder, setCardHolder] = useState("")
    const [expirationMonth, setExpirationMonth] = useState("")
    const [expirationYear, setExpirationYear] = useState("")
    const total = props.packs.length == 0 ? 0 : props.packs.map(p => p.price.amount).reduce((x, y) => x + y)
    const subtotal = props.packs.length == 0 ? 0 : props.packs.map(p => p.original_price.amount).reduce((x, y) => x + y)
    const router = useRouter();

    const inputCreditCard = (event) => {
      maxLengthCheck(event, 16)
      allowOnlyNumber(event)
      setCreditCard(event.target.value)
    }

    const inputCardHodler = (event) => {
      setCardHolder(event.target.value)
    }

    const inputExpirationMonth = (event) => {
      maxLengthCheck(event, 2)
      allowOnlyNumber(event)
      setExpirationMonth(event.target.value)
    }

    const inputExpirationYear = (event) => {
      maxLengthCheck(event, 2)
      allowOnlyNumber(event)
      setExpirationYear(event.target.value)
    }
  
    const maxLengthCheck = (event, maxLength) => {
      if (event.target.value.length > maxLength) {
          event.target.value = event.target.value.slice(0, maxLength)
      }
    }

    const allowOnlyNumber = (event) => {
      if (isNaN(+event.target.value)) {
        event.target.value = event.target.value.slice(0, event.target.value.length-1)
      }
    }

    const onClickReveal = () => {
      setShowPassword(!showPassword)
    }

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    )

    const postPayment = async () => {
      setProcessingPayment(true)
      await PostPayment(creditCard, cardHolder, expirationMonth, expirationYear, "visa", total)
      // DANGER!!!!!!!!!!!
      await PostOrder(props.packs[0].shop_id, props.packs, total)
      await delay(3000)
      setProcessingPayment(false)
      setFinished(true)
      await delay(2000)
      for (var pack of props.packs) {
        await RemovePackFromShoppingCart(pack._id)
      }
      router.push("/orders/my")
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
            <Heading fontSize="2xl" fontWeight="extrabold">
              Agregar medio de pago
            </Heading>
    
            <Stack spacing="12">
                {PaymentMethodRadio()}
                <HStack spacing="8">
                    <Box>
                        <FormControl id="creditCard" isRequired>
                            <FormLabel>Número de tarjeta</FormLabel>
                            <Input type="text" 
                                placeholder="XXXX XXXX XXXX XXXX"
                                onInput={(e) => inputCreditCard(e)}
                                _placeholder={{ color: 'gray.500' }}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="cardHolder" isRequired>
                            <FormLabel>Nombre del titular</FormLabel>
                            <Input type="text" 
                                placeholder="TITULAR"
                                onInput={(e) => inputCardHodler(e)}   
                                _placeholder={{ color: 'gray.500' }}
                            />
                        </FormControl>
                    </Box>
                </HStack>
                <HStack spacing="8">
                    <Box>
                        <FormControl id="date" isRequired>
                            <FormLabel>Fecha de expiración</FormLabel>
                            <HStack spacing="3">
                                <Input id='month'
                                    type="text"
                                    placeholder="MM"
                                    htmlSize={4} width='auto'
                                    onInput={(e) => inputExpirationMonth(e)}
                                />
                                <Input id='year'
                                    type="text"
                                    placeholder="AA" 
                                    htmlSize={4} width='auto'
                                    onInput={(e) => inputExpirationYear(e)}
                                />
                            </HStack>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="cvv" isRequired>
                            <FormLabel>CVV/CVC</FormLabel>
                              <InputGroup>
                                <InputRightElement>
                                  <IconButton
                                    variant="link"
                                    aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                                    icon={showPassword ? <HiEyeOff /> : <HiEye />}
                                    onClick={onClickReveal}
                                  />
                                </InputRightElement>
                              <Input type={showPassword ? 'text' : 'password'}
                                  placeholder="XXX"
                                  htmlSize={4} width='auto'
                                  onInput={(e) => {
                                    maxLengthCheck(e, 3)
                                    allowOnlyNumber(e)}}
                              />
                              </InputGroup>
                        </FormControl>
                    </Box>
                </HStack>
            </Stack>
          </Stack>
    
          <Flex direction="column" align="center" flex="1.5">
            <PaymentOrderSummary isLoading={processingPayment} finished={finished} submit={postPayment} packs={props.packs} total={total} subtotal={subtotal}/>
            <HStack mt="6" fontWeight="semibold">
              <p>o</p>
              <Link color={mode('blue.500', 'blue.200')} href={"/shopcart"} >Volver a mi carrito</Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
  }
  