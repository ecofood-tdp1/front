import { CalendarIcon } from '@chakra-ui/icons';
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
    FormHelperText,
    RadioGroup,
    Radio,
    Text, 
    useColorModeValue,
    Badge,
    Center,
    Spacer,
    Textarea,
    SimpleGrid,
    InputLeftElement,
  } from '@chakra-ui/react';
  import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi'

  export const CreateMenuForm = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState(0)
    const [type, setType] = useState("specific")
    const [dateTime, setDateTime] = useState("")
    const [price, setPrice] = useState(0)
    const [originalPrice, setOriginalPrice] = useState(0)

    const inputName = (event) => {
      maxLengthCheck(event, 50)
      setName(event.target.value)
    }

    const inputStock = (event) => {
      allowOnlyNumber(event)
      setStock(Number(event.target.value))
    }

    const allowOnlyNumber = (event) => {
      if (isNaN(+event.target.value)) {
        event.target.value = event.target.value.slice(0, event.target.value.length-1)
      }
    }

    const inputDescription = (event) => {
      maxLengthCheck(event, 100)
      setDescription(event.target.value)
    }

    const inputDateTime = (event) => {
      setDateTime(event.target.value)
    }


    const maxLengthCheck = (event, maxLength) => {
      if (event.target.value.length > maxLength) {
          event.target.value = event.target.value.slice(0, maxLength)
      }
    }

    const changeTypeOnFocusToDate = (event) => {
      event.target.type="date"
      event.target.focus()
    }

    const changeTypeOnBlurToText = (event) => {
      if (dateTime == "") {
        event.target.type="text"
      }
    }

    const inputPrice = (event) => {
      allowOnlyNumber(event)
      setPrice(Number(event.target.value))
    }

    const inputOriginalPrice = (event) => {
      allowOnlyNumber(event)
      setOriginalPrice(Number(event.target.value))
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
            <SimpleGrid spacing="12" mt={4} mb={8} ml={4} mr={4} columns={1}>
              <Box>
                <Flex alignItems="center" justifyContent="center" mb={4}>
                  <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
                    Agregar pack
                  </Heading>
                </Flex>
              </Box>
              <Box>
                <FormControl id="name" isRequired>
                    <FormLabel>Nombre del pack</FormLabel>
                    <Input type="text" 
                        placeholder="Elegí un nombre atractivo..."
                        onInput={(e) => inputName(e)}
                        _placeholder={{ color: 'gray.500' }}
                    />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="description" isRequired>
                    <FormLabel>Descripción</FormLabel>
                    <Textarea
                        size='md'
                        placeholder="Redactá una descripción atrapante..."
                        onInput={(e) => inputDescription(e)}   
                        _placeholder={{ color: 'gray.500' }}
                    />
                </FormControl>
              </Box>
              <Box>
                <RadioGroup  onChange={setType} value={type}>
                <FormControl id="type">
                    <FormLabel>Seleccioná el tipo de pack</FormLabel>
                </FormControl>  
                <Flex>
                  <Spacer />
                  <Radio value='specific' spacing="4">
                    <Heading fontSize="md" fontWeight="semibold">                        
                      <Badge fontSize="md" colorScheme='green'>Específico</Badge>
                    </Heading>
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      El pack debe contener todos los productos
                    </Text>
                  </Radio>
                  <Spacer />
                  <Box width='10'></Box>
                  <Spacer />
                  <Radio value='surprise' spacing="4">
                    <Heading fontSize="md" fontWeight="semibold">                        
                      <Badge fontSize="md" colorScheme='purple'>Sorpresa</Badge>
                    </Heading>
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      El pack puede contener algunos de los productos
                    </Text>
                  </Radio>
                  <Spacer />
                </Flex>
                </RadioGroup>
              </Box>
              <Box>
                <FormControl id="datetime" isRequired>
                    <FormLabel>Consumir antes de</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        color='gray.500'
                        fontSize='1.2em'>
                          <CalendarIcon/>
                      </InputLeftElement>
                      <Input type="text"
                        placeholder="DD/MM/AAAA"
                        onInput={(e) => inputDateTime(e)}
                        onFocus={(e)=> changeTypeOnFocusToDate(e)}
                        onBlur={(e) => changeTypeOnBlurToText(e)}
                        _placeholder={{ color: 'gray.500' }}
                    />
                    </InputGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="stock" isRequired>
                    <FormLabel>Cantidad de packs disponibles</FormLabel>
                    <Input type="number" 
                        placeholder="0"
                        onInput={(e) => inputStock(e)}
                        _placeholder={{ color: 'gray.500' }}
                    />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="price" isRequired>
                    <FormLabel>Precio</FormLabel>
                    <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.500'
                      fontSize='1.2em'
                      children='$'
                    />
                    <Input type="text"
                        placeholder="0.00"
                        onInput={(e) => inputPrice(e)}
                        _placeholder={{ color: 'gray.500' }}
                    />
                    </InputGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="original_price" isRequired>
                    <FormLabel>Precio original</FormLabel>
                    <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.500'
                      fontSize='1.2em'
                      children='$'
                    />
                    <Input type="text"
                        placeholder="0.00"
                        onInput={(e) => inputOriginalPrice(e)}
                        _placeholder={{ color: 'gray.500' }}
                    />
                    </InputGroup>
                    <FormHelperText fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      Contales a tus clientes cuál era el precio original de tu producto. Así saben cuánto ahorran a la par que cuidan el planeta :)
                    </FormHelperText>
                </FormControl>
              </Box>
              <Box height='80px'></Box>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
  }
  