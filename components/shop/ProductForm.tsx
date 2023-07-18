import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react"
import { useState } from "react"


export const ProductForm = () => {
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
        <FormControl id="producto_nombre">
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
  </HStack>

}