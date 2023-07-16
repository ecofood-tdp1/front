import { HStack, Heading, Radio, RadioGroup, Stack, Text, useColorModeValue, Image } from "@chakra-ui/react"
import { useState } from "react"
// import logoVisa from '../../public/visa_logo.png'
// import logoMaster from '../../public/master_logo.png'

export const PaymentMethodRadio = () => {
    const [value, setValue] = useState('1')

    return (
        <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row' spacing="5">
                <Radio value='1' spacing="2">
                    <Stack>
                        <Heading fontSize="md" fontWeight="semibold">
                            Tarjeta de Crédito
                        </Heading>
                        <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                            Pago online con tarjeta de crédito
                        </Text>
                        <HStack spacing="3">
                            <Image src={'/visa_logo.png'} boxSize='30px' />
                            <Image src={'/master_logo.png'} boxSize='40px' />
                        </HStack>
                    </Stack>
                </Radio>
            </Stack>
        </RadioGroup>
    )
}