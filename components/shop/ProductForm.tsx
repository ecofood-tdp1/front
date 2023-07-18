import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, HStack, Hide, Input, Spacer, Stack, VisuallyHidden } from "@chakra-ui/react"
import { useState } from "react"
import { PackCreateRequest } from "../../model/PackCreateRequest"


interface ProductFormProps {
    key: number
    index: number
    packCreate: PackCreateRequest
    removeProduct: (number: number) => void
    inputProductName: (number: number, name: string) => void
    inputProductQuantity: (number: number, quantity: number) => void
  }
  

export const ProductForm = (props: ProductFormProps) => {
    const { key, index, packCreate, removeProduct, inputProductName, inputProductQuantity } = props

    const inputName = (event) => {
        maxLengthCheck(event, 50)
        inputProductName(index, event.target.value)
    }
  
    const inputQuantity = (event) => {
        inputProductQuantity(index, event.target.value)
    }


    const maxLengthCheck = (event, maxLength) => {
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength)
        }
    }

    return <HStack key={key}>
        <FormControl id="producto_nombre" width="50">
        <FormLabel>Nombre </FormLabel>
        <Input type="text" 
            placeholder="Nombre del producto"
            defaultValue={packCreate.name}
            onInput={(e) => inputName(e)}
            _placeholder={{ color: 'gray.500' }}
        />
    </FormControl>

    <FormControl id="producto_quantity" width="20">
      <FormLabel>Cant. </FormLabel>
      <Input type="number"
          placeholder="0"
          defaultValue={packCreate.quantity}
          onInput={(e) => inputQuantity(e)}
          _placeholder={{ color: 'gray.500' }}
      />
    </FormControl>
    <Stack width="20">
        <Box height="6"/>
        <Button
            onClick={() => removeProduct(index)}
            colorScheme='gray'
            width="15">
            <DeleteIcon />
        </Button>  
    </Stack>
  
  </HStack>

}