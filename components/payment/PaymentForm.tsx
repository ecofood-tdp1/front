import {
    Flex,
    Box,
    HStack,
    Stack,
    Heading,
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
    
            <Stack spacing="6">
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
  