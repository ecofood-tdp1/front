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
  } from '@chakra-ui/react';
  import { useState } from 'react';
import { PaymentOrderSummary } from './PaymentOrderSummary';
  
  interface Props {
    packs: Pack[]
  }

  export const PaymentForm = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);
  
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
              Agregar medio de pago
            </Heading>
    
            <Stack spacing="10">
                <HStack spacing="8">
                    <Box>
                        <FormControl id="creditCard" isRequired>
                            <FormLabel>Número de tarjeta</FormLabel>
                            <Input type="text" 
                                placeholder="XXXX XXXX XXXX XXXX"
                                onInput={(e) => {
                                  maxLengthCheck(e, 16)
                                  allowOnlyNumber(e)}}
                                _placeholder={{ color: 'gray.500' }}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="cardHolder" isRequired>
                            <FormLabel>Nombre del titular</FormLabel>
                            <Input type="text" 
                                placeholder="TITULAR"   
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
                                <Input type="text"
                                    placeholder="MM"
                                    htmlSize={4} width='auto'
                                    onInput={(e) => {
                                      maxLengthCheck(e, 2)
                                      allowOnlyNumber(e)}}
                                />
                                <Input type="text"
                                    placeholder="AA" 
                                    htmlSize={4} width='auto'
                                    onInput={(e) => {
                                      maxLengthCheck(e, 2)
                                      allowOnlyNumber(e)}}
                                />
                            </HStack>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="cardHolder" isRequired>
                            <FormLabel>CVV/CVC</FormLabel>
                            <Input type="text" 
                                placeholder="XXX"
                                htmlSize={4} width='auto'
                                onInput={(e) => {
                                  maxLengthCheck(e, 3)
                                  allowOnlyNumber(e)}}
                            />
                        </FormControl>
                    </Box>
                </HStack>
            </Stack>
          </Stack>
    
          <Flex direction="column" align="center" flex="1.5">
            <PaymentOrderSummary packs={props.packs} total={props.packs.map(p => p.price.amount).reduce((x, y) => x + y)} />
            <HStack mt="6" fontWeight="semibold">
              <p>o</p>
              <Link color={mode('blue.500', 'blue.200')} href={"/shopcart"} >Volver a mi carrito</Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
  }
  