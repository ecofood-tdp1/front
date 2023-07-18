import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, HStack, Hide, Input, Spacer, Stack, VisuallyHidden } from "@chakra-ui/react"
import { useState } from "react"


interface ProductFormProps {
    index: number
    removeProduct: (number: number) => void
  }
  

export const ProductForm = (props: ProductFormProps) => {
    const { index, removeProduct } = props
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(0)

    const inputName = (event) => {
        maxLengthCheck(event, 50)
        setName(event.target.value)
    }
  
    const inputQuantity = (event) => {
        setQuantity(event.target.value)
    }


    const maxLengthCheck = (event, maxLength) => {
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength)
        }
    }

    return <HStack >
        <FormControl id="producto_nombre" width="50">
        <FormLabel>Nombre </FormLabel>
        <Input type="text" 
            placeholder="Nombre del producto"
            onInput={(e) => inputName(e)}
            _placeholder={{ color: 'gray.500' }}
        />
    </FormControl>

    <FormControl id="producto_quantity" width="20">
      <FormLabel>Cant. </FormLabel>
      <Input type="number"
          placeholder="0"
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