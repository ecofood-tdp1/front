import {
    Flex,
    Box,
    HStack,
    Stack,
    Heading,
    FormControl,
    FormLabel,
    Input,
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
  } from '@chakra-ui/react';
  import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi'

  export const CreateMenuForm = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("specific")

    const inputName = (event) => {
      maxLengthCheck(event, 50)
      setName(event.target.value)
    }

    const inputDescription = (event) => {
      maxLengthCheck(event, 100)
      setDescription(event.target.value)
    }


    const maxLengthCheck = (event, maxLength) => {
      if (event.target.value.length > maxLength) {
          event.target.value = event.target.value.slice(0, maxLength)
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
            <Flex alignItems="center" justifyContent="center" mb={4}>
              <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
                Agregar pack
              </Heading>
            </Flex>
    
            <Stack spacing="12">
              <FormControl id="name" isRequired>
                  <FormLabel>Nombre del pack</FormLabel>
                  <Input type="text" 
                      placeholder="Nombre :)"
                      onInput={(e) => inputName(e)}
                      _placeholder={{ color: 'gray.500' }}
                  />
              </FormControl>
              <FormControl id="description" isRequired>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                      size='md'
                      onInput={(e) => inputDescription(e)}   
                      _placeholder={{ color: 'gray.500' }}
                  />
                  <FormHelperText>Escribí una breve descripición de tu pack</FormHelperText>
              </FormControl>
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
            </Stack>
          </Stack>
        </Stack>
      </Box>
  }
  