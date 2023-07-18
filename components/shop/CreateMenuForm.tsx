import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import {
    Flex,
    Box,
    Stack,
    Heading,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue as mode,
    InputGroup,
    FormHelperText,
    RadioGroup,
    Radio,
    Text, 
    useColorModeValue,
    Badge,
    Spacer,
    Textarea,
    SimpleGrid,
    InputLeftElement,
    Button,
    HStack,
    useToast,
  } from '@chakra-ui/react';
  import { CreatePackRequest, PackForRequest } from '../../model/PackCreateRequest';
  import { useState } from 'react';
import { ProductForm } from './ProductForm';
import { CreatePack } from '../../repository/PackRepository';
import { shopDefault } from '../../context/users';

  type PackInput = {
    name: string
    quantity: number
    id: number
  }

  export const CreateMenuForm = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState(0)
    const [type, setType] = useState("specific")
    const [dateTime, setDateTime] = useState("")
    const [price, setPrice] = useState(0)
    const [originalPrice, setOriginalPrice] = useState(0)
    const [picture, setPicture] = useState("")
    const [createPacks, setCreatePacks] = useState(new Array<PackInput>())
    const [isLoading, setIsLoading] = useState(false)
    const [packId, setPackId] = useState(0)
    const toast = useToast()

    const inputPicture = () => {
      setPicture("https://imag.bonviveur.com/ensalada-cesar-casera.jpg")
    }

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

    const DisplayProductForms = () => {
      if (createPacks.length === 0) {
        addPack()
      }
      return <Stack>
                {createPacks.map((pack, i) => {return <ProductForm key={pack.id} packCreate={pack} index={i} removeProduct={removeProduct} inputProductName={inputProductName} inputProductQuantity={inputProductQuantity}/>})}
      </Stack> 
    }

    const removeProduct = (index: number) => {
      const newCreatePacks  = removeAt(createPacks, index);
      setCreatePacks(newCreatePacks)
    }

    const inputProductName = (index: number, name: string) => {
      var newPack: PackForRequest = {
        name: name,
        quantity: createPacks[index].quantity
      }
      var createPacksNew = replaceAt(createPacks, newPack, index)
      setCreatePacks(createPacksNew)
    }

    const inputProductQuantity = (index: number, quantity: number) => {
      var newPack: PackForRequest = {
        name: createPacks[index].name,
        quantity: quantity
      }
      var createPacksNew = replaceAt(createPacks, newPack, index)
      setCreatePacks(createPacksNew)
    }

    function replaceAt(arr, element, i) {
      return [...arr.slice(0, i), element, ...arr.slice(i+1)];
    }

    function removeAt(arr, i) {
      return [...arr.slice(0, i), ...arr.slice(i+1)];
    }

    const addPack = () => {

      var  emptyPack: PackInput = {
        name: '',
        quantity: 0,
        id: packId
      }
      setPackId(packId + 1)
      setCreatePacks([...createPacks, emptyPack])
    }

    const createPack = async () => {
      setIsLoading(true)
      var request: CreatePackRequest = {
        shop_id: shopDefault._id,
        type: type,
        name: name,
        description: description,
        products: createPacks,
        stock: stock,
        best_before: dateTime,
        price: {
          amount: price,
          currency: 'ARS'
        },
        original_price: {
          amount: originalPrice,
          currency: 'ARS'
        },
        imageUrl: picture
      }
      try {
        await CreatePack(request)
        toast({
                title: `El pack fue creado`,
                status: 'success',
                isClosable: true,
                duration: 3000,
            })
        await delay(2000)
      } catch (error) {
          toast({
                title: `Ocurrió un error al crear el pack`,
                status: 'error',
                isClosable: true,
                duration: 3000,
            })
      } finally {
        setIsLoading(false)
      }
      
    }

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    )

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
                <FormControl id="productos">
                  <FormLabel>Agregá los productos</FormLabel>
                  {DisplayProductForms()}
                  <Box height='5'></Box>
                  <Button
                    onClick={addPack}
                    colorScheme="blue"
                    width="full">
                    <AddIcon />
                  </Button>
                </FormControl>
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
              <Box>
                <FormControl id="picture" isRequired>
                    <FormLabel>Foto</FormLabel>
                    <Input type="file"
                      onInput={inputPicture}
                    />
                    <FormHelperText fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      Subí una foto llamativa...
                    </FormHelperText>
                </FormControl>
              </Box>
              <Box>
                <Button colorScheme="green" width="full" onClick={createPack} fontSize="md" isLoading={isLoading} >
                  Crear Pack
                </Button>
              </Box>
              <Box height='40px'></Box>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
  }
  