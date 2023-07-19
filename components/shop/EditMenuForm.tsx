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
  import { UpdatePackRequest } from '../../model/PackCreateRequest';
  import { useState } from 'react';
import { ProductForm } from './ProductForm';
import { UpdatePack } from '../../repository/PackRepository';
import { shopDefault } from '../../context/users';
import moment from 'moment';
import { useRouter } from 'next/router'
import { Pack } from '../../model/Pack';

  type PackInput = {
    name: string
    quantity: number
    id: number
  }

  type EditMenuProps = {
    pack: Pack,
    paramPackId: string
  }

  export const EditMenuForm = (props: EditMenuProps) => {
    const { pack, paramPackId } = props
    const [name, setName] = useState(pack.name)
    const [description, setDescription] = useState(pack.description)
    const [stock, setStock] = useState(pack.stock)
    const [type, setType] = useState(pack.type)
    const [dateTime, setDateTime] = useState(pack.best_before)
    const [price, setPrice] = useState(pack.price.amount)
    const [originalPrice, setOriginalPrice] = useState(pack.original_price.amount)
    const [picture, setPicture] = useState(pack.imageURL)
    const [createPacks, setCreatePacks] = useState(pack.products.map((p, i)  => {return {name: p.name, quantity: p.quantity, id: i}}))
    const [isLoading, setIsLoading] = useState(false)
    const [packId, setPackId] = useState(pack.products.length)
    const toast = useToast()
    const router = useRouter()

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
                {createPacks.map((pack, i) => {return <ProductForm isEdit={true} key={pack.id} packCreate={pack} index={i} removeProduct={removeProduct} inputProductName={inputProductName} inputProductQuantity={inputProductQuantity}/>})}
      </Stack> 
    }

    const removeProduct = (index: number) => {
      const newCreatePacks  = removeAt(createPacks, index);
      setCreatePacks(newCreatePacks)
    }

    const inputProductName = (index: number, name: string) => {
      var newPack: PackInput = {
        name: name,
        quantity: createPacks[index].quantity,
        id: createPacks[index].id
      }
      var createPacksNew = replaceAt(createPacks, newPack, index)
      setCreatePacks(createPacksNew)
    }

    const inputProductQuantity = (index: number, quantity: number) => {
      var newPack: PackInput = {
        name: createPacks[index].name,
        quantity: Number(quantity),
        id: createPacks[index].id
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

    const updatePack = async () => {
      setIsLoading(true)
      var request: UpdatePackRequest = {
        type: type,
        name: name,
        description: description,
        products: createPacks.map(p => {
          return {
            name: p.name,
            quantity: p.quantity
          }}),
        stock: stock,
        best_before: moment(dateTime).format('DD/MM/YYYY'),
        price: {
          amount: price,
          currency: 'ARS'
        },
        original_price: {
          amount: originalPrice,
          currency: 'ARS'
        },
        imageURL: picture
      }
      try {
        await UpdatePack(paramPackId, request)
        setIsLoading(false)
        toast({
                title: `El pack fue actualizado exitosamente`,
                status: 'success',
                isClosable: true,
                duration: 3000,
            })
        await delay(2000)
        router.push(`/shops/${shopDefault._id}`)
      } catch (error) {
          toast({
                title: `Ocurrió un error al actualizar el pack`,
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
                    Modificar pack
                  </Heading>
                </Flex>
              </Box>
              <Box>
                <FormControl id="name" isRequired>
                    <FormLabel>Nombre del pack</FormLabel>
                    <Input type="text" 
                        defaultValue={pack.name}
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
                        defaultValue={pack.description}
                        placeholder="Redactá una descripción atrapante..."
                        onInput={(e) => inputDescription(e)}   
                        _placeholder={{ color: 'gray.500' }}
                    />
                </FormControl>
              </Box>
              <Box>
                <RadioGroup  onChange={setType} value={type} defaultValue={pack.type}>
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
                      <Input type="date"
                        defaultValue={pack.best_before}
                        onInput={(e) => inputDateTime(e)}
                        _placeholder={{ color: 'gray.500' }}
                    />
                    </InputGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="stock" isRequired>
                    <FormLabel>Cantidad de packs disponibles</FormLabel>
                    <Input type="number" 
                        defaultValue={pack.stock}
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
                        defaultValue={pack.price.amount}
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
                        defaultValue={pack.original_price.amount}
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
                <Button colorScheme="green" width="full" onClick={updatePack} fontSize="md" isLoading={isLoading} >
                  Guardar cambios
                </Button>
              </Box>
              <Box height='40px'></Box>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
  }
  